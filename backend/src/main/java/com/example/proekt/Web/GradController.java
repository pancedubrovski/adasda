package com.example.proekt.Web;

import com.example.proekt.Model.Gradovi;
import com.example.proekt.Service.GradService;
import org.hibernate.Session;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/city")
public class GradController {

    private final GradService gradService;

    public GradController(GradService gradService) {
        this.gradService = gradService;
    }

    @GetMapping
    public List<Gradovi> allCities(){
        return this.gradService.getAllCities();
    }

    @PostMapping
    public Gradovi saveCity(@RequestHeader String name, @RequestParam int countyId){
        return this.gradService.save(name,countyId);
    }
    @DeleteMapping("/{id}")
    public void deleteCountry(@PathVariable int id) {
        this.gradService.delete(id);

    }
   // @DeleteMapping("/{id")
  //  public void deleteCity(@PathVariable int id){
   //      this.gradService.delete(id);
  //  }

}
