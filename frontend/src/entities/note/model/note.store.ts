import { makeAutoObservable, runInAction } from "mobx";
import type { Note } from "./type";
import noteApi from "../api/note.api";

class NoteStore {
  notes: Note[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchNotes() {
    this.loading = true;
    try {
      const res = await noteApi.getAll("notes/");
      runInAction(() => {
        this.notes = res.data;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async createNote(note: Omit<Note, "id">) {
    const res = await noteApi.post("notes/create/", note);
    runInAction(() => {
      this.notes.push(res.data); // автоматически отрисуется в списке
    });
  }
  async deleteNote(id: string) {
    const res = await noteApi.delete("notes/", id)
  }
}

export const noteStore = new NoteStore();
