package com.example.proekt.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Drzavi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDrzava;
    private String ime;
    @OneToMany(mappedBy = "drzava",cascade = CascadeType.REMOVE,fetch = FetchType.LAZY)
    private List<Gradovi> getGradovi(){
        return this.getGradovi();
    }

    public Drzavi(String name) {
        this.ime = name;
    }
}
