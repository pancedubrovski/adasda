package com.example.proekt.Service.impl;

import com.example.proekt.Model.Exception.InvalidPassengerIdException;
import com.example.proekt.Model.Let;
import com.example.proekt.Model.Patinci;
import com.example.proekt.Model.Rezervacija;
import com.example.proekt.Model.request.RezervacijaRequest;
import com.example.proekt.Repository.FlyRepository;
import com.example.proekt.Repository.PassengerRepository;
import com.example.proekt.Repository.RezervacjaRepository;
import com.example.proekt.Service.RezervacijaService;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class RezervacijaServiceImpl implements RezervacijaService {


    private final FlyRepository flyRepository;
    private final RezervacjaRepository rezervacjaRepository;
    private final PassengerRepository passengerRepository;

    public RezervacijaServiceImpl(FlyRepository flyRepository, RezervacjaRepository rezervacjaRepository, PassengerRepository passengerRepository) {
        this.flyRepository = flyRepository;
        this.rezervacjaRepository = rezervacjaRepository;
        this.passengerRepository = passengerRepository;
    }

    @Override
    public Rezervacija rezervacija(RezervacijaRequest rez) {
          List<Let> letovi =   rez.getLetovi().stream()
                  .map(a->this.flyRepository.findById(a)
                          .orElseThrow(InvalidPassengerIdException::new))
                .collect(Collectors.toList());

        Rezervacija r = new Rezervacija();
        r.setLetovi(letovi);
        r.setVkSuma(rez.getSuma());
        r.setDate(LocalDate.now());
        rezervacjaRepository.save(r);
        List<Patinci> patnici = rez.getPassengerRequestList().stream()
                .map(a->new Patinci(a.getFirstName(),a.getLastName(),a.getPassport(),r))
                .collect(Collectors.toList());
        this.passengerRepository.saveAll(patnici);



        return r;
    }

    @Override
    public List<Rezervacija> getRezevacii(int idLet) {
        return this.rezervacjaRepository.getAllByLetovi(idLet);
    }

}
