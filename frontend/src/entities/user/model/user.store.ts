import { makeAutoObservable, runInAction } from "mobx";
import type { User } from "./type";
import axios from "axios";
import { noteStore } from "../../note/model/note.store";
import userApi from "../api/user.api";

class UserStore {
    user: { id: string; username: string } | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: { id: string; username: string }) {
        this.user = user;
    }

    logout() {
        this.user = null;
        // сервер по запросу тоже должен очистить cookie
    }

    get isAuthenticated() {
        return !!this.user;
    }
    get userId() {
        return this.user?.id ?? null;
    }
    async fetchProfile() {
        try {
            const res = await userApi.getUser();
            runInAction(() => {
                this.user = res.data;
            });
            // После того как получили профиль, подгружаем заметки
            await noteStore.fetchNotes();
        } catch (e) {
            runInAction(() => {
                this.user = null;
            });
            // Очистка заметок если юзер вышел
            noteStore.notes = [];
        }
    }

}



export const userStore = new UserStore();