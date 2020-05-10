import React, {Component, useState} from "react";
import { DatePicker } from '@progress/kendo-react-dateinputs';
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import "./FlightStylesheet.css";



const FlyAdd = (props) => {

    const history = useHistory();
    const [items,setItem] = useState({});

    const clearState = {
        name: "",
        gradID: 0
    };
    const onReset = () =>{
        //     setItem(clearState);
    }
    const onSubmit = (event)=>{
        debugger;
        event.preventDefault();
        const newItems = {
            "date": event.target.date.value,
            "vremePoletuvanje": event.target.vremePoletuvanje.value,
            "vremePristignuva": event.target.vremePristignuva.value,
            "cena": event.target.cena.value,
            "vkSedista": event.target.vkSedisra.value,
            "poaga": event.target.poaga.value,
            "pristignuva": event.target.pristigunva.value
        };
        props.onAddFly(newItems);
        history.push("/flights");

    }

    const flyDate = () => {
        return (
            <div className="form-group row " id="flightAdd">
                <div className="col-md-6 font-weight-bold">Airport from</div>
                <div className="col-sm-6">
                    <input type="date"
                           className="form-control"
                           id="date"
                           name="date"
                           placeholder="date fly"
                           required
                           maxLength={50}
                           value={items.name}
                    />
                </div>
            </div>
        )


    };
    const vremePoletuvanje = () => {
        return (
            <div className="form-group row" id="flightAdd">
                <label htmlFor="vremePoletuvanje" className="col-sm-4 offset-sm-1 text-left">Time start</label>
                <div className="col-sm-6">
                    <input type="time"
                           className="form-control"
                           id="vremePoletuvanje"
                           name="vremePoletuvanje"
                           placeholder="vremePoletuvanje "
                           required
                           maxLength={50}
                           value={items.name}
                    />
                </div>
            </div>
        )


    };
    const vremePistignvanje1 = () => {
        return (
            <div className="form-group row" id="flightAdd">
                <label htmlFor="vremePristignuva" className="col-sm-4 offset-sm-1 text-left">Time end</label>
                <div className="col-sm-6">
                    <input type="time"
                           className="form-control"
                           id="vremePristignuva"
                           name="vremePristignuva"
                           placeholder="vremePristignuva"
                           required
                           maxLength={50}
                           value={items.name}
                    />
                </div>
            </div>
        )


    };
    const Price = () => {
        return (
            <div className="form-group row" id="flightAdd">
                <label htmlFor="cena" className="col-sm-4 offset-sm-1 text-left">Price</label>
                <div className="col-sm-6">
                    <input type="text"
                           className="form-control"
                           id="cena"
                           name="cena"
                           placeholder="Price"
                           required
                           maxLength={50}
                           value={items.name}
                    />
                </div>
            </div>
        )


    };
    const totalsSets = () => {
        return (
            <div className="form-group row" id="flightAdd">
                <label htmlFor="vkSedisra" className="col-sm-4 offset-sm-1 text-left">total Sets</label>
                <div className="col-sm-6">
                    <input type="text"
                           className="form-control"
                           id="vkSedisra"
                           name="vkSedisra"
                           placeholder="total Sets"
                           required
                           maxLength={50}
                           value={items.name}
                    />
                </div>
            </div>
        )


    };




    const airposts = props.airports.map((item=><option key={item.idAerodrom} value={item.idAerodrom}>{item.ime.toString()}</option>)
    );

    const formAirport = () => {
        return (
            <div className="form-group row" id="flightAdd">


                <div className="row form-group">
                    <div className="col-md-6 font-weight-bold">Airport from</div>
                    <div className="col-md-6">
                        <select name={"poaga"} className="form-control">

                            {airposts}
                        </select>
                    </div>
                </div>
            </div>
        )
    };
    const toAirport = () => {
        return (
            <div className="form-group row" id="flightAdd">


                <div className="row form-group">
                    <div className="col-md-6 font-weight-bold">Airport to</div>
                        <div className="col-md-6">
                            <select name={"pristigunva"} className="form-control">
                                {airposts}
                            </select>
                        </div>

                </div>
            </div>

        )
    };
    const saveButton = () => {
        return (
            <div className="offset-sm-1 col-sm-3  text-center" id="flightAdd">
                <button type="submit"
                        className="btn btn-primary text-upper"
                >
                    Save
                </button>
            </div>
        )
    };
    const cancelButton = () => {
        return (
            <div className="col-sm-3 text-center" id="flightAdd">
                <Link to={"/flights"} className="btn btn-danger text-upper">Cancel</Link>

            </div>
        )
    };

    return (
        <div className="row">
            <form onSubmit={onSubmit}>
                <h4>Add Fly</h4>
                {flyDate()}
                {vremePoletuvanje()}
                {vremePistignvanje1()}
                {Price()}
                {totalsSets()}
                {formAirport()}
                {toAirport()}
                {saveButton()}
                {cancelButton()}

            </form>
        </div>
    )




}; export default FlyAdd;