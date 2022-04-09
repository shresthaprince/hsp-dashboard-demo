#include <dht.h>
dht DHT;

#define DHT11_PIN 7
//18 black tx|| 19 grey rx //do not change the cables
#include <TinyGPS.h>

float lat,lon;
TinyGPS gps; 

void setup(){
Serial.begin(9600); 
Serial.println("The GPS is starting:");
Serial1.begin(9600); 
 

}
 
void loop(){
  
    while(Serial1.available()){ 
    if(gps.encode(Serial1.read()))
    { 
    //for the GPS sensor
    gps.f_get_position(&lat,&lon);

    Serial.print("Position: ");
       
    Serial.print("Latitude: ");
    Serial.print(lat,6);
    
    Serial.print(",");
    
    Serial.print("Longitude: ");
    Serial.println(lon,6); 

    //for the temp and humidity sensor
    int chk = DHT.read11(DHT11_PIN);
    Serial.print("Temperature = ");
    Serial.println(DHT.temperature);
    Serial.print("Humidity = "); 
    Serial.println(DHT.humidity);
    
  delay(10000);//10sec delay is in milliseconds 
   }
  }
  
} 
