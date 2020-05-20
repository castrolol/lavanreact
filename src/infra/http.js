import axios from 'axios';
import { BASE_URL } from '../res/URLS';


export default axios.create({
    baseURL: BASE_URL
})