package com.greenfleet.service;

import com.greenfleet.model.OptimizationResponse;
import com.greenfleet.model.Vehicle;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FleetService {
    private static final double FUEL_PRICE_PER_LITRE = 95.0;
    private static final double CO2_PER_LITRE = 2.68;

    public OptimizationResponse optimize(List<Vehicle> vehicles) {
        if (vehicles == null || vehicles.isEmpty()) {
            throw new IllegalArgumentException("Provide at least one vehicle.");
        }
        double distance = 0, fuel = 0, saved = 0;
        List<OptimizationResponse.VehicleSummary> summaries = new ArrayList<>();

        for (Vehicle v : vehicles) {
            double rate = v.fuelLitres() / v.distanceKm() * 100.0;
            double benchmark = benchmark(v.type());
            double expected = benchmark * v.distanceKm() / 100.0;
            double potential = Math.max(0, v.fuelLitres() - expected * 0.9);
            saved += potential;
            distance += v.distanceKm();
            fuel += v.fuelLitres();
            String status = rate <= benchmark ? "On target" : rate <= benchmark * 1.25 ? "Review route/load" : "High consumption";
            summaries.add(new OptimizationResponse.VehicleSummary(v.id(), v.name(), round(rate), status));
        }
        return new OptimizationResponse(round(distance), round(fuel), round(fuel * CO2_PER_LITRE),
                round(saved), round(saved * FUEL_PRICE_PER_LITRE), summaries,
                "Prioritize vehicles marked High consumption; review route length, idle time, tyre pressure and load distribution. Savings are estimates.");
    }

    private double benchmark(String type) {
        return switch (type.toLowerCase()) {
            case "motorcycle", "bike" -> 2.2;
            case "van" -> 8.5;
            case "bus" -> 24.0;
            case "truck" -> 28.0;
            case "electric" -> 0.0;
            default -> 7.5;
        };
    }
    private double round(double n) { return Math.round(n * 100.0) / 100.0; }
}
