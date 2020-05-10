package com.example.proekt.Service.impl;

import com.example.proekt.Model.Aerodormi;
import com.example.proekt.Model.Exception.InvalidAirportException;
import com.example.proekt.Model.Let;
import com.example.proekt.Model.Rezervacija;
import com.example.proekt.Model.request.FlyRequired;
import com.example.proekt.Repository.AirportRepository;
import com.example.proekt.Repository.FlyRepository;
import com.example.proekt.Service.FlyService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.List;

@Service
public class FlyServiceImpl implements FlyService {
    private final AirportRepository airportRepository;
    private final FlyRepository flyRepository;

    public FlyServiceImpl(AirportRepository airportRepository, FlyRepository flyRepository) {
        this.airportRepository = airportRepository;
        this.flyRepository = flyRepository;
    }

    @Override
    public Page<Let> getAllFlies(Pageable p) {
        return this.flyRepository.findAll(p);
    }

    @Override
    public Let save(FlyRequired f) {
        Aerodormi od = airportRepository.findById(f.getPoaga()).orElseThrow(InvalidAirportException::new);
        Aerodormi doMesot = airportRepository.findById(f.getPristignuva()).orElseThrow(InvalidAirportException::new);
        Let l = new Let(f.getDate(),f.getVremePoletuvanje(),f.getVremePristignuva(),f.getCena(),f.getVkSedista(),od,doMesot);
        return this.flyRepository.save(l);
    }

    @Override
    public void delete(int id) {
        this.flyRepository.deleteById(id);
    }

    @Override
    public List<Let> getFlies() {
        return this.flyRepository.findFlies();
    }

    @Override
    public Let Update(int id, FlyRequired flyRequired) {
        Let l = flyRepository.findById(id).orElseThrow(InvalidAirportException::new);
        l.setCena(flyRequired.getCena());
        l.setDate(flyRequired.getDate());
        Aerodormi newTo = airportRepository.findById(flyRequired.getPoaga()).orElseThrow(InvalidAirportException::new);
        Aerodormi newFrom = airportRepository.findById(flyRequired.getPristignuva()).orElseThrow(InvalidAirportException::new);
        l.setPoaga(newTo);
        l.setPristignuva(newFrom);
        l.setVremePoletuvanje(flyRequired.getVremePoletuvanje());
        l.setVremePristignuva(flyRequired.getVremePristignuva());
        return  flyRepository.saveAndFlush(l);
    }

    @Override
    public Let findById(int id) {
        return this.flyRepository.findById(id).orElseThrow(InvalidAirportException::new);
    }

    @Override
    public List<Let> getFlights(String from, String to,LocalDate departure,LocalDate returnDate) {
        return  this.flyRepository.getFlightsByCity(from,to,departure,returnDate);
    }

    @Override
    public List<Let> getFlightsWithStartDate(String from, String to, LocalDate departure) {
        LocalDate date = departure.plusDays(7);
        return this.flyRepository.getFirstByDeparture(from,to,departure,date);
    }

    @Override
    public List<Rezervacija> RezervaciibyLetId(int id) {
        return this.flyRepository.getRezervacii(id);
    }

}
