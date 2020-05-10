import React from "react";
import axios from '../Axios/axios'

const LoginRepository = {
    login: (username,password)=> {
        const user = JSON.stringify({
            username: username,
            password: password
        });

        return axios.post("/auth/signin", user,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    register: (data)=>{
        return axios.post("/auth/register",data,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }



}; export default LoginRepository;