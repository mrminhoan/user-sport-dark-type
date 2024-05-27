import axios from "axios";

const httpClient = axios.create({
    baseURL: 'http://18.179.150.75:2082/user/sports',
    headers: {
        "Content-Type": "application/json",
    },
});

export default httpClient;
