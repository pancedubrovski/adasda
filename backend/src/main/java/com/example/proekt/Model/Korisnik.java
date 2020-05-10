package com.example.proekt.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.List;

@Entity
@Data
public class Korisnik {

    @Id
    private int idKorisnik;
    private String Email;
    private String pasvord;
    private int brPatnici;
    private int vkCena;
    @ManyToOne
    private Patinci patinci;
}
