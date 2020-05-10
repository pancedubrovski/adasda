import axios from "axios"
//import LocalStogrageService from "../Repository/service";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
});

export default instance;