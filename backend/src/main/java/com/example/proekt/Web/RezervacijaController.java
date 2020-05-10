package com.example.proekt.Web;

import com.example.proekt.Model.Rezervacija;
import com.example.proekt.Model.request.RezervacijaRequest;
import com.example.proekt.Service.RezervacijaService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/rezervacija")
public class RezervacijaController {

    private final RezervacijaService rezervacijaService;

    public RezervacijaController(RezervacijaService rezervacijaService) {
        this.rezervacijaService = rezervacijaService;
    }

    @PostMapping
    public Rezervacija rezerviraj(@RequestBody RezervacijaRequest request1){
        return this.rezervacijaService.rezervacija(request1);
    }

}
