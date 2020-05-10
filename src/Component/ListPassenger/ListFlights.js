import React from "react";
import {Link} from "react-router-dom";

const ListFlights = (props) =>{

    const list = props.flights.map((item,key)=>{
            return(


                <tr key={key}>
                    <td >{item.date}</td>
                    <td >{item.vremePoletuvanje}</td>
                    <td >{item.vremePristignuva}</td>
                    <td >{item.poaga.ime}</td>
                    <td >{item.pristignuva.ime}</td>
                    <td >{item.cena}</td>
                    <td >
                        <Link className="btn btn-sm btn-secondary mr-2" onClick={()=>props.onSelectFlight(item.idLet)}
                              to={`/flight/25/passenger`}>
                            <span className="fa fa-edit"/>
                            <span><strong>Прикажи Резерваци</strong></span>

                        </Link>
                    </td>
                </tr>



            );
    })


    return(
        <div >
        <table className="table tr-history table-striped " id="bg">

            <thead>
                <tr>
                    <th >Датум</th>
                    <th >Полетување</th>
                    <th >Слетување</th>
                    <th >Од</th>
                    <th >До</th>
                    <th >Цена</th>
                    <th></th>
                </tr>
            </thead>
        <tbody>
            {list}
        </tbody>
        </table>
        </div>

    );
    const Show=()=>{
        return(
            <Link className="btn btn-sm btn-secondary mr-2" onClick={()=>this.props.onSelectFlight(this.props.flies1.idLet)}
                  to={`/flight/25/passenger`}>
                <span className="fa fa-edit"/>
                <span><strong>Прикажи Резервации</strong></span>

            </Link>
        );
    }


};export default ListFlights;