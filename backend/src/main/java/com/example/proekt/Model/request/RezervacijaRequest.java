package com.example.proekt.Model.request;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Data
public class RezervacijaRequest {
    private List<PassengerRequest> passengerRequestList;
    private ArrayList<Integer> letovi;
    private double suma;

}
