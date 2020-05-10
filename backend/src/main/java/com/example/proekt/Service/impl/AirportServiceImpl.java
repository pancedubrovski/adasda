package com.example.proekt.Service.impl;

import com.example.proekt.Model.Aerodormi;
import com.example.proekt.Model.Exception.InvalidCityException;
import com.example.proekt.Model.Gradovi;
import com.example.proekt.Model.request.AirportRequest;
import com.example.proekt.Repository.AirportRepository;
import com.example.proekt.Repository.GradRepository;
import com.example.proekt.Service.AirportService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AirportServiceImpl implements AirportService {

    private final AirportRepository airportRepository;
    private final GradRepository gradRepository;

    public AirportServiceImpl(AirportRepository airportRepository, GradRepository gradRepository) {
        this.airportRepository = airportRepository;
        this.gradRepository = gradRepository;
    }


    @Override
    public Aerodormi save(AirportRequest airportRequest) {
        Gradovi g = this.gradRepository.findById(airportRequest.getGradID()).orElseThrow(InvalidCityException::new);
        Aerodormi a = new Aerodormi(airportRequest.getName(),g);
        return this.airportRepository.save(a);
    }

    @Override
    public List<Aerodormi> allAirports() {
        return this.airportRepository.findAll();
    }

    @Override
    public void delete(int id) {
        this.airportRepository.deleteById(id);
    }
}
