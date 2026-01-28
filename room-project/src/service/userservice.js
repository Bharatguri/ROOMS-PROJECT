import { baseUrl } from "./baseurl";

export const signUp = (values) => baseUrl.post("user/register",values) 