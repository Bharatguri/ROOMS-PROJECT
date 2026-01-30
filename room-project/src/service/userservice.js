import { baseUrl } from "./baseurl";

export const login = (values) => baseUrl.post("user/login",values) 
export const signUp = (values) => baseUrl.post("user/register",values) 
export const ForgotPassword = (values) => baseUrl.post("user/forget-password",values) 
