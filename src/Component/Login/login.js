import React, {useState} from "react";
import {Link} from "react-router-dom"
import {useHistory} from "react-router";
import LoginRepository from "../../Repository/loginRepository";



const Login = () =>{
    const history = useHistory();
    const [errorMessage,setErrorMessage] = useState("");

    const onSubmit = (e) =>{
        e.preventDefault();
        LoginRepository.login(e.target.username.value,
            e.target.password.value).then((response) => {
                const token = response.data.token
            localStorage.setItem("token",token);
            localStorage.setItem("role",response.data.role);
            console.log(localStorage.getItem("role"));
            if(sessionStorage.getItem("fly")!=null){
                history.push("/card/rezervacja")
                window.location.reload(false);
            }else {
                history.push("/")
                window.location.reload(false);
            }
        }).catch((error) => {
            if(error.response.status === 403) {
                setErrorMessage('Корисничкото име или лозинката се невалидни.');
            }
        });

    };
    return(
        <div className="d-flex justify-content-center h-200">


            <form className="col-6" onSubmit={onSubmit}>
                <div className="row form-group">
                    <div className="col-md-5 font-weight-bold text-right">Корисничко име:</div>
                    <div className={"col-md-7"}>
                        <input name={"username"} type="text"
                               className="form-control"
                               title="Корисничко име"/>
                    </div>
                </div>
                <div className="row form-group mt-4">
                    <div className="col-md-5 font-weight-bold text-right">Лозинка:</div>
                    <div className={"col-md-7"}>
                        <input name={"password"} type={"password"}
                               className="form-control col-11"
                               title="Лозинка"/>
                    </div>
                </div>
                <div className='text-right'>
                    <small className='text-danger'>
                        {errorMessage}
                    </small>
                </div>

                <div className={"row "}>



                    <div className="col-md-6 text-right">
                        <button type="submit" className="btn btn-primary" title="Најави се">
                            Најави се
                        </button>
                    </div>
                    <Link  to="/register" className="btn btn-success">Регистрирај се</Link>

                </div>
            </form>

        </div>

    );


}; export default Login