import { baseUrl } from "./baseurl";

export const login = (values) => baseUrl.post("user/login",values) 
export const signUp = (values) => baseUrl.post("user/register",values) 
export const ForgotPassword = (values) => baseUrl.post("user/forget-password",values) 
export const getCurentUser = () => baseUrl.get("user/current") 
export const tranner = (values) => baseUrl.post("tranner", values);
export const createSale = (values) => baseUrl.post("sale", values);
export const getuser = (values) => baseUrl.post("user", values);
export const profile = (values) => baseUrl.get("user/current", values);


