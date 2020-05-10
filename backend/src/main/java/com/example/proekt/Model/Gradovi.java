package com.example.proekt.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Optional;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Gradovi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idGrad;
    private  String grad;
    @JsonBackReference
    @ManyToOne(cascade = CascadeType.REFRESH,fetch = FetchType.LAZY)
    @JoinColumn(name = "drzava_id")
    private Drzavi drzava;

    public Gradovi(String name, Drzavi d) {
        this.grad = name;
        this.drzava = d;
    }
}
