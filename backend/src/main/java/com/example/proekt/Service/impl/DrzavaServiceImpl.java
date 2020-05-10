package com.example.proekt.Service.impl;


import com.example.proekt.Model.Drzavi;
import com.example.proekt.Model.Exception.InvalidPassengerIdException;
import com.example.proekt.Model.Gradovi;
import com.example.proekt.Repository.DrzavaRepository;
import com.example.proekt.Service.DrzavaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DrzavaServiceImpl implements DrzavaService {

    private final DrzavaRepository drzavaRepository;

    public DrzavaServiceImpl(DrzavaRepository drzavaRepository) {
        this.drzavaRepository = drzavaRepository;
    }

    @Override
    public Drzavi save(String name) {
        Drzavi d = new Drzavi(name);
        return this.drzavaRepository.save(d);
    }

    @Override
    public List<Drzavi> getDrzavi() {
        return this.drzavaRepository.findAll();
    }

    @Override
    public Drzavi update(int idDrzava, String name) {
        Drzavi d = drzavaRepository.findById(idDrzava).orElseThrow(InvalidPassengerIdException::new);
        d.setIme(name);
        return drzavaRepository.saveAndFlush(d);
    }

    @Override
    public void delete(int idCountry) {
        Drzavi d = this.drzavaRepository.findById(idCountry).orElseThrow(InvalidPassengerIdException::new);
        this.drzavaRepository.delete(d);
    }


    //   @Override
  //  public List<Gradovi> getAllCities(int countryID) {
    //    return this.drzavaRepository.findAllCityOfCountry1(countryID);
  //  }
}
