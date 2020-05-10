import React,{useState,useEffect} from "react";
import {Link,useHistory} from "react-router-dom";
import {useParams} from "react-router";
import FlyService from "../../Repository/FlyReposiory";//"src/Repository/FlyReposiory.js"

const FlightEdit = (props) =>{
    const {id}  =useParams();
    const [flight,setFlight] = useState({});
    const history = useHistory();
    const clearState = {
        "date": flight.idLet,
        "vremePoletuvanje": "",
        "vremePristignuva": "",
        "cena": 0,
        "vkSedista": 0,
        "poaga": 0,
        "pristignuva":0
    };
    useEffect(()=>{
        FlyService.fetchFlight(id).then(data=>{
            setFlight(data.data);
        })
    },[]);
    const onSubmit = (event) =>{
        event.preventDefault();
        const editFlight  = {
            "idLet": flight.idLet,
            "date": event.target.date.value,
            "vremePoletuvanje": event.target.vremePoletuvanje.value,
            "vremePristignuva": event.target.vremePristignuva.value,
            "cena": event.target.cena.value,
            "vkSedista": event.target.vkSedista.value,
            "poaga": event.target.poaga.value,
            "pristignuva": event.target.pristignuva.value
        };
        props.onEdit(editFlight);
        history.push("/flights");
    };
    const onRest = () => {
        setFlight(clearState);
    }
    const flyDate = () => {
        return (
            <div className="form-group row">
                <div className="col-md-6 font-weight-bold">Airport from</div>
                <div className="col-sm-6">
                    <input type="date"
                           className="form-control"
                           id="date"
                           name="date"
                           value={flight.date}
                           defaultValue={flight.date}
                           placeholder="date fly"
                           required
                           maxLength={50}
                           onChange={onChangeHandler}
                    />
                </div>
            </div>
        )
    }
        const vremePoletuvanje = () => {
            return (
                <div className="form-group row">
                    <label htmlFor="vremePoletuvanje" className="col-sm-4 offset-sm-1 text-left">Time start</label>
                    <div className="col-sm-6">
                        <input type="time"
                               className="form-control"
                               id="vremePoletuvanje"
                               name="vremePoletuvanje"
                               value={flight.vremePoletuvanje}
                               defaultValue={flight.vremePoletuvanje}
                               placeholder="vremePoletuvanje "
                               required
                               maxLength={50}
                               onChange={onChangeHandler}

                        />
                    </div>
                </div>
            )


        };
        const vremePistignvanje1 = () => {
            return (
                <div className="form-group row">
                    <label htmlFor="vremePristignuva" className="col-sm-4 offset-sm-1 text-left">Time end</label>
                    <div className="col-sm-6">
                        <input type="time"
                               className="form-control"
                               id="vremePristignuva"
                               name="vremePristignuva"
                               value={flight.vremePristignuva}
                               defaultValue={flight.vremePristignuva}
                               placeholder="vremePristignuva"
                               required
                               maxLength={50}
                               onChange={onChangeHandler}

                        />
                    </div>
                </div>
            )


        };
        const Price = () => {
            return (
                <div className="form-group row">
                    <label htmlFor="cena" className="col-sm-4 offset-sm-1 text-left">Price</label>
                    <div className="col-sm-6">
                        <input type="text"
                               className="form-control"
                               id="cena"
                               name="cena"
                               value={flight.cena}
                               defaultValue={flight.cena}
                               placeholder="Price"
                               required
                               maxLength={50}
                               onChange={onChangeHandler}

                        />
                    </div>
                </div>
            )


        };
    const onChangeHandler = (e) => {
        const paramName = e.target.name;
        const paramValue = e.target.value;
        setFlight({...flight, [paramName]: paramValue});
    };

    const totalsSets = () => {
            return (
                <div className="form-group row">
                    <label htmlFor="vkSedista" className="col-sm-4 offset-sm-1 text-left">total Sets</label>
                    <div className="col-sm-6">
                        <input type="text"
                               className="form-control"
                               id="vkSedista"
                               name="vkSedista"
                               value={flight.vkSedista}
                               defaultValue={flight.vkSedista}
                               placeholder="Total Sets"
                               required
                               maxLength={50}
                               onChange={onChangeHandler}

                        />
                    </div>
                </div>
            )


        };


        const airposts = props.airports.map((item => <option key={item.idAerodrom}
                                                             value={item.idAerodrom}>{item.ime.toString()}</option>)
        );

        const formAirport = () => {
            return (
                <div className="form-group row">


                    <div className="row form-group">
                        <div className="col-md-6 font-weight-bold">Airport from</div>
                        <div className="col-md-6">
                            <select  value={flight.poaga} defaultValue={flight.poaga} name={"poaga"} className="form-control" onChange={onChangeHandler}>

                                {airposts}
                            </select>
                        </div>
                    </div>
                </div>
            )
        };
        const toAirport = () => {
            return (
                <div className="form-group row">


                    <div className="row form-group">
                        <div className="col-md-6 font-weight-bold">Airport to</div>
                        <div className="col-md-6">
                            <select defaultValue={flight.pristignuva} value={flight.pristignuva} name={"pristignuva"} className="form-control" onChange={onChangeHandler}>
                                {airposts}
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


}; export default FlightEdit