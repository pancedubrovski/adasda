package com.example.proekt.Model.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class InvalidPassengerIdException extends RuntimeException {
    public InvalidPassengerIdException(){
        super("Have't passenger with this id ");
    }
}
