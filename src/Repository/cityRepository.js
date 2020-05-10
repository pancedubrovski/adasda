import React from "react";
import axios from '../Axios/axios'
import qs from 'querystring'
const CityService = {

    fetchCity: () =>{
     //   debugger;
        return axios.get("/city");
    },
    addCity:(item) =>{
        const data ={
            ...item,
            countyId:item.countryId
        }
        const formParams = qs.stringify(data);
        console.log(formParams);
        return axios.post("/city",formParams,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem("token"),
                'name':item.name
            }
        });
    },
    deleteCity: (id)=>{
        return axios.delete(`/city/${id}`,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        });
    }
}
export default CityService;