import React,{Component} from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {constant} from "@progress/kendo-data-query/dist/npm/funcs";
import AppContext from "../../Context/AppContext";
import Header from "../Header/header";



class FlyRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonColor: true
        }
    }
    render() {


        if (this.props.flies1.vremePoletuvanje != null) {
            return (

                <tr>
                    <td>{this.props.flies1.date}</td>
                    <td>{this.props.flies1.vremePoletuvanje}</td>
                    <td>{this.props.flies1.vremePristignuva}</td>
                    <td>{this.props.flies1.poaga.ime},{this.props.flies1.poaga.grad.grad}</td>
                    <td>{this.props.flies1.pristignuva.ime},{this.props.flies1.pristignuva.grad.grad}</td>
                    <td>{this.props.flies1.cena}</td>

                    <td>{this.admin()}
                        {this.Reserve()}
                    </td>

                </tr>
            );
        }
        else {
            return (
                <tr>
                    <td>{this.props.flies1.date}</td>
                    <td>{this.props.flies1.vkSedista}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{this.admin()}
                        {this.Reserve()}
                    </td>
                </tr>

            );
        }






    }

    admin(){
        return (
        <AppContext.Consumer>
            {context =>(
                        (() => {
                            if(context.role === "ROLE_USER,ROLE_ADMIN" ) {
                                return this.deleteButton();
                            }

                        })()

            )}
        </AppContext.Consumer>
        );
    }


     deleteButton (){
         return (
           <div >
           <button className="btn btn-danger" onClick={()=>this.props.onDelete(this.props.flies1.idLet)}>
               <span className="fa fa-remove"></span>
               <span><strong>Избиши</strong></span>

           </button> <Link className="btn btn-sm btn-secondary mr-2"
                           to={`/flight/${this.props.flies1.idLet}/edit`}>
             <span className="fa fa-edit"/>
             <span><strong>Edit</strong></span>

         </Link>
           </div>
         );
    }
    onChane() {

    }

    Edit(){
       // localStorage.setItem("item",this.props.flies1);
        return (
            <Link className="btn btn-sm btn-secondary mr-2"
                  to={`/flight/${this.props.flies1.idLet}/edit`}>
                <span className="fa fa-edit"/>
                <span><strong>Edit</strong></span>

            </Link>
        )

    }
    handelChange(){
        this.setState({
            button:!this.state.button
        })
        console.log(this.state.button);
    }
    Reserve() {
     //   localStorage.setItem("item",this.props.flies1);
        let idItem=0;
        return (

            <div>

                <button className={ this.state.buttonColor ? "btn btn-primary": "btn btn-success"}  onClick={this.rez.bind(this)}>

                    <span><strong>{this.state.buttonColor ? "Резервирај" : "Резервирано е"}</strong></span>

                </button>
            </div>

         //   </button>
        );


    };
    rez(){

        this.setState({
            buttonColor :  !this.state.buttonColor
        });
        this.props.onClickReservation(this.props.flies1)

    }



}; export default FlyRow;
