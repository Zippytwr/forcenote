import { useEffect, useState } from "react";
import { noteStore } from "../../../entities/note/model/note.store";
import { UpdateNote } from "../../../features/update-note/ui/updateNote";
import { observer } from "mobx-react";
import type { Note } from "../../../entities/note/model/type";
import { useParams } from "react-router";

export const NoteEditor = observer(() => {
    const { id = "" } = useParams<{ id: string }>();
    const [note, setNote] = useState<Note | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (!id) return;

        async function fetch() {
            const res = await noteStore.fetchById(id);
            const foundNote = res?.[0]; // если fetchById возвращает массив
            if (foundNote) {
                setNote(foundNote);
                setTitle(foundNote.title);
                setContent(foundNote.content);
            }
        }

        fetch();
    }, [id]);

    if (!note) return <div>Загрузка заметки...</div>;

    return (
        <div className="note-editor-page">
            <div className="note-editor-card">
                <h2 className="note-editor-title">Редактировать заметку</h2>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Заголовок"
                    className="note-input"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Содержание"
                    className="note-textarea"
                    rows={10}
                />
                <UpdateNote id={id} updateObj={{ title, content }} />
            </div>
        </div>
    );
});
