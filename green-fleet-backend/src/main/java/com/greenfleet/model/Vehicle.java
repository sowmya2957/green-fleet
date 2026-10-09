package com.greenfleet.model;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record Vehicle(
        @NotBlank String id,
        @NotBlank String name,
        @NotBlank String type,
        @NotNull @DecimalMin("0.1") Double distanceKm,
        @NotNull @DecimalMin("0.1") Double fuelLitres,
        @NotNull @DecimalMin("0.0") Double loadKg
) {}
