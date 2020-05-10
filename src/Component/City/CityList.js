import React from "react";
import {Link, useHistory} from 'react-router-dom';
import CityRow from "./CityRow";
const CityList = (props) =>{


    const Cities = props.items.map((item,key)=>
        <CityRow cities={item} key={key} onDelete={props.onDelete} />
    );

    return (
        <div className="container">
            <Link className="btn btn-primary" to={"/city/new"} >Add New City</Link>
            <table className={"table tr-history table-striped"} id="bg">
                <thead>
                    <tr>
                        <td>Град</td>
                    </tr>
                </thead>
                <tbody>
                {Cities}
                </tbody>
            </table>
        </div>
    )

};
export default CityList;