//This sketch will auto-calibrate. On boot, the siolsensor should be completely dry.
//After the arduino stops blinking, stick it in the soil.
//Potential problem might be that the arduino might randomly reboot and do a faulthy re-calibration.

int moistValue1;
int moistValue2;
int moistValue3;
int vvcPin = 13;
int ledPin = LED_BUILTIN;

//vars for the blinking led
int blinkInterval = 100;
unsigned long lastBlinkMoment = 0;
int ledState = LOW;

int calibrateTime = 5000; //number of ms to calibrate
int extremeHigh = 0; //will be overwritten
const int extremeLow = 0; //we'll assume that total wetness is 0. calibrating this would be a hassle.

// int delayTime = (5) * 1000 * 60; //interval for measurements in minutes.
int delayTime = 1000;

void setup() {
  pinMode(vvcPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  digitalWrite(vvcPin, HIGH);
  Serial.begin(9600);
  calibrateExtremes();
}

void loop() {
  digitalWrite(vvcPin, HIGH);

  delay(100); //give sensors time to boot;

  moistValue1 = analogRead(A0);
  moistValue2 = analogRead(A1);
  moistValue3 = analogRead(A2);

  // Serial.print("&location=testplant");
  // Serial.print("&moist=" + mapValue(moistValue1));
  // Serial.print("&moist=" + mapValue(moistValue2));
  // Serial.println("&moist=" + mapValue(moistValue3));
  Serial.print("Raw sensor 1 value: ");
  Serial.println(moistValue1);
  Serial.print("Raw sensor 2 value: ");
  Serial.println(moistValue2);
  Serial.print("Raw sensor 3 value: ");
  Serial.println(moistValue3);

  digitalWrite(vvcPin, LOW);

  delay(delayTime);
}

String mapValue(int src) {
  return String(
      map(src, extremeLow, extremeHigh, 100, 0)
  );
}

void calibrateExtremes() {
  // Serial.println("Starting to calibrate");

  while (millis() < calibrateTime) {
    blink();
    moistValue1 = analogRead(A0);

    if (moistValue1 > extremeHigh) {
      extremeHigh = moistValue1;
    }
    // if (moistValue1 < extremeLow) {
    //   extremeLow = moistValue1;
    // }
  }

  digitalWrite(ledPin, LOW);
  // Serial.println("done calibratin");
  // Serial.print("extremehigh: " + String(extremeHigh));
  // Serial.println(", extremeLow: " + String(extremeLow));
}

void blink() {
  if (millis() > lastBlinkMoment + blinkInterval) {
      if (ledState == HIGH) {
        ledState = LOW;
      } else {
        ledState = HIGH;
      }
      digitalWrite(ledPin, ledState);
      lastBlinkMoment = millis();
  }
}