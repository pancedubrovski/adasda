package com.example.proekt.Service;

import com.example.proekt.Model.Drzavi;
import com.example.proekt.Model.Gradovi;

import java.util.List;

public interface DrzavaService {
    public Drzavi save(String name);
    List<Drzavi> getDrzavi();
    Drzavi update(int idDrzava,String name);
    void delete(int idCountry);
 //   List<Gradovi> getAllCities(int countryID);
}
