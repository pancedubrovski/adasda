package com.example.proekt.Model;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Let {

    @Id
    @GeneratedValue
    @Column(name = "idLet", updatable = true, nullable = false)
    private int idLet;

    private LocalDate date;
    private LocalTime vremePoletuvanje;
    private LocalTime vremePristignuva;
    private float cena;
    private int vkSedista;
    private int rezerviraniSedidsta;
    @ManyToOne
    private Aerodormi poaga;
    @ManyToOne //(fetch = FetchType.LAZY)
    private Aerodormi pristignuva;



    public Let(LocalDate
                       date, LocalTime vremePoletuvanje, LocalTime vremePristignuva, float cena, int vkSedista, Aerodormi od,Aerodormi doMesto) {
        this.date= date;
        this.vremePristignuva = vremePristignuva;
        this.vremePoletuvanje= vremePoletuvanje;
        this.cena = cena;
        this.vkSedista = vkSedista;
        this.poaga = od;
        this.pristignuva = doMesto;
    }
}
