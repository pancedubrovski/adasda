import React, {useState} from "react";
import {useHistory} from "react-router";

const CountryAdd = (props) => {

    const history = useHistory();
    const [items,setItem] = useState({});

    const clearState = {
        name: ""
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        const newItem  ={
            "name" : event.target.name.value
        }
        props.onAddCountry(newItem);
        history.push("/country")
    }


    return(
        <form onSubmit={onSubmit}>
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-4 offset-sm-1 text-left">Country Name</label>
                <div className="col-sm-6">
                    <input type="text"
                           className="form-control"
                           id="name"
                           name="name"
                           placeholder="CountryName"
                           required
                           maxLength={50}
                           value={items.name}
                    />
                </div>
            </div>
            <div className="offset-sm-1 col-sm-3  text-center">
                <button type="submit"
                        className="btn btn-primary text-upper"
                >
                    Save
                </button>
            </div>
        </form>
    )

}; export default CountryAdd;
