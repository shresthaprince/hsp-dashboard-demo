long instance1 = 0, timer;
double hrv = 0, hr = 72, interval = 0;
int value = 0, count = 0;
bool flag = 0;
#define shutdown_pin 10
#define threshold 100     // to identify R peak
#define timer_value 10000 // 10 seconds timer to calculate hr

#include <dht.h>
dht DHT;

#define DHT11_PIN 7
// 18 black tx|| 19 grey rx //do not change the gps cables
#include <TinyGPS.h>

float lat, lon;
TinyGPS gps;

void setup()
{
  Serial.begin(9600);
  Serial.println("The GPS is starting:");
  Serial1.begin(9600);
  pinMode(8, INPUT); // Setup for leads off detection LO + hs
  pinMode(9, INPUT); // Setup for leads off detection LO - hs
}

void loop()
{

  while (Serial1.available())
  {
    if (gps.encode(Serial1.read()))
    {
      if ((digitalRead(8) == 1) || (digitalRead(9) == 1))
      { // check if leads are removed
        Serial.println("leads off!");
        digitalWrite(shutdown_pin, LOW); // standby mode
        instance1 = micros();
        timer = millis();
      }
      else
      {
        digitalWrite(shutdown_pin, HIGH); // normal mode
        value = analogRead(A0);
        value = map(value, 250, 400, 0, 100); // to flatten the ecg values a bit
        if ((value > threshold) && (!flag))
        {
          count++;
          Serial.println("in");
          flag = 1;
          interval = micros() - instance1; // RR interval
          instance1 = micros();
        }
        else if ((value < threshold))
        {
          flag = 0;
        }
        if ((millis() - timer) > 10000)
        {
          hr = count * 6;
          timer = millis();
          count = 0;
        }
        hrv = hr / 60 - interval / 1000000;
        Serial.print(hr);
        Serial.print(",");
        Serial.print(hrv);
        Serial.print(",");
        Serial.println(value);
        delay(1);
        // for the GPS sensor
        gps.f_get_position(&lat, &lon);

        Serial.print("Position: ");

        Serial.print("Latitude: ");
        Serial.print(lat, 6);

        Serial.print(",");

        Serial.print("Longitude: ");
        Serial.println(lon, 6);

        // for the temp and humidity sensor
        int chk = DHT.read11(DHT11_PIN);
        Serial.print("Temperature = ");
        Serial.println(DHT.temperature);
        Serial.print("Humidity = ");
        Serial.println(DHT.humidity);

        delay(1000);
      }
    }
  }
}
