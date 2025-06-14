import { noteStore } from "../../../entities/note/model/note.store"
import type { updateNoteInterface } from "../../../entities/note/model/type"

export const UpdateNote = ({ id, updateObj }: { id: string; updateObj: updateNoteInterface }) => {
    const handleUpdate = async () => {
        try {
            const res = noteStore.update(id, updateObj)
            alert("Updated")
            return res
        } catch (error) {
            console.log("error updateNote ", error)
            return false
        }
    }
    return (
        <button className="buttonAuth" onClick={handleUpdate}>
            Update
        </button>
    )
}