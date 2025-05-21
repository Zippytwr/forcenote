import { noteStore } from "../../../entities/note/model/note.store"
import type { updateNoteInterface } from "../../../entities/note/model/type"

export const UpdateNote = ({id, updateObj}: {id: string; updateObj: updateNoteInterface}) => {
    const handleUpdate = async () => {
        await noteStore.update(id, updateObj)
    }
    return(
        <button className="update" onClick={handleUpdate}>
            Update
        </button>
    )
}