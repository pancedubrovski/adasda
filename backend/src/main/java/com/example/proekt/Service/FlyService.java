package com.example.proekt.Service;

import com.example.proekt.Model.Let;
import com.example.proekt.Model.Rezervacija;
import com.example.proekt.Model.request.FlyRequired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.time.LocalDate;

public interface FlyService {
    Page<Let> getAllFlies(Pageable pageable);
    Let save(FlyRequired flyRequired);
    void delete(int id);
    List<Let> getFlies();
    Let Update(int id,FlyRequired flyRequired);
    Let findById(int id);
    List<Let> getFlights(String from,String to,LocalDate departure,LocalDate returnDate);
    List<Let> getFlightsWithStartDate(String from ,String to,LocalDate departure);

    List<Rezervacija> RezervaciibyLetId(int id);
}
