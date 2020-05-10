import React, {useState} from "react";
import {useHistory} from "react-router";
import './rezervacija.css'


function getSum() {
  var karti = sessionStorage.getItem("karti")
    var vkupno =0;

    const lista = JSON.parse(sessionStorage.getItem("fly")).map((item,key)=> {
        vkupno += parseInt(karti)*parseInt(item.cena)

    } );
  return vkupno

}
const Rezervacija=  (props)=>{

    const history = useHistory();


    const  onSubmit = (e)=>{

        e.preventDefault();
        props.onSubmit(getSum());
        history.push("/");
    };
    const getFlights = JSON.parse(sessionStorage.getItem("fly")).map((item,key)=> {
        var karti = sessionStorage.getItem("karti")
        return(
            <div key={key}><span>Лат број {key}</span> <br/>
                {karti} * {item.cena}<span className="fa fa-euro"></span> = {parseInt(karti)*parseInt(item.cena)} <span className="fa fa-euro"></span>

            </div>
        )
    } );
    return(
        <div >
            <div className="display-2">Вашата Резервација</div>
            <div className="row">

                <form onSubmit={onSubmit}>

                        <div id="rezervacija" >
                            {getFlights}
                            <label>Вкупно за палќање {getSum()}</label>
                        </div>

                    <button className="btn btn-primary" type="submit">Подврдете Резервација</button>
                </form>
            </div>
        </div>

    );

};export default Rezervacija
