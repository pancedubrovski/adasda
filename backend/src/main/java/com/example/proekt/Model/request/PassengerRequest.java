package com.example.proekt.Model.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class PassengerRequest {
    @NotNull
    private String firstName;
    private String lastName;
    private String passport;
}
