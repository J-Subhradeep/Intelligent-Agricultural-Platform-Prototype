int soilMoistureValue; 
const int soilMoisturePin = A0; 
const int relayPin = 3; 
const int threshold = 767; // threshold value for 75% soil moisture

void setup() {
  pinMode(relayPin, OUTPUT); 
  Serial.begin(9600); 
}

void loop() { 
  soilMoistureValue = analogRead(soilMoisturePin); 

  int soilMoisturePercentage = map(soilMoistureValue, 0, 1023, 0, 100);


  Serial.print("Soil Moisture Percentage: ");
  Serial.print(soilMoisturePercentage);
  Serial.println("%");

  if (soilMoisturePercentage < 75) { 
    digitalWrite(relayPin, HIGH); 
    Serial.println("Soil moisture is below 75%. Pump ON.");
  } else {
    digitalWrite(relayPin, LOW); 
    Serial.println("Soil moisture is above 75%. Pump OFF.");
  }
  delay(2000); 
}
