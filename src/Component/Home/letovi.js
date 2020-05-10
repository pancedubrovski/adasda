import React,{useState} from "react";
import Flies from "../Flight/FlightList";
import FlyRow from "../Flight/FlyRow";


const Letovi = (props) =>{



    console.log(props.flights)
    return(
            <div >
                    <Flies flies={props.flights} onDelete={props.onDelete}/>
            </div>

    );



}; export default Letovi;