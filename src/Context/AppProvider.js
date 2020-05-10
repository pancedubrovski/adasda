import React, {Component} from "react";
import AppContext from "./AppContext";

class AppProvider extends Component{
    state = {
        role: localStorage.getItem("role")
    }
    render() {
        return (
            <AppContext.Provider value={{
                role: this.state.role
                }
            }>{this.props.children}
            </AppContext.Provider>
        );
    }
}export default AppProvider;