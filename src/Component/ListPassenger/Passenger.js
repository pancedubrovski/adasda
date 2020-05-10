import React, {Component} from "react";
import Rezervacija from "../Card/rezerve";
import "./passenger.css"


const  Passenger =(props)=>{

        return(
            <div className={"row"}>
                <h1>Rezervacija Datum {props.rez.date}</h1>
                <table className={"table"} id="personTable">
                    <thead>
                        <tr>
                            <th scope="col-3">Name</th>
                            <th scope="col-3">Surname</th>
                            <th scope="col-3">Passport</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.rez.patnik.map((item,key)=>{
                        return (
                            <tr scope={"row"} key={key}>
                                <th >{item.ime}</th>
                                <th>{item.prezime}</th>
                                <th >{item.pasos}</th>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );

}; export default Passenger;