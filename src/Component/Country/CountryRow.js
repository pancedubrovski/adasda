import React from "react";


const CountryRow = (props)=>{

    return(
        <tr>
            <td>{props.country.ime}</td>
            <td>
                <button className="btn btn-danger"
                        onClick={()=>props.onDelete(props.country.idDrzava)}>
                    <span className="fa fa-remove"></span>
                    <span><strong>Избиши</strong></span>
                </button>
            </td>
        </tr>
    );
}; export default CountryRow;