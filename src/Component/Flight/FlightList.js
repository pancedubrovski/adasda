import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import FlyRow from "./FlyRow";



const Flies = (props) =>{

    const list = props.flies.map((fly,index)=>
        <FlyRow  onClickReservation={props.onClickReservation} flies1={fly} key={index} onDelete={props.onDelete} />);





    const header = () =>{

        return(
            <thead id="bg">
            <tr id="bg">
                <th scope="col">Date</th>
                <th scope="col">Time to Go</th>
                <th scope="col">Time to Arrive</th>
                <th scope="col">Airport to</th>
                <th scope="col">Airport from</th>
                <th scope="col">Price</th>
            </tr>
            </thead>

        )
    };


  return (

      <div className="table-responsive">
          <table className="table tr-history table-striped small" id="bg">
              <thead >
              <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Time to Go</th>
                  <th scope="col">Time to Arrive</th>
                  <th scope="col">Airport from</th>
                  <th scope="col">Airport to</th>
                  <th scope="col">Price</th>
              </tr>
              </thead>

              {list}

          </table>
          <Link to={"/card"} className="btn btn-success">Next</Link>
      </div>
  )





}; export default Flies;