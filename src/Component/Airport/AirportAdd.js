import React, {useState} from "react";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

const AirportAdd = (props) =>{
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
        event.preventDefault();
        const newItems = {
            "name": event.target.name.value,
            "gradID":event.target.gradID.value
        };
        props.onAddAirport(newItems);
        history.push("/airport");

    }
    const airportName = () => {
        return (
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-4 offset-sm-1 text-left">Airport</label>
                <div className="col-sm-6">
                    <input type="text"
                           className="form-control"
                           id="name"
                           name="name"
                           placeholder="CityName"
                           required
                           maxLength={50}
                           value={items.name}
                    />
                </div>
            </div>
        )


    };
    const cities = props.cities.map((item=><option key={item.idGrad} value={item.idGrad}>{item.grad.toString()}</option>)
    );

    const cityID = () => {
        return (
            <div className="form-group row">
                <label htmlFor="gradID" className="col-sm-4 offset-sm-1 text-left">CityName</label>

                <div className="row form-group">

                    <div className="col-md-6">
                        <select name={"gradID"} className="form-control">

                            {cities}
                        </select>
                    </div>
                </div>
            </div>
        )
    };
    const saveButton = () => {
        return (
            <div className="offset-sm-1 col-sm-3  text-center">
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
            <div className="col-sm-3 text-center">
                <Link to={"/airport"} className="btn btn-danger text-upper">Cancel</Link>
            </div>
        )
    };
    return (
        <div className="row">
            <form onSubmit={onSubmit}>
                <h4>Add Airport</h4>
                {airportName()}
                {cityID()}
                {saveButton()}
                {cancelButton()}
            </form>
        </div>
    )




}; export default AirportAdd;