package com.example.proekt.Web;

import com.example.proekt.Model.Drzavi;
import com.example.proekt.Model.Gradovi;
import com.example.proekt.Service.DrzavaService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/drzava")
public class DrzavaController {

    private final DrzavaService drzavaService;

    public DrzavaController(DrzavaService drzavaService) {
        this.drzavaService = drzavaService;
    }

    @GetMapping
    public List<Drzavi> getAllDrzavi(){

        return this.drzavaService.getDrzavi();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Drzavi creatDrzava(@RequestHeader String name){
       return  drzavaService.save(name);
    }

    @PutMapping("/{id}")
    public Drzavi updateDrzava(@PathVariable int id,@RequestHeader String name){
        return this.drzavaService.update(id,name);
    }

    @DeleteMapping("/{id}")
    public void deleteCountry(@PathVariable int id){
        this.drzavaService.delete(id);
    }  //  @GetMapping
   // public List<Gradovi> findAllCityOfCountry(@RequestParam int countryId){
 //       return this.drzavaService.getAllCities(countryId);
 //   }

}
