import React from "react";
import axios from '../Axios/axios'

const FlyService = {
    fetchFly: ()=>{
        return axios.get("/flight");
    },
    addFly: (item)=>{
        return axios.post("/flight",item,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        });
    },
    deleteFly: (id)=>{
        return axios.delete(`/flight/${id}`,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        });
    },
    updateFly: (item)=>{
        return axios.patch(`/flight/${item.idLet}`,item,{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        });
    },
    fetchPassengerByFlight: (id)=>{
        return axios.get(`/flight/${id}/rezervacii`,{
      //     headers:{
       ///        Authorization: 'Bearer ' + localStorage.getItem("token")
       //    }
        });

    },
    fetchFlight: (id) =>{
        return axios.get(`/flight/${id}`)
    },
    fetchPaginationFlights: (page) =>{
        return axios.get(`/flight?page=${page}`)
    },
    fetchFlightsByCity:(from,to,start,end)=>{
        return axios.get(`flight/findFlights?from=${from}&to=${to}&departure=${start}&returnDate=${end}`)
    },
    fetchFlight1:(from,to,start)=> {
        return axios.get(`flight/findFlights?from=${from}&to=${to}&departure=${start}`)
    }
}; export default FlyService;