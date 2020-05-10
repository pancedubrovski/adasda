import React from "react";
import axios from '../Axios/axios'

const RezervacijaRepository = {
    addReserve: (item)=>{
        axios.post("/rezervacija",item,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
    }

}; export default RezervacijaRepository;