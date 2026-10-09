package com.greenfleet.model;

public record PredictionResponse(
        double predictedLitres,
        double litresPer100Km,
        double estimatedCost,
        double estimatedCo2Kg,
        String efficiencyLabel,
        String explanation
) {}
