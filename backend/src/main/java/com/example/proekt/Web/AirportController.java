package com.example.proekt.Web;

import com.example.proekt.Model.Aerodormi;
import com.example.proekt.Model.request.AirportRequest;
import com.example.proekt.Service.AirportService;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/airport")
public class AirportController {
    private final AirportService airportService;

    public AirportController(AirportService airportService) {
        this.airportService = airportService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Aerodormi> getAllAirport(){

        return this.airportService.allAirports();
    }
    @PostMapping
    public Aerodormi saveAirport(@RequestBody AirportRequest airportRequest){
        return this.airportService.save(airportRequest);
    }
    @DeleteMapping(path = "/{id}")
    public void deleteAirport(@PathVariable int id){
        this.airportService.delete(id);
    }
}
