import { useEffect, useState } from "react"
import { noteStore } from "../../../entities/note/model/note.store"
import { UpdateNote } from "../../../features/update-note/ui/updateNote"
import { observer } from "mobx-react"
import type { Note } from "../../../entities/note/model/type"


export const NoteEditor = observer(({ id }: { id: string }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [note, setNote] = useState<Note[]>([])
    useEffect(() => {
        async function fetch() {
            const res = await noteStore.fetchById(id)
            setNote(res)
        }
        fetch()
    }, [])
    

    return (
        <div className="noteEditor">
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <UpdateNote id={id} updateObj={{ title: title, content: content }} />
        </div>
    )
})