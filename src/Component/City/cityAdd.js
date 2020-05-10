import React, {useState} from "react";
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';


const CityAdd = (props) => {

    const history = useHistory();
    const [items,setItem] = useState({});

    const clearState = {
        name: "",
        countryId: 0
    };
    const onReset = () =>{
   //     setItem(clearState);
    }
    const onSubmit = (event)=>{
        event.preventDefault();
        const newItems = {
            "name": event.target.name.value,
            "countryId":event.target.countryId.value
        };
        props.onAddItems(newItems);
        history.push("/city");

    }
    const cityName = () => {
        return (
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-4 offset-sm-1 text-left">CityName</label>
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
    const Countries = props.country.map((item=><option key={item.idDrzava} value={item.idDrzava}>{item.ime.toString()}</option>)
    );

    const countryId = () => {
        return (
            <div className="form-group row">
                <label htmlFor="countryId" className="col-sm-4 offset-sm-1 text-left">CityName</label>

                <div className="row form-group">

                    <div className="col-md-6">
                        <select name={"countryId"} className="form-control">

                            {Countries}
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
              <Link to={"/city"} className="btn btn-danger text-upper">Cancel</Link>
            </div>
        )
    };
    return (
        <div className="row">
            <form onSubmit={onSubmit}>
                <h4>Add City</h4>
                {cityName()}
                {countryId()}
                {saveButton()}
                {cancelButton()}
            </form>
        </div>
    )

}; export default CityAdd;


