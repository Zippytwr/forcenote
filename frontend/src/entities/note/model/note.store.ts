import { makeAutoObservable, runInAction } from "mobx";
import type { Note, updateNoteInterface } from "./type";
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
    const res = await noteApi.post("notes/create/", {
      title: note.title,
      content: note.content,
    });
    console.log(res.data)
    runInAction(() => {
      
      this.notes.push(res.data); // автоматически отрисуется в списке
    });
  }
  async deleteNote(id: string) {
    try {
      await noteApi.delete("notes/", id)
      runInAction(() => {
        this.notes = this.notes.filter((note) => note.id !== id);
      })
    } catch (e) {
      console.error(e)
      throw e
    }
  }
  async findOne(id: string) {
    try {
      const note = this.notes.find((note) => note.id == id)
      return note
    } catch (e) {
      console.error(e)
      throw e
    }
  }
  async fetchById(id: string) {
    try {
      const note = await noteApi.getAll("notes/" + id)
      return note.data
    } catch (e) {
      console.error(e)
      throw e
    }
  }
  async update(id: string, notes: Omit<updateNoteInterface, "id">) {
    try {
      const note = await noteApi.patch("notes/" + id, notes);
      runInAction(() => {
        const index = this.notes.findIndex((n) => n.id === id);
        if (index !== -1) {
          this.notes[index] = note.data;
        } else {
          this.notes.push(note.data);
        }
      })
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}

export const noteStore = new NoteStore();
