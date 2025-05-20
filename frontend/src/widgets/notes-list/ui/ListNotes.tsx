import { useEffect, useState } from "react";
import type { Note } from "../../../entities/note/model/type"
import { listNote } from "../model/listNotes"


export const ListNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await listNote();
                setNotes(data);
            } catch (error) {
                console.error("Ошибка при загрузке заметок:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

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
}