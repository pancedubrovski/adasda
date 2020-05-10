package com.example.proekt.Model;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Aerodormi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAerodrom;
    private String ime;
    @ManyToOne
    private Gradovi grad;


    public Aerodormi(String name,Gradovi grad) {
        this.ime = name;
        this.grad = grad;
    }
}
