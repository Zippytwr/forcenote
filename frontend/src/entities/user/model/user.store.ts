import { makeAutoObservable, runInAction } from "mobx";
import type { User } from "./type";


class UserStore{
    user: User[] = []
    loading = false
    constructor() {
        makeAutoObservable(this)
    }

    
}


export const userStore = new UserStore();