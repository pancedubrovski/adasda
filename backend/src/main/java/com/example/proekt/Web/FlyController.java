package com.example.proekt.Web;

import com.example.proekt.Model.Let;

import com.example.proekt.Model.Rezervacija;
import com.example.proekt.Model.request.FlyRequired;
import com.example.proekt.Service.FlyService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/flight")
public class FlyController {
    private final FlyService flyService;

    public FlyController(FlyService flyService) {
        this.flyService = flyService;
    }

    @GetMapping
    public Page<Let> getAllFly(@PageableDefault(size= 10,page=0) @SortDefault.SortDefaults(
            {@SortDefault(sort = "date", direction = Sort.Direction.ASC)}) Pageable pageable){
        return  this.flyService.getAllFlies(pageable);
    }
    @GetMapping("/findFlights")
   // @RequestParam(value = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
    public List<Let> getFlightsByCity(@RequestParam("from") String from,
                                      @RequestParam(value = "to") String to,
                                      @RequestParam(value = "departure") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departure,
                                      @RequestParam(value = "returnDate",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate returnDate) {
        return returnDate != null ? this.flyService.getFlights(from, to, departure, returnDate) : this.flyService.getFlightsWithStartDate(from, to, departure);

    }
    @PostMapping
    public Let saveFly(@RequestBody FlyRequired flyRequired){
        return this.flyService.save(flyRequired);
    }
    @DeleteMapping("/{id}")
    public void deleteFly(@PathVariable int id){
        this.flyService.delete(id);
    }

    @PatchMapping("/{id}")
    public Let updateFly(@PathVariable int id,@RequestBody FlyRequired flyRequired){
        return this.flyService.Update(id,flyRequired);
    }
    @GetMapping("/{id}")
    public Let getFlight(@PathVariable int id){
       return this.flyService.findById(id);
    }

    @GetMapping("/{id}/rezervacii")
    public List<Rezervacija> getRezervacii(@PathVariable int id) {
        return this.flyService.RezervaciibyLetId(id);
    }

}
