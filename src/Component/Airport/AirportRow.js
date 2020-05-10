import React, {Component} from "react";


class AirportRow extends Component{

    render() {
        return(
            <tr>
                <td>{this.props.airport.ime}</td>
                <td>{this.props.airport.grad.grad}</td>
                <td>{this.delete()}</td>
            </tr>
        )
    }
    delete() {
        return (
            <button className="btn btn-danger"
                    onClick={()=>this.props.onDelete(this.props.airport.idAerodrom)}>
                <span className="fa fa-remove"></span>
                <span><strong>Избиши</strong></span>
            </button>
        )
    };





}; export default AirportRow;