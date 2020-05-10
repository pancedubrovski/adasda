package com.example.proekt.Service;

import com.example.proekt.Model.Rezervacija;
import com.example.proekt.Model.request.RezervacijaRequest;
import java.util.List;

public interface RezervacijaService  {


    public Rezervacija rezervacija(RezervacijaRequest rez);

    List<Rezervacija> getRezevacii(int idLet);

}
