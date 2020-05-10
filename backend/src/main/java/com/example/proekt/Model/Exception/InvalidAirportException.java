package com.example.proekt.Model.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class InvalidAirportException extends RuntimeException {
    public InvalidAirportException(){
        super("Ne validen aerodrom");
    }
}
