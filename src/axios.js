import axios from "axios";

const instance = axios.create({
    baseURL: "http://nonsodavilo.pythonanywhere.com"
});

export default instance;