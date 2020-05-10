package com.example.proekt.Service;

import com.example.proekt.Model.Patinci;
import com.example.proekt.Model.request.PassengerRequest;
import java.util.List;

public interface PassengerService {

    List<Patinci> getPassenger();
    Patinci save(PassengerRequest passengerRequest);
    Patinci update(int ID, String passengerRequest);
    List<Patinci> getPassengersByFlight(int idLet);


    List<Integer> getList();
 }
