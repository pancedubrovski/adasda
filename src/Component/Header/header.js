import React from "react";
import Service from "./service";
import {Link} from "react-router-dom";
import AppContext from "../../Context/AppContext";
import {Button, Modal} from "react-bootstrap";

const Header= (props) =>{
    const Logout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    const Login = ()=>{
        if(localStorage.getItem("token")!=null){
            return (
               <button onClick={Logout} className="btn btn-danger">Logout</button>
            )
        }
        else{
            return(
                <Link to="/login">Login</Link>
            )
        }

    }
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a >
                                <Link className="nav-link" to={"/"}>Почетна</Link>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a >
                                <Link className="nav-link" to={"/card"}>Резервација</Link>
                            </a>
                        </li>


                            <AppContext.Consumer>
                                {context => (
                                    <>
                                        {(() => {
                                            if (context.role === "ROLE_USER,ROLE_ADMIN") {
                                                return (
                                                    <>
                                                    <li className="nav-item active">
                                                        <a>
                                                             <Service/>
                                                        </a>
                                                    </li>
                                                <li className="nav-item">
                                                    <a>
                                                        <Link className={"nav-link"} to={"/listFlight"}>Известај</Link>
                                                    </a>
                                                </li>
                                                    </>
                                                );
                                            }

                                        })()}
                                    </>

                                )}


                            </AppContext.Consumer>





                        <li className="nav-item ">

                            <a className="nav-link"> About</a>
                        </li>

                    </ul>

                    <form className="form-inline mt-2 mt-md-0 ml-3">

                            <AppContext.Consumer>
                                {context => (
                                    <a >
                                        {(() => {
                                            if(context.role === "ROLE_USER,ROLE_ADMIN" || context.role === "ROLE_USER" ) {
                                                return (
                                                    <button onClick={Logout}
                                                            className={"nav-item btn btn-outline-danger mt-2"}
                                                    >
                                                        Одјави се
                                                    </button>
                                                );
                                            } else {
                                                return (
                                                    <Link className="nav-item btn btn-outline-info mt-2" to={"/login"}>
                                                        Најава
                                                    </Link>
                                                );
                                            }
                                        })()}
                                    </a>
                                )}

                            </AppContext.Consumer>

                    </form>

                </div>
            </nav>
        </header>

    )
}
export default Header;