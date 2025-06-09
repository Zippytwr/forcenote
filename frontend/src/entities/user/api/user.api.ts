import axios from "axios";


export default class userApi {
    static getUser() {
        const res = axios.get("http://localhost:3000/auth/profile", {
            withCredentials: true
        });
        return res
    }
} 