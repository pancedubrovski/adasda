package com.example.proekt.Model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class Uplata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUpldata;
    @ManyToOne
    private Korisnik korisnik;
    private LocalDate localDate;
    private double cena;
}
