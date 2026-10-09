package com.greenfleet.model;

import java.util.List;

public record OptimizationResponse(
        double totalDistanceKm,
        double totalFuelLitres,
        double estimatedCo2Kg,
        double potentialFuelSavedLitres,
        double potentialCostSaved,
        List<VehicleSummary> vehicles,
        String recommendation
) {
    public record VehicleSummary(String id, String name, double litresPer100Km, String status) {}
}
