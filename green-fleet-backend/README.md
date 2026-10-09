# Green Fleet Optimization — Spring Boot backend

Backend starter for the uploaded Vite/React UI titled **Fuel Consumption Prediction & Green Fleet Optimization**.

## Requirements
- Java 17+
- Maven 3.9+ (or open `pom.xml` in IntelliJ IDEA and let it import dependencies)

## Run
From this folder:
```bash
mvn spring-boot:run
```
API starts at `http://localhost:8080`.

## Endpoints

### Check server
`GET /api/health`

### Predict fuel use
`POST /api/predict`
```json
{
  "vehicleType": "car",
  "distanceKm": 120,
  "loadKg": 250,
  "averageSpeedKmh": 55,
  "trafficLevel": 35,
  "acUsagePercent": 60
}
```
Returns predicted litres, litres per 100 km, estimated INR cost, CO2 estimate, efficiency label and explanation.

### Optimize fleet
`POST /api/fleet/optimize`
```json
[
  {"id":"V-101","name":"Delivery Van 1","type":"van","distanceKm":180,"fuelLitres":22,"loadKg":500},
  {"id":"T-204","name":"Truck 2","type":"truck","distanceKm":250,"fuelLitres":85,"loadKg":3000},
  {"id":"C-011","name":"Car 11","type":"car","distanceKm":95,"fuelLitres":10,"loadKg":100}
]
```

## Connect the React frontend
The Vite app uses port 3000, and this backend allows requests from `http://localhost:3000`. In a frontend function, call:
```ts
const response = await fetch("http://localhost:8080/api/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    vehicleType: "car",
    distanceKm: 120,
    loadKg: 250,
    averageSpeedKmh: 55,
    trafficLevel: 35,
    acUsagePercent: 60
  })
});
if (!response.ok) throw new Error("Prediction request failed");
const result = await response.json();
```

## Important limitations
This is a working starter backend with transparent, rule-based estimates. It does **not** yet use a trained ML model, a live traffic provider, a database, or actual route optimization. Fuel price (₹95/L) and CO2 factor (2.68 kg/L) are demo assumptions; replace them with your validated local values. Electric vehicles currently need separate energy-consumption logic before using the fuel-cost fields.
