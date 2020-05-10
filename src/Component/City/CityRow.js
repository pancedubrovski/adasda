import React from 'react';


const CityRow =(props)=>{
    return(
        <tr>
            <td>{props.cities.grad}</td>
            <td>
                <button className="btn btn-danger"
                        onClick={()=>props.onDelete(props.cities.idGrad)}>
                    <span className="fa fa-remove"></span>
                    <span><strong>Избиши</strong></span>
                </button>
            </td>
        </tr>
    );


}; export default CityRow;