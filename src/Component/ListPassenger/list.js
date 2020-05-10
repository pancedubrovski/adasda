import React, {Component} from "react";
import Autocomplete from "react-autocomplete";
import {renderCity} from "../Home/PocetnaStrana";
import Help from "../Flight/FlightPagination";
import Passenger from "./Passenger";
import FlyRow from "../Flight/FlyRow";

const Passengers = (props)=>{



    const list = props.rezervaci.map((item,index)=>
        <Passenger  rez={item} key={index}  />);

return(
    <div >
        {list}
    </div>
);


};export default Passengers;