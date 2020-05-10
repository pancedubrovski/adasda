import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./card.css"
import moment from "moment";
import RezervacijaRepository from "../../Repository/RezervazijaRepository";
import {useHistory} from "react-router";
import AppContext from "../../Context/AppContext";
import Service from "../Header/service";

function getDuration(startTime, endTime){
    var start = moment(startTime, "HH:mm:ss");
    var end = moment(endTime, "HH:mm:ss");
    var hrs = moment.utc(end.diff(start)).format("HH");
    var min = moment.utc(end.diff(start)).format("mm");

    return (hrs+":"+min)

}


class Card extends Component{
    userData;
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            ime: "",
            prezime: "",
            pasos: "",
            flights:[]
        }

        this.handleChangeIme = this.handleChangeIme.bind(this);
        this.handleChangePrezime = this.handleChangePrezime.bind(this);
        this.handleChangePasos  = this.handleChangePasos.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitPassenger = this.handleSubmitPassenger.bind(this);
    }

    handleSubmitPassenger(e){
        e.preventDefault();
        const newItem = {
            ime: this.state.ime,
            prezime: this.state.prezime,
            pasos: this.state.pasos
        }
        this.setState(state=> ({
            items: state.items.concat(newItem),
            ime: "",
            prezime: "",
            pasos: ""
        }))
    }
    handleChangeIme(e) {
        this.setState({ime: e.target.value});
    }handleChangePrezime(e) {
        this.setState({prezime: e.target.value});
    }handleChangePasos(e) {
        this.setState({pasos: e.target.value});
    }

    componentDidMount() {
       sessionStorage.setItem("fly",JSON.stringify(this.props.rez))
    }

    handleSubmit(e) {

        sessionStorage.setItem("persons",JSON.stringify(this.state.items));


    }


    render() {

        const lista =
            this.props.rez.map((item, key) => {
                console.log(getDuration(item.vremePoletuvanje, item.vremePristignuva));
                return (

                    <div className=" table rounded-lg" key={key}>
                        <div id="flight" className="row rounded-lg  justify-content-around">
                            <div className="col-3">
                                <label>From</label><br/>
                                <label>{item.vremePoletuvanje}</label><br/>
                                <span>{item.poaga.grad.grad}</span>
                            </div>
                            <div className="col-4">
                                <i className=" fa fa-plane"/><br/>
                                <span>Duration {getDuration(item.vremePoletuvanje, item.vremePristignuva)}</span>
                            </div>
                            <div className="col-3">
                                <label>To</label><br/>
                                <label className="display-5">{item.vremePristignuva}</label><br/>
                                <span>{item.pristignuva.grad.grad}</span>
                            </div>
                            <div className="col-2">
                                <label>Price</label><br/>
                                <span>{item.cena}$</span>
                            </div>
                        </div>
                    </div>
                );
            })



    return(

    <div>
        <div className="container">


            {lista}

        </div>
        <div className=" row">
            <form className="from person rounded-lg col-4"  onSubmit={this.handleSubmitPassenger}>
                <div className="row">
                    <label className="col-6">Ime</label>
                    <input
                        className="form-control col"
                        id="ime"
                        name="ime"
                        onChange={this.handleChangeIme}
                        value={this.state.ime}
                    /><br/>
                </div>
                <div className="row">
                    <label className="col-6">Prezime</label>
                    <input
                        className="form-control col"
                        id="prezime"
                        name="prezime"
                        onChange={this.handleChangePrezime}
                        value={this.state.prezime}
                    />
                </div>
                <div className="row">
                    <label className="col-6">Pasos</label>
                    <input
                        className="form-control col"
                        id="pasos"
                        onChange={this.handleChangePasos}
                        value={this.state.pasos}
                    />
                </div>
                <button className="btn-primary">
                    Add Person #{this.state.items.length + 1}
                </button>
            </form>

                <div className="table-responsive col-6">
                    <table className="table tr-history table-striped " id="bg">

                        <thead>
                        <tr>
                            <th >Име</th>
                            <th >Презиме</th>
                            <th >Пасош</th>
                        </tr>
                        </thead>

                {this.state.items.map((item,id)=> (
                    <tbody>
                        <tr>
                            <th >{item.ime}</th>
                            <th >{item.prezime}</th>
                            <th >{item.pasos}</th>
                        </tr>
                    </tbody>


                ))
                }
                    </table>
            </div>
        </div>
        <AppContext.Consumer>
            {context => (
                <>
                    {(() => {
                        if (context.role === "ROLE_USER,ROLE_ADMIN") {
                            return (
                                <>
                                    <Link onClick={this.handleSubmit} to={"/card/rezervacja"} className="btn btn-info text-upper">Next</Link>
                                </>
                            );
                        }else {
                            return (
                                <>
                                    <Link className="btn btn-primary" onClick={this.handleSubmit} to={"/login"}>Најаветесе за да продолжите</Link>
                                </>
                            );
                        }

                    })()}
                </>

            )}


        </AppContext.Consumer>



    </div>

)
}

};



export default Card;