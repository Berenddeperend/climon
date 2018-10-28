#include <Arduino.h>

// DHT Temperature & Humidity Sensor
// Unified Sensor Library Example
// Written by Tony DiCola for Adafruit Industries
// Released under an MIT license.

// Depends on the following Arduino libraries:
// - Adafruit Unified Sensor Library: https://github.com/adafruit/Adafruit_Sensor
// - DHT Sensor Library: https://github.com/adafruit/DHT-sensor-library

#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN            2         // Pin which is connected to the DHT sensor.

// Uncomment the type of sensor in use:
//#define DHTTYPE           DHT11     // DHT 11 
#define DHTTYPE           DHT22     // DHT 22 (AM2302)
//#define DHTTYPE           DHT21     // DHT 21 (AM2301)

// See guide for details on sensor wiring and usage:
//   https://learn.adafruit.com/dht/overview

DHT_Unified dht(DHTPIN, DHTTYPE);

uint32_t delayMS;

void setup() {
  Serial.begin(9600); 
  // Initialize device.
  dht.begin();
  // Serial.println("DHTxx Unified Sensor Example");
  // Print temperature sensor details.
  sensor_t sensor;
  dht.temperature().getSensor(&sensor);
  // Serial.println("------------------------------------");
  // Serial.println("Temperature");
  // Serial.print  ("Sensor:       "); Serial.println(sensor.name);
  // Serial.print  ("Driver Ver:   "); Serial.println(sensor.version);
  // Serial.print  ("Unique ID:    "); Serial.println(sensor.sensor_id);
  // Serial.print  ("Max Value:    "); Serial.print(sensor.max_value); Serial.println(" *C");
  // Serial.print  ("Min Value:    "); Serial.print(sensor.min_value); Serial.println(" *C");
  // Serial.print  ("Resolution:   "); Serial.print(sensor.resolution); Serial.println(" *C");  
  // Serial.println("------------------------------------");
  // // Print humidity sensor details.
  // dht.humidity().getSensor(&sensor);
  // Serial.println("------------------------------------");
  // Serial.println("Humidity");
  // Serial.print  ("Sensor:       "); Serial.println(sensor.name);
  // Serial.print  ("Driver Ver:   "); Serial.println(sensor.version);
  // Serial.print  ("Unique ID:    "); Serial.println(sensor.sensor_id);
  // Serial.print  ("Max Value:    "); Serial.print(sensor.max_value); Serial.println("%");
  // Serial.print  ("Min Value:    "); Serial.print(sensor.min_value); Serial.println("%");
  // Serial.print  ("Resolution:   "); Serial.print(sensor.resolution); Serial.println("%");  
  // Serial.println("------------------------------------");
  // Set delay between sensor readings based on sensor details.
  // delayMS = sensor.min_delay / 1000;
  // delayMS = 900000; //15 minutes
  // delayMS = 5000; //5 seconds
  delayMS = 25000; //5 minutes
}

void loop() {
  // Delay between measurements.
  delay(delayMS);
  // Get temperature event and print its value.
  sensors_event_t event;  



  Serial.print("measurement=lucht&tag/String/location=Rembrandtlaan"); 

  dht.temperature().getEvent(&event);
  
  if (isnan(event.temperature)) {
    Serial.println("Error reading temperature!");
  }
  else {
    Serial.print("&field/Number/temperature=");
    Serial.print(event.temperature);
  }

  dht.humidity().getEvent(&event);
  // Get humidity event and print its value.
  if (isnan(event.relative_humidity)) {
    Serial.println("Error reading humidity!");
  }
  else {
    Serial.print("&field/Number/humidity=");
    Serial.println(event.relative_humidity);
  }
}