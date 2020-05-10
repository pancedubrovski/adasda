import React from "react";
import AirportRow from "./AirportRow";
import {Link} from "react-router-dom";

const Airports = (props) =>{
  const list = props.airports.map((airport,index)=>
    <AirportRow airport={airport} key={index} onDelete={props.onDelete} />);
  const header = () =>{
    return(
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">City</th>
            <th scope="col">Country</th>
          </tr>
        </thead>
    )
  };
  const items = () =>{
    return (
        <div className="table-responsive">
            <table className="table tr-history table-striped small" id="bg">
                {header()}
                <tbody>{list}</tbody>
            </table>

        </div>
    );
  }

  return (

      <div className="row">

          <Link className="btn btn-info" to={"/airport/new"}>Додади Нов Аеродром</Link>
          {items()}
      </div>

  )
}; export default Airports;