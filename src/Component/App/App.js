import React, {Component, useState} from 'react';
//import './App.css';
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import Header from "../Header/header";

import {Redirect} from "react-router";
import Service from "../../Repository/cityRepository";
import CityList from "../City/CityList";
import CityAdd from "../City/cityAdd";
import CountryService from "../../Repository/countryRepository";
import CountryList from "../Country/countryis";
import CountryAdd from "../Country/countryAdd";
import AirportService from "../../Repository/AirpostRepsoitory";
import Airports from "../Airport/airports";
import AirportAdd from "../Airport/AirportAdd";
import FlyService from "../../Repository/FlyReposiory";
import loginRepository from "../../Repository/loginRepository";
import FlyAdd from "../Flight/FlyAdd";
import '@progress/kendo-theme-default/dist/all.css';
import FlightEdit from "../Flight/FlightEdit";
import Help from "../Flight/FlightPagination";
import Card from "../Card/card";
import Rezervacija from "../Card/rezerve";
import RezervacijaRepository from "../../Repository/RezervazijaRepository";
import Login from "../Login/login";
import Letovi from "../Home/letovi";
import Autocomplete from "react-autocomplete";
import {DatePicker, DateRangePicker} from "@progress/kendo-react-dateinputs";
import PocetnaStrana from "../Home/PocetnaStrana";
import Register from "../Login/register";
import AppContext from "../../Context/AppContext";
import AppProvider from "../../Context/AppProvider";
import {Button, Modal} from "react-bootstrap";
import Passengers from "../ListPassenger/list";
import ListFlights from "../ListPassenger/ListFlights";
import Passenger from "../ListPassenger/Passenger";



