package com.example.proekt.Repository;

import com.example.proekt.Model.Aerodormi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

@Repository
public interface AirportRepository extends JpaRepository<Aerodormi,Integer> {
    @Modifying
    void deleteById(int id);
}
