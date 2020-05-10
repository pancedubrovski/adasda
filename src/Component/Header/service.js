import React,{ useState } from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import { Dropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'reactstrap'
import City from "../City/city";
import {Link} from "react-router-dom";

const Service = (props) =>{
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
    const routingService = {


    };

    return (



        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                Сервис
            </DropdownToggle>
            <DropdownMenu>


                <DropdownItem ><Link to={'/city'}>Измени Градови</Link></DropdownItem>
                <DropdownItem><Link to={'/country'} >Измени Држави</Link></DropdownItem>
                <DropdownItem><Link to={'/airport'} >Измени Аеродром</Link></DropdownItem>
                <DropdownItem><Link to={'/flights'} >Измени Лет</Link></DropdownItem>




            </DropdownMenu>
        </Dropdown>
    );

}
export default Service;