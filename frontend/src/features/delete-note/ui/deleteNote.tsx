import { noteStore } from "../../../entities/note/model/note.store"

export const DeleteNote = ({id}: {id: string}) => {
    const handleDelete = async (id: string) => {
        await noteStore.deleteNote(id);
    }
    return (
        <div className="delete">
            <button className="delete_button" onClick={() => handleDelete(id)}>
                Delete
            </button>
        </div>
    )
}