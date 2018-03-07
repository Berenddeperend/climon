//In this sketch, calibration is done by plugging the common anode directly to an analog input. Works nicely.


int moistValue1;
int moistValue2;
int moistValue3;
int calibrateValue;
const int vvcPin = 13;
const int ledPin = LED_BUILTIN;
const int buzzerPin = 8;
const int calibratePin = A5;

const int buzzerTone = 1175;

//vars for the blinking led
const int blinkInterval = 100;
unsigned long lastBlinkMoment = 0;
int ledState = LOW;

const int calibrateTime = 5000; //number of ms to calibrate
int extremeHigh = 0; //will be overwritten
const int extremeLow = 0; //we'll assume that total wetness is 0. calibrating this would be a hassle.

const unsigned long delayTime = 5 * 1000 * 60; //interval for measurements in minutes.
//int delayTime = 300000; //5 minutes


void setup() {
  pinMode(vvcPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
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


  tone(buzzerPin, 1175, 500);
  Serial.print("&location=TRIMM-Kaketoeplant");
  Serial.print("&moist=" + mapValue(moistValue1));
  Serial.print("&moist=" + mapValue(moistValue2));
  Serial.println("&moist=" + mapValue(moistValue3)); //end with a number value, not a string.
  
  // Serial.println();

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
    
    calibrateValue = analogRead(calibratePin);

    if (calibrateValue > extremeHigh) {
      extremeHigh = calibrateValue;
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
        tone(buzzerPin, 1175);

      } else {
        ledState = HIGH;
        noTone(buzzerPin);
      }
      digitalWrite(ledPin, ledState);
      lastBlinkMoment = millis();
      noTone(buzzerPin);
  }
}
