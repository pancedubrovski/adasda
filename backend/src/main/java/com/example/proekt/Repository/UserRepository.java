package com.example.proekt.Repository;

import com.example.proekt.Model.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Korisnik,Integer> {

}
