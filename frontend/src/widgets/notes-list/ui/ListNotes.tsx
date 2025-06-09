import { useEffect, useState } from "react";
import type { Note } from "../../../entities/note/model/type"
import { noteStore } from "../../../entities/note/model/note.store";
import { observer } from "mobx-react";
import { DeleteNote } from "../../../features/delete-note/ui/deleteNote";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const ListNotes = observer(() => {
    useEffect(() => {
        noteStore.fetchNotes()
    }, [])
    const notes = noteStore.notes
    const loading = noteStore.loading

    if (loading) return <div>Загрузка...</div>;
    return (
        <div className="note-list" style={{ marginTop: "2rem" }}>
            <h2 style={{ marginBottom: "1rem" }}>Ваши заметки:</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {notes.map((note) => (
                    <li
                        key={note.id}
                        style={{
                            backgroundColor: "#2a2a2a",
                            padding: "1rem",
                            marginBottom: "0.5rem",
                            borderRadius: "6px",
                            color: "#e0e0e0",
                            border: "1px solid #3c3c3c",
                            cursor: "pointer"
                        }}
                    >
                        <strong>{note.title}</strong>
                        <p style={{ opacity: 0.7, marginTop: "0.3rem" }}>{note.content.slice(0, 80)}...</p>
                        <DeleteNote id={note.id} />
                    </li>
                ))}
            </ul>
        </div>
    )
})