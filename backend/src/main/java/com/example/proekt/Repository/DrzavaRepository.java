package com.example.proekt.Repository;

import com.example.proekt.Model.Drzavi;
import com.example.proekt.Model.Gradovi;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DrzavaRepository extends JpaRepository<Drzavi,Integer> {

   // @Query("select g from Gradovi g join Drzavi d on g.drzava = d.idDrzava")
   // List<Gradovi> findAllCityOfCountry1(@Param("countryID") int id);

   @Modifying
   Drzavi deleteByIdDrzava(int IdDrzava);

}
