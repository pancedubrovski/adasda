package com.example.proekt.Service.impl;

import com.example.proekt.Model.Exception.InvalidPassengerIdException;
import com.example.proekt.Model.Patinci;
import com.example.proekt.Model.request.PassengerRequest;
import com.example.proekt.Repository.PassengerRepository;
import com.example.proekt.Service.PassengerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PassengerServiceImpl implements PassengerService {

    private final PassengerRepository passengerRepository;

    public PassengerServiceImpl(PassengerRepository passengerRepository) {
        this.passengerRepository = passengerRepository;
    }

    @Override
    public List<Patinci> getPassenger() {
        return this.passengerRepository.findAll();
    }

    @Override
    public Patinci save(PassengerRequest passengerRequest) {
        Patinci p = new Patinci(passengerRequest.getFirstName(),passengerRequest.getLastName(),passengerRequest.getPassport());
        return this.passengerRepository.save(p);
    }

    @Override
    public Patinci update(int id,String name){
        Patinci p = getPatnik(id);
        p.setIme(name);
        return this.passengerRepository.save(p);
    }

    @Override
    public List<Patinci> getPassengersByFlight(int idLet) {
        return  this.passengerRepository.allPassengersbyFlight(idLet);
    }

    @Override
    public List<Integer> getList() {
        return this.passengerRepository.lista();
    }

    public Patinci getPatnik(int id){
        return this.passengerRepository.findById(id).orElseThrow(InvalidPassengerIdException::new);
    }

}
