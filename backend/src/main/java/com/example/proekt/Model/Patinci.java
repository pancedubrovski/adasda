package com.example.proekt.Model;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;



@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patinci {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idPatnik;
    private String ime;
    private String prezime;
    private String pasos;
    @ManyToOne
    private Gradovi grad;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Rezervacija rezervaciji;


    public Patinci(String fistName, String lastName, String passport,Rezervacija rezervacija) {
        this.ime = fistName;
        this.prezime = lastName;
        this.pasos = passport;
        this.rezervaciji = rezervacija;
    }
    public Patinci(String fistName, String lastName, String passport) {
        this.ime = fistName;
        this.prezime = lastName;
        this.pasos = passport;
    }
}
