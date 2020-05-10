import React from "react";
import {Link} from "react-router-dom";
import CountryRow from "./CountryRow";

const CountryList = (props) =>{

    const Countries = props.country.map((item,key)=>
        <CountryRow country={item} key={key} onDelete={props.onDelete}  />
    );


    return (
        <div className="container">

            <Link className="btn btn-primary" to={"/country/new"}>Додади нова држава</Link>
            <table  className={"table tr-history table-striped"} id="bg">
                <thead>
                    <tr>
                        <td>Држава</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {Countries}
                </tbody>
            </table>
        </div>
    )

};
export default CountryList;