import axios from "axios";

export const baseUrl = axios.create({
    baseURL: "https://apistudent3.codedonor.in/api/"
});

