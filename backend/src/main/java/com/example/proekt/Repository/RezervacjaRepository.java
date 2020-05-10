package com.example.proekt.Repository;

import com.example.proekt.Model.Aerodormi;
import com.example.proekt.Model.Rezervacija;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RezervacjaRepository extends JpaRepository<Rezervacija,Integer> {


    @Query("select r from Rezervacija r ")
    public List<Rezervacija> getAllByLetovi(@Param("idLet") int idLet);
}
