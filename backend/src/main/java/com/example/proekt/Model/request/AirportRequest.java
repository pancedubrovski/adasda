package com.example.proekt.Model.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class AirportRequest {
    @NotNull
    private String name;
    private int gradID;
}
