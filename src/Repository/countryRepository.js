import React from "react";
import axios from '../Axios/axios'
import qs from "querystring";

const CountryService = {
    fetchCountry: () =>{
        return axios.get("/drzava");
    },

    addCountry:(item) =>{
      //  console.log(item.name)
        return axios.post("/drzava",{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem("token"),
                'name':item.name

            }
        });
    },
    deleteCountry: (id)=>{
        return axios.delete(`/drzava/${id}`,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        });
    }
}
export default CountryService;