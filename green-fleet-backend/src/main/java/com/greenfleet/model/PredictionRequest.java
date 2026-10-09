package com.greenfleet.model;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PredictionRequest(
        @NotBlank String vehicleType,
        @NotNull @DecimalMin("0.1") Double distanceKm,
        @NotNull @DecimalMin("0.1") Double loadKg,
        @NotNull @Min(0) @Max(160) Integer averageSpeedKmh,
        @NotNull @Min(0) @Max(100) Integer trafficLevel,
        @NotNull @Min(0) @Max(100) Integer acUsagePercent
) {}
