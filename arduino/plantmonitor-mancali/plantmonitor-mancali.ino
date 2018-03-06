//This sketch needs you to manually calibrate the sensor.
//This is because the Arduino might reboot itself. In that case,
// it will also re-calibrate itself while measuring wet soil.
//This might be fixed by calibrating via a sensor that will always stay dry...

int moistValue1;
int moistValue2;
int moistValue3;
int caliVal;
int vvcPin = 13;

int extremeHigh = 964; //vvc via digital pin, three moist sensors connected.
const int extremeLow = 0; //we'll assume that total wetness is 0. calibrating this would be a hassle.

// int delayTime = (5) * 1000 * 60; //interval for measurements in minutes.
int delayTime = 1000; //for manual calibrating

void setup() {
  pinMode(vvcPin, OUTPUT);
  digitalWrite(vvcPin, HIGH);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(vvcPin, HIGH);

  delay(100); //give sensors time to boot;

  moistValue1 = analogRead(A0);
  moistValue2 = analogRead(A1);
  moistValue3 = analogRead(A2);
  caliVal = analogRead(A5);

  Serial.print("&location=testplant");
  Serial.print("&moist=" + mapValue(moistValue1));
  Serial.print("&moist=" + mapValue(moistValue2));
  Serial.println("&moist=" + mapValue(moistValue3));


  //use this for manually calibrating
  Serial.print("Sensorvalue1: " + String(moistValue1));
  Serial.print(" Sensorvalue2: " + String(moistValue2));
  Serial.print(" Sensorvalue3: " + String(moistValue3));
  Serial.print(" caliValue: " + String(caliVal));
  Serial.println("");

  digitalWrite(vvcPin, LOW);

  delay(delayTime);
}

String mapValue(int src) {
  return String(
      map(src, extremeLow, extremeHigh, 100, 0)
  );
}