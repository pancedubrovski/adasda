import React from "react";
import "./Pocetna.css";
import Autocomplete from "react-autocomplete";
import {Link, Route} from "react-router-dom"
import {DatePicker, DateRangePicker} from "@progress/kendo-react-dateinputs";
import FlyService from "../../Repository/FlyReposiory";
import Rezervacija from "../Card/rezerve";
import Letovi from "./letovi";
import Flies from "../Flight/FlightList";
//import "./jquery-ui.css";
import { MultiSelect } from '@progress/kendo-react-dropdowns';


export function renderCity(state, val) {
    return (
        state.grad.toLowerCase().indexOf(val.toLowerCase()) !== -1
    );
}

class PocetnaStrana extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    state = {
        val: '',
        grad2: '',
        flight: [],
        value: { start: new Date(Date.now()), end: null },
        s: new Date(Date.now()),
        pravec: 1,
        brKarti:1,
        brKartinDeca:0,
        items: [],


    };


    incrementButton=(e)=>{

        this.setState(
            {brKarti: this.state.brKarti + 1}
        );
    }
    decrementButton=()=> {
        if (this.state.brKarti > 1) {
            this.setState(
                {brKarti: this.state.brKarti - 1}
            );
        }
    }
    incrementButtonChild=(e)=>{

        this.setState(
            {brKartinDeca: this.state.brKartinDeca + 1}
        );
    }
    decrementButtonChild=()=> {
        if (this.state.brKartinDeca > 0) {
            this.setState(
                {brKartinDeca: this.state.brKartinDeca - 1}
            );
        }
    }

    handleRadioButton=(e)=>{
        this.setState({pravec: e.target.value})
        this.getDate();
    }
    handleChange = (event) => {
        this.setState({ value: event.target.value })
    }
    hendleChangeE = (event) =>{
        this.setState({s:event.target.value})
    }

    getDate(){
        if(this.state.pravec != 1){
            return(
                <DateRangePicker
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            );
        }
        else {
            return (
                <div>
                    <label>Datum</label><br/>
                    <DatePicker defaultValue={new Date()} defaultShow onChange={this.hendleChangeE} />
                </div>
            );
        }
    }
    handleShowFlights = ()=> {
            debugger;


            if (this.state.value.end != null) {
                FlyService.fetchFlightsByCity(this.state.val, this.state.grad2, this.state.value.start.toISOString().slice(0, 10), this.state.value.end.toISOString().slice(0, 10))
                    .then(result => this.setState({
                                flight: result.data
                            })

                        );
            }else {
                FlyService.fetchFlight1(this.state.val, this.state.grad2, this.state.s.toISOString().slice(0, 10)).then((response)=>{
                    const flights = response.data;
                    this.setState({
                        flight: flights

                    });
                })
            }
        sessionStorage.setItem("karti",this.state.brKarti);
        sessionStorage.setItem("kartiDeca",this.state.brKartinDeca);

    }


    getFlightsByCity(){
        if(this.state.flight.length !=0){
            window.scrollTo(0, 2000)
            return(
                <Flies onClickReservation={this.props.onClickReservation} flies={this.state.flight} onDelete={this.onDeleteFly} />
            );


        }
        else {
            return(
                <h1>Изберете Градови</h1>
            );
        }

    }


    render() {
        return(
            <div>
                <h1>Flight Ticket Booking</h1>
                <div className="main-agileinfo">
                    <div className="sap_tabs">
                        <div id="horizontalTab">
                            <div className=" row resp-tabs-list">
                                <li className="col" ><span><button onClick={this.handleRadioButton} value="2" className="resp-tab-item">Round Trip</button></span></li>
                                <li className="col"><span><button onClick={this.handleRadioButton} value="1" className="resp-tab-item">One way</button></span></li>

                            </div>

                            <div className="resp-tabs-container">
                                <div className="tab-1 resp-tab-content roundtrip">
                                    <form action="#" >
                                        <div className="from">
                                            <h3>From</h3>
                                            <div  className="autocomplete-wrapper col   ">
                                                <Autocomplete className=" grad1 city2"
                                                              value={this.state.val}
                                                              items={this.props.data}
                                                              getItemValue={item => item.grad}
                                                              shouldItemRender={renderCity}
                                                              renderMenu={item => (
                                                                  <div className="dropdown">
                                                                      {item}
                                                                  </div>
                                                              )}
                                                              renderItem={(item, isHighlighted) =>
                                                                  <a className="dropdown-item">
                                                                      {item.grad}
                                                                  </a>
                                                              }

                                                              onChange={(event, val) => this.setState({ val })}
                                                              onSelect={val => this.setState({ val })}
                                                />
                                            </div>
                                        </div>
                                        <div className="to">
                                            <h3>To</h3>
                                            <div  className="autocomplete-wrapper col   ">
                                            <Autocomplete
                                                value={this.state.grad2}
                                                items={this.props.data}

                                                getItemValue={item => item.grad}
                                                shouldItemRender={renderCity}
                                                renderMenu={item => (
                                                    <div className="dropdown">
                                                        {item}
                                                    </div>
                                                )}
                                                renderItem={(item, isHighlighted) =>
                                                    <a className="dropdown-item">
                                                        {item.grad}
                                                    </a>
                                                }
                                                onChange={(event, grad2) => this.setState({ grad2 })}
                                                onSelect={grad2 => this.setState({ grad2 })}
                                            />
                                            </div>
                                        </div>
                                        <div className="clear"></div>

                                        {this.getDate()}
                                        <div className="class">
                                            <h3>Class</h3>
                                            <select id="w3_country1" onChange="change_country(this.value)"
                                                    className="frm-field required">
                                                <option value="null">Economy</option>
                                                <option value="null">Premium Economy</option>
                                                <option value="null">Business</option>
                                                <option value="null">First class</option>
                                            </select>

                                        </div>
                                        <div className="clear"></div>
                                        <div className="numofppl">
                                            <div className="adults">
                                                <h3>Adult:(12+ yrs)</h3>
                                                <div className="quantity">
                                                    <div className="quantity-select">
                                                        <button onClick={this.decrementButton} className="entry value-minus">&nbsp;</button>
                                                        <div className="entry value"><span>{this.state.brKarti}</span></div>
                                                        <button onClick={this.incrementButton} className="entry value-plus active">&nbsp;</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="child">
                                                <h3>Child:(2-11 yrs)</h3>
                                                <div className="quantity">
                                                    <div className="quantity-select">
                                                        <button onClick={this.decrementButtonChild} className="entry value-minus">&nbsp;</button>
                                                        <div className="entry value"><span>{this.state.brKartinDeca}</span></div>
                                                        <button onClick={this.incrementButtonChild} className="entry value-plus active">&nbsp;</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                        <div className="clear"></div>

                                        <button className="btn btn-warning " id="button" onClick={this.handleShowFlights}>Search</button>

                                    </form>


                                </div>



                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {this.getFlightsByCity()}
                </div>

                <div  ref={this.myRef} className="footer-w3l">
                    <p className="agileinfo"> &copy; 2020 Flight Ticket Booking </p>
                </div>



            </div>



        )
    };
}; export default PocetnaStrana;