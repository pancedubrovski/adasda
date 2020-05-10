import React,{Component} from "react";
import Service from "../../Repository/cityRepository";
import CityList from "./CityList";
import cityAdd from "./cityAdd";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

class City extends Component{
    constructor(props) {
        super(props);
        this.state = {
            persons: []
        }
    }
    componentDidMount() {
        this.getItems();
    }

    getItems = () =>{
        Service.fetchCity().then(result => {
            const persons = result.data
            console.log(persons);
            this.setState({persons});
        })
    };
    createItem = (newItem) =>{
        Service.addCity(newItem).then((response) =>{
            const newItem = response.data;
            this.setState((prevState)=>{
                const newItemRef = [...prevState.item,newItem]
                return {
                    "items": newItemRef
                }
            });
        });
    }



    render() {
    const router = (
        <Router>
            <Switch>
                <Route path={"/city/list"} exact>
                    <CityList items={this.state.persons}/>
                </Route>
                <Route path={"/city/new"} exact>
                    <cityAdd onAddItem={this.createItem}/>
                </Route>
            </Switch>
        </Router>
    );
        return(
            {router}
           // <cityAdd onAddItem={this.createItem}/>
          //  <CityList items={this.state.persons}/>
            //<ul>{this.state.persons.map(person=><li key={person.idGrad}>{person.grad.toString()}</li>)}</ul>
        )
    }



}
export default City;

