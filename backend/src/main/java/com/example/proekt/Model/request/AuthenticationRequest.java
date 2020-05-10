package com.example.proekt.Model.request;

import lombok.Data;

import java.io.Serializable;

@Data
public class AuthenticationRequest implements Serializable {


    private static final long serialVersionUID = -6986746375915710855L;
    private String username;
    private String password;
}
