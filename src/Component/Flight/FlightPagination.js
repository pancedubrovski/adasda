import React from "react";
import Pagination from "react-js-pagination";
import FlyService from "../../Repository/FlyReposiory";
import axios from 'axios';
import Flies from "./FlightList";
import {Link} from "react-router-dom";

class Help extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articlesDetails: [],
            flights: [],
            activePage:0,
            totalPages: null,
            itemsCountPerPage:null,
            totalItemsCount:null
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.fetchURL = this.fetchURL.bind(this);
    }

    fetchURL(page) {

        axios.get(`http://localhost:8080/flight?page=${page}&size=10`)
            .then( response => {

                    const totalPages = response.data.totalPages;
                    const itemsCountPerPage = response.data.size;
                    const totalItemsCount = response.data.totalElements;

                    this.setState({totalPages: totalPages})
                    this.setState({totalItemsCount: totalItemsCount})
                    this.setState({itemsCountPerPage: itemsCountPerPage})
                    this.setState({
                        flights:response.data.content
                    });
                }
            );
    }

    componentDidMount () {
        this.fetchURL(this.state.activePage)
    }

    handlePageChange(pageNumber) {
        var  temp  = pageNumber-1;
        this.setState({activePage: temp})
        this.fetchURL(temp)

    }
    onDeleteFly = (id) =>{
        FlyService.deleteFly(id).then(()=>{
            this.setState((prevState)=>{

                const flights = prevState.flights.filter(i=>i.idLet !== id);
                return {
                    "flights":flights
                }
            })
        })
    };

    populateRowsWithData = () => {
       // const list = this.state.flights.map((item,index)=>
      //      <li key={index}>{item.date},{item.vkSedista}</li>
      //  );
     //   const list = this.state.flights.map((fly,index)=>
     //       <FlyRow flies1={fly} key={index} onDelete={this.props.onDelete1} />);

        return(
            <div>
            <Flies flies={this.state.flights} onClickReservation={this.props.onClickReservation} onDelete={this.onDeleteFly} />

            </div>
        )

    }

    render(){
        console.log(this.state.activePage);
        return (
            <div >
                <Link className="btn btn-info" to={"/fly/new"}>Додади Нов Лет</Link>
                {this.populateRowsWithData()}

                <div className="d-flex justify-content-center">
                    <Pagination
                        hideNavigation
                        activePage={this.state.activePage}

                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={10}
                        itemClass='page-item'
                        linkClass='btn btn-light'
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}


export default Help;