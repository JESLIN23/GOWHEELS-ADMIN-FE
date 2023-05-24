import axios from 'axios'
import { BACKEND_URL } from '../const'

export default axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: BACKEND_URL,
    headers: { 'Content-Type': 'applicaion/json'},
    withCredentials: true
})