package com.example.proekt.Model.request;

import com.example.proekt.Model.Aerodormi;
import lombok.Data;

import javax.persistence.ManyToOne;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class FlyRequired {
    private LocalDate date;
    private LocalTime vremePoletuvanje;
    private LocalTime vremePristignuva;
    private float cena;
    private int vkSedista;
  //  private int rezerviraniSedidsta;
    private int  poaga;
    private int pristignuva;
}
