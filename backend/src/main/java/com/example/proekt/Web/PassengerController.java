package com.example.proekt.Web;


import com.example.proekt.Model.Patinci;
import com.example.proekt.Model.request.PassengerRequest;
import com.example.proekt.Service.PassengerService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/passenger")
public class PassengerController {

    private final PassengerService service;

    public PassengerController(PassengerService service) {
        this.service = service;
    }

    @GetMapping
    public List<Patinci> getAllPassengers(){
        return this.service.getPassenger();
    }

    @PostMapping
    public Patinci savePassenger(@RequestBody  PassengerRequest passengerRequest){
        return this.service.save(passengerRequest);
    }

    @PutMapping("/{id}")
    public Patinci updatePassenger(@PathVariable int id, @RequestHeader String name){
        return this.service.update(id,name);
    }
    @GetMapping("/find")
    public List<Patinci> getPassengersByFlightID(@RequestParam("idLet") int idLet){
        return this.service.getPassengersByFlight(idLet);

    }

}
