export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface updateNoteInterface {
  title?: string;
  content?: string;
}

