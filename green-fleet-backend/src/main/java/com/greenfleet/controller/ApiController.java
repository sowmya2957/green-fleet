package com.greenfleet.controller;

import com.greenfleet.model.OptimizationResponse;
import com.greenfleet.model.PredictionRequest;
import com.greenfleet.model.PredictionResponse;
import com.greenfleet.model.Vehicle;
import com.greenfleet.service.FleetService;
import com.greenfleet.service.FuelPredictionService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final FuelPredictionService predictionService;
    private final FleetService fleetService;

    public ApiController(FuelPredictionService predictionService, FleetService fleetService) {
        this.predictionService = predictionService;
        this.fleetService = fleetService;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "ok", "service", "Green Fleet Optimization API");
    }

    @PostMapping("/predict")
    public PredictionResponse predict(@Valid @RequestBody PredictionRequest request) {
        return predictionService.predict(request);
    }

    @PostMapping("/fleet/optimize")
    public OptimizationResponse optimize(@RequestBody List<@Valid Vehicle> vehicles) {
        return fleetService.optimize(vehicles);
    }
}
