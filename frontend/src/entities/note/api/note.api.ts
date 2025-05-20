import axios from "axios";
import type { Note } from "../model/type";


const url = import.meta.env.VITE_API_URL
export default class noteApi {
    
    static post(route: string, data: Partial<Note>) {
        const response = axios.post(url + route, data)

        return response
    }
    static delete() {

    }
    static patch() {
        
    }
    static getAll(route: string) {
        const repsonse = axios.get(url + route)

        return repsonse
    }
}