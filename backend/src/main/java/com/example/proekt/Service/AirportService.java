package com.example.proekt.Service;

import com.example.proekt.Model.Aerodormi;
import com.example.proekt.Model.request.AirportRequest;
import java.util.List;

public interface AirportService {
    Aerodormi save(AirportRequest airportRequest);
    List<Aerodormi> allAirports();
    void delete(int id);
}
