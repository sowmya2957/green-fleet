package com.greenfleet.service;

import com.greenfleet.model.PredictionRequest;
import com.greenfleet.model.PredictionResponse;
import org.springframework.stereotype.Service;

@Service
public class FuelPredictionService {
    private static final double FUEL_PRICE_PER_LITRE = 95.0; // Demo assumption in INR
    private static final double CO2_KG_PER_LITRE_DIESEL = 2.68;

    public PredictionResponse predict(PredictionRequest r) {
        double base = switch (r.vehicleType().toLowerCase()) {
            case "motorcycle", "bike" -> 2.2;
            case "van" -> 8.5;
            case "bus" -> 24.0;
            case "truck" -> 28.0;
            case "electric" -> 0.0;
            default -> 7.5; // car
        };

        double loadFactor = 1.0 + Math.min(r.loadKg() / 5000.0, 0.45);
        double speedFactor = r.averageSpeedKmh() < 20 ? 1.25
                : r.averageSpeedKmh() > 90 ? 1.18
                : r.averageSpeedKmh() >= 45 && r.averageSpeedKmh() <= 75 ? 0.90 : 1.0;
        double trafficFactor = 1.0 + (r.trafficLevel() / 100.0) * 0.35;
        double acFactor = 1.0 + (r.acUsagePercent() / 100.0) * 0.12;

        double litresPer100Km = base * loadFactor * speedFactor * trafficFactor * acFactor;
        double litres = litresPer100Km * r.distanceKm() / 100.0;
        double cost = litres * FUEL_PRICE_PER_LITRE;
        double co2 = litres * CO2_KG_PER_LITRE_DIESEL;
        String label = litresPer100Km < base * 0.95 ? "Efficient"
                : litresPer100Km < base * 1.35 ? "Average" : "Needs improvement";
        String explanation = "Estimate uses vehicle type, distance, load, average speed, traffic and AC usage. " +
                "It is a rule-based demo model, not a trained machine-learning model.";
        return new PredictionResponse(round(litres), round(litresPer100Km), round(cost), round(co2), label, explanation);
    }

    private double round(double n) { return Math.round(n * 100.0) / 100.0; }
}
