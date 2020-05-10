import React from "react";
import axios from '../Axios/axios'

const AirportService = {
    fetchAirports: () =>{
        return axios.get("/airport");

    },
    addAirport: (item) =>{
      return axios.post("/airport",item,{
          headers:{
              Authorization: 'Bearer ' + localStorage.getItem("token")
          }
      });
    },
    deleteIngredient: (id) => {
        return axios.delete(`/airport/${id}`);
    }


}; export default AirportService;