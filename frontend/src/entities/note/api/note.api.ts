import axios from "axios";
import type { Note, updateNoteInterface } from "../model/type";


const url = import.meta.env.VITE_API_URL
export default class noteApi {

    static post(route: string, data: Partial<Note>) {
        const response = axios.post(url + route, data, {withCredentials: true})

        return response
    }
    static delete(route: string, id: string) {
        return axios.delete(url + route, {
            data: { id }
        });
    }
    static patch(route: string, updateNoteInterface: updateNoteInterface) {
        const response = axios.patch(url + route, updateNoteInterface)
        return response
    }
    static getAll(route: string) {
        const repsonse = axios.get(url + route, {
            withCredentials: true
        })

        return repsonse
    }
}