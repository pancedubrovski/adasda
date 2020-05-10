package com.example.proekt.Repository;

import com.example.proekt.Model.Gradovi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GradRepository extends JpaRepository<Gradovi,Integer> {

}
