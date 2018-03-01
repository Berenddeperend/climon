int moistValue1;
int moistValue2;
int moistValue3;
int vvcPin = 13;
int ledPin = LED_BUILTIN;

//vars for the blinking led
int blinkInterval = 200;
unsigned long lastBlinkMoment = 0;
int ledState = LOW;
boolean shouldBlink = false;

int calibrateTime = 5000; //number of ms to calibrate
int extremeHigh = 1023;
int extremeLow = 0; 

int delayTime = 1000; //interval for measurements

void setup() {
  pinMode(vvcPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  digitalWrite(vvcPin, HIGH);
  Serial.begin(9600);
  calibrateExtremes();
}

void loop() {
  moistValue1 = analogRead(A0);
  moistValue2 = analogRead(A1);
  moistValue3 = analogRead(A2);

  Serial.print("moist=" + mapValue(moistValue1));
  Serial.print("&moist=" + mapValue(moistValue2));
  Serial.print("&moist=" + mapValue(moistValue3));
  Serial.println("");

  delay(delayTime);
}

String mapValue(int src) {
  return String(map(src, extremeLow, extremeHigh, 0, 100));
}

void calibrateExtremes() {
  shouldBlink = true;

  while (millis() < calibrateTime) {
    //stop the blinking just before this loop is done. 
    if(millis() > (calibrateTime - 100)) {
      shouldBlink = false;
    }

    blink();

    moistValue1 = analogRead(A0);

    if (moistValue1 > extremeHigh) {
      extremeHigh = moistValue1;
    }
    if (moistValue1 < extremeLow) {
      extremeLow = moistValue1;
    }
  }
}

void blink() {
  if (!shouldBlink) {
    ledState = "LOW";
  }

  if (millis() > lastBlinkMoment + blinkInterval && shouldBlink) {
      if (ledState == "HIGH") {
        ledState = "LOW";
      } else {
        ledState = "HIGH";
      }

      digitalWrite(ledPin, ledState);
      lastBlinkMoment = millis();
    }

}