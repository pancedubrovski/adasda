package com.example.proekt.Service.impl;

import com.example.proekt.Model.Drzavi;
import com.example.proekt.Model.Exception.NoExistCountry;
import com.example.proekt.Model.Gradovi;
import com.example.proekt.Repository.DrzavaRepository;
import com.example.proekt.Repository.GradRepository;
import com.example.proekt.Service.GradService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityServiceImpl implements GradService {

    private final GradRepository repository;
    private final DrzavaRepository Drepository;

    public CityServiceImpl(GradRepository repository, DrzavaRepository drepository) {
        this.repository = repository;
        Drepository = drepository;
    }

    @Override
    public Gradovi save(String name,int cId) {
        Drzavi d= Drepository.findById(cId).orElseThrow(NoExistCountry::new);
        Gradovi g = new Gradovi(name,d);
        return this.repository.save(g);
    }

    @Override
    public List<Gradovi> getAllCities() {
        return this.repository.findAll();
    }

    @Override
    public void delete(int id) {
         this.repository.deleteById(id);
    }
}
