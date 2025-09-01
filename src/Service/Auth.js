import axios from "axios"

const baseURL = "https://note-sigma-black.vercel.app/api/v1/"

export async function RegisterApi(formDate){
    return axios.post(baseURL +"users/signUp",formDate ).then((res) => res.data);
}
export async function LoginApi(formDate){
    return axios.post(baseURL + 'users/signIn' , formDate).then((res) => res.data);
}