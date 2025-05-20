import noteApi from "../../../entities/note/api/note.api";
import type { Note } from "../../../entities/note/model/type";

export async function createNote(data: Partial<Note>): Promise<Note> {
  try {
    const response = await noteApi.post("notes/create", {
        title: data.title
    });
    return response.data;
  } catch (e) {
    console.error("Failed to create note", e);
    throw e;
  }
}