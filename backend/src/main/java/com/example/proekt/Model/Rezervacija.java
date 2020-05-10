package com.example.proekt.Model;


import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;


@Getter
@Setter
@Entity
public class Rezervacija {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private LocalDate date;
    @OneToMany(mappedBy = "rezervaciji")
    private List<Patinci> patnik;



   @ManyToMany(fetch = FetchType.LAZY)
    private List<Let> letovi;
    private double vkSuma;
 //   private int brPatnici;

}
