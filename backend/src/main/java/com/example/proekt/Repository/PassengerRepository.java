package com.example.proekt.Repository;

import com.example.proekt.Model.Patinci;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PassengerRepository extends JpaRepository<Patinci,Integer> {

    @Query("select p from Patinci p join Rezervacija r on p.rezervaciji.id = r.id where r.letovi = :idLet")
    public List<Patinci> allPassengersbyFlight(@Param("idLet") int idLet);

    @Query("select r.letovi from Patinci p join Rezervacija r on p.rezervaciji.id = r.id where r.letovi = :idLet")
    public List<Integer> lista();



}