class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            countries:[],
            airports:[],
            flights:[],
            page:0,
            pageSize:2,
            totalPages:0,
            val: '',
            grad2: '',
            value: { start: new Date(Date.now()), end: null },
            s: new Date(Date.now()),
            pravec: 1,
            brKarti:0,
            reservations:[],
            rezFlights:[]


        }

    }
    componentDidMount() {

        this.getItems();
        this.getCountry();
        this.getAirports();
        this.getFly();
    }


    creatReservation=(data)=> {

       // console.log(JSON.parse(sessionStorage.getItem("persons")));
        console.log(JSON.parse(sessionStorage.getItem("fly")).map(f=>(f.idLet)));
        const sendData = JSON.stringify({
                passengerRequestList:JSON.parse(sessionStorage.getItem("persons")).map(d =>({firstName:d.ime,lastName:d.prezime,passport:d.pasos})
                ),
                letovi: JSON.parse(sessionStorage.getItem("fly")).map(f=>(f.idLet)),
                //[ JSON.parse(sessionStorage.getItem("fly")).idLet],
                suma: data
            }
        );
        RezervacijaRepository.addReserve(sendData);
        sessionStorage.removeItem("fly");
        sessionStorage.removeItem("persons");
        sessionStorage.removeItem("karti");
        sessionStorage.removeItem("kartiDeca");
    };


    getAirports = () => {
        AirportService.fetchAirports().then(result=>{
            const airports = result.data
            this.setState({airports});
        });
    };
    createAirport = (newItem) => {
        AirportService.addAirport(newItem).then(response=>{
            const newItem= response.data;
            this.setState((prevState)=>{
                const newItemRef = [...prevState.airports,newItem]
                return {
                    "airports":newItemRef
                }
            })

        })
    }

    onDeleteAirport = (id) =>{
        AirportService.deleteIngredient(id).then(()=>{
            this.setState((prevState)=>{
                const airports = prevState.airports.filter(i=>i.idAerodrom !== id);
                return {
                    "airports":airports
                }
            })
        })
    };
    onRezFlight =(rez) => {
        this.setState((prevState)=>{
            const newItemRef = [...prevState.rezFlights,rez]
            return {
                "rezFlights": newItemRef
            }
        });
        console.log(this.state.rezFlights)
    };
    getCountry = () =>{
        CountryService.fetchCountry().then(result=>{
            const countries = result.data
            this.setState({countries});
        })
    }

    getItems = () =>{
        Service.fetchCity().then(result => {
            const cities = result.data
            this.setState({cities});
        })
    };
    createItem = (newItem) =>{
        Service.addCity(newItem).then((response) =>{
            const newItem = response.data;
            this.setState((prevState)=>{
                const newItemRef = [...prevState.cities,newItem]
                return {
                    "cities": newItemRef
                }
            });
        });
    };
    deleteCity = (id) =>{
        Service.deleteCity(id).then(()=>{
            this.setState((prevState)=>{
                const city = prevState.cities.filter(i=>i.idGrad !== id);
                return {
                    "cities":city
                }
            })
        })
    };
    createCountry = (newItem) =>{
      CountryService.addCountry(newItem).then((response) =>{
          const  newItem = response.data;
            this.setState((prevState)=>{
                const newItemRef = [...prevState.countries,newItem]
                return {
                    "countries":newItemRef
                }
            });
        });
    };
    deleteCountry = (id) =>{
        CountryService.deleteCountry(id).then(()=>{
            this.setState((prevState)=>{
                const contry = prevState.countries.filter(i=>i.idDrzava !== id);
                return {
                    "countries":contry
                }
            })
        })
    };
    getFly = () =>{
        FlyService.fetchFly().then((response)=>{
            const flights = response.data.content;
            this.setState({
                flights: flights,
                page: response.data.page,
                pageSize: response.data.pageSize,
                totalPage: response.data.totalPage
            });
        })
    };

    createFly = (item) =>{
        FlyService.addFly(item).then(r=>{
           const newFly = r.data;
           this.setState((prevState)=>{
               const newItemRef = [...prevState.flights,newFly]
               return {
                   "flights": newItemRef
               }
           });
        });
    };
    onDeleteFly = (id) =>{
        FlyService.deleteFly(id).then(()=>{
            this.setState((prevState)=>{
                const flies = prevState.flies.filter(i=>i.idLet !== id);
                return {
                    "flight":flies
                }
            })
        })
    };
    onSelectFlight = (id) =>{
        FlyService.fetchPassengerByFlight(id).then(response=>{
            const reservations = response.data
            console.log(reservations);
            this.setState({reservations})
        })
    }
    odEdit = (item) =>{
        FlyService.updateFly(item).then(data=>{
            const newItem = data.data;
            this.setState((prevState)=>{
                const items = prevState.flights.map(i=>i.idLet === newItem.idLet ? newItem : i );
                return {
                    "flight": items
                }
            });
        })
    }





    home(){
        return (
            <div>


            </div>
        )
    }
    render() {
        const routing = () => {
            const adminRoutes = () => {
                return (
                    <div className="container">
                        <Route path={"/city"} exact>
                            <CityList items={this.state.cities} onDelete={this.deleteCity}/>
                        </Route>
                        <Route path={"/city/new"} exact render={()=>
                            <CityAdd onAddItems={this.createItem} country={this.state.countries}/>}>
                        </Route>
                        <Route path={"/country"} exact>
                            <CountryList country={this.state.countries} onDelete={this.deleteCountry}/>
                        </Route>
                        <Route path={"/country/new"} exact render={()=>
                            <CountryAdd onAddCountry={this.createCountry}/>}>
                        </Route>
                        <Route path={"/airport"} exact render={() =>
                            <Airports airports={this.state.airports} onDelete={this.onDeleteAirport}/>}>
                        </Route>
                        <Route path={"/airport/new"} exact render={()=>
                            <AirportAdd onAddAirport={this.createAirport} cities={this.state.cities}/>}>
                        </Route>
                        <Route path={"/flight/:id/edit"} exact>
                            <FlightEdit onEdit={this.odEdit} airports={this.state.airports}/>
                        </Route>

                        <Route path={"/fly/new"} exact render={() =>
                            <FlyAdd onAddFly={this.createFly} airports={this.state.airports}/>}>
                        </Route>
                        <Route path={"/card/rezervacja"} exact render={()=>
                            <Rezervacija onSubmit={this.creatReservation} />}>
                        </Route>
                        <Route path={"/flight/:id/passenger"} exact>
                            <Passengers rezervaci={this.state.reservations} />
                        </Route>
                        <Route path={"/listFlight"} exact render={()=>
                            <ListFlights flights={this.state.flights} onSelectFlight={this.onSelectFlight}/>}>
                        </Route>
                    </div>
                );
            };


        const userRouter = () => {
            return (
                <div className="container">

                    <Route path={"/card/rezervacja"} exact render={()=>
                        <Rezervacija onSubmit={this.creatReservation} />}>
                    </Route>
                </div>
            );
        };
        const routes = () =>{
            return (
                <div className="container">
                    <Route path={"/"} exact>
                        <PocetnaStrana onClickReservation={this.onRezFlight} data={this.state.cities}/>
                    </Route>
                    <Route path={"/card"} exact>
                        <Card rez={this.state.rezFlights}/>
                    </Route>
                    <Route path={"/login"}>
                        <Login/>
                    </Route>
                    <Route path={"/letovi"}>
                        <Letovi flies={this.state.flights} onDelete={this.onDeleteFly}/>
                    </Route>
                    <Route path={"/flights"} exact>
                        <Help onClickReservation={this.onRezFlight} onDelete={this.onDeleteFly}/>
                    </Route>
                    <Route path={"/register"}>
                        <Register/>
                    </Route>
                </div>
            );
        }




/*

       const routing = (

           <Router>
               <Header/>
               <main role="main" className="mt-3">
                   <div className="container">
                       <Switch>
                           <Route path={"/"} exact>
                               <PocetnaStrana data={this.state.persons}/>
                           </Route>
                           <Route path={"/city"} exact>
                               <CityList items={this.state.persons} onDelete={this.deleteCity}/>
                           </Route>
                           <Route path={"/city/new"} exact>
                               <CityAdd onAddItems={this.createItem} country={this.state.items}/>
                           </Route>

                           <Route path={"/country"} exact>
                               <CountryList country={this.state.items}/>
                           </Route>
                           <Route path={"/country/new"} exact>
                               <CountryAdd onAddCountry={this.createCountry}/>
                           </Route>
                           <Route path={"/airport"} exact render={() =>
                               <Airports airports={this.state.airports} onDelete={this.onDeleteAirport}/>}>
                           </Route>
                           <Route path={"/airport/new"} exact>
                               <AirportAdd onAddAirport={this.createAirport} cities={this.state.persons}/>
                           </Route>
                           <Route path={"/fly"} exact>
                               <Flies flies={this.state.flight} onDelete1={this.onDeleteFly}/>
                           </Route>
                           <Route path={"/flight/:id/edit"} exact>
                               <FlightEdit onEdit={this.odEdit} airports={this.state.airports}/>
                           </Route>
                           <Route path={"/fly/new"} exact render={() =>
                               <FlyAdd onAddFly={this.createFly} airports={this.state.airports}/>}>
                           </Route>
                           <Route path={"/flights"} exact>
                               <Help onDelete={this.onDeleteFly}/>
                           </Route>
                           <Route path={"/card"} exact>
                               <Card/>
                           </Route>


                           <Route path={"/card/rezervacja"}>
                               <Rezervacija onSubmit={this.creatReservation}/>
                           </Route>
                           <Route path={"/login"}>
                               <Login/>
                           </Route>
                           <Route path={"/register"}>
                               <Register/>
                           </Route>

                           <Route path={"/letovi"}>
                               <Letovi flights={this.state.flights} onDelete={this.onDeleteFly}/>
                           </Route>


                           <Redirect to={"/"}/>
                       </Switch>
                   </div>
               </main>
           </Router>


       )
*/
       return (
           <AppContext.Consumer>
               {context =>(
                   <Router>
                       <Header/>
                       <div role="main" className="mt-3">
                           {routes()}
                           {(() => {

                               if(context.role === "ROLE_USER,ROLE_ADMIN" ) {
                                   return adminRoutes();
                               }
                               else if(context.role === 'ROLE_USER') {
                                   return userRouter();
                               }
                           })()}
                       </div>
                   </Router>
               )}
           </AppContext.Consumer>
       );
    }
    return (
        <div className={"App"}>

        <AppProvider>
            {routing()}
        </AppProvider>
        </div>
    );
   }



}
export default App;
