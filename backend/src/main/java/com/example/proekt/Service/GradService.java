package com.example.proekt.Service;

import com.example.proekt.Model.Gradovi;
import java.util.List;

public interface GradService {
    Gradovi save(String name,int countryID);
    List<Gradovi> getAllCities();
    void delete(int id);
}
