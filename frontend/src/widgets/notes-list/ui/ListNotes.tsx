import { useEffect, useState } from "react";
import type { Note } from "../../../entities/note/model/type"
import { noteStore } from "../../../entities/note/model/note.store";
import { observer } from "mobx-react";


export const ListNotes = observer(() => {
    useEffect(() => {
        noteStore.fetchNotes()
    }, [])
    const notes = noteStore.notes
    const loading = noteStore.loading

    if (loading) return <div>Загрузка...</div>;
    return (
        <div className="app">
            {notes.map((item) => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                </div>
            ))}
        </div>
    )
})