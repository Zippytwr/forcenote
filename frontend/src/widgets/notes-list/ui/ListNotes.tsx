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
        <div className="app">
            {notes.map((item) => (
                
                <div key={item.id}>
                    
                    <h3>
                        {item.title}
                    </h3>
                    <Markdown remarkPlugins={[remarkGfm]}>
                        {item.content}
                    </Markdown>
                    <DeleteNote id={item.id} />
                </div>
            ))}
        </div>
    )
})