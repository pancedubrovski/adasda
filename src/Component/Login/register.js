import React, {useState} from "react";
import {useHistory} from "react-router";
import loginRepository from "../../Repository/loginRepository";

const Register = () =>{

    const [error,setError] = useState();
    const [errorUsername,setErrorUsername] = useState();
    const history = useHistory();
    const onSubmit = (event)=> {
        event.preventDefault();
        if(event.target.password.value != event.target.passwordConfirm.value ){
            setError('Не се совпаќа пасвордот');
        }else {
            const newItems = {
                "username": event.target.username.value,
                "password": event.target.password.value
            };
            loginRepository.register(newItems).then(
                history.push("/login")
            ).catch((error)=>{
                if(error.response.status === 400){
                    setErrorUsername("Корисничкото име веке постои")
                }
            });

        }
    }
    return(
        <form onSubmit={onSubmit}>
       <div className="form-horizontal">
           <div className="form-group">
               <label className="control-label col-2">Корисничко име</label>
               <div className="col-md-10">
                   <input className="form-control col-4" placeholder="Корисничко име" name="username"/>
               </div>
           </div>
           <div className="form-group">
               <label className="control-label col-2">Лозинка</label>
               <div className="col-md-10">
                   <input className="form-control  col-4" placeholder="Лозинка" type="password" name="password"/>
               </div>
           </div>
           <div className="form-group">
               <label className="control-label col-2">Потврди лозинка</label>
               <div className="col-md-10">
                   <input className="form-control  col-4" type="password" name="passwordConfirm"/>
               </div>
           </div>
           <div className="form-group">
               <div className="col-md-offset-2 col-md-10">
                   <button type="submit"  className="btn btn-success">Креирај</button>
               </div>
           </div>
       </div>
       <small className="text-danger">
           {error}
           {errorUsername}
       </small>
</form>


    )
};
export default Register