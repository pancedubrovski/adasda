package com.example.proekt.Repository;

import com.example.proekt.Model.Let;
import com.example.proekt.Model.Rezervacija;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

@Repository
public interface FlyRepository extends JpaRepository<Let,Integer> {

    Page<Let> findAll(Pageable pageable);
    @Query("select l from Let l ")
    List<Let> findFlies();
    @Query("select l from Let l where (l.poaga.grad.grad=:from and l.pristignuva.grad.grad=:to and l.date=:departure  ) or (l.poaga.grad.grad=:to and l.pristignuva.grad.grad=:from and l.date=:returnDate)")
    List<Let> getFlightsByCity(@Param("from") String from, @Param("to") String to, @Param("departure") LocalDate departure,@Param("returnDate") LocalDate returnDate);


    @Query("select l from Let l where l.poaga.grad.grad=:from and l.pristignuva.grad.grad=:to and l.date between :departure and :date order by l.date")
    List<Let> getFirstByDeparture( @Param("from") String from, @Param("to") String to,@Param("departure") LocalDate departure,@Param("date") LocalDate date);

    Optional<Let> findById(Integer a);

    @Query("SELECT r FROM Rezervacija r JOIN r.letovi l WHERE l.idLet = :id ")
    List<Rezervacija> getRezervacii(@Param("id") int id);



}
