import { useState } from "react";
import { noteStore } from "../../../entities/note/model/note.store";

export const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await noteStore.createNote({
        title: title,
        content: content,
        createdAt: "",
        updatedAt: ""
    });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Создать</button>
    </form>
  );
};
