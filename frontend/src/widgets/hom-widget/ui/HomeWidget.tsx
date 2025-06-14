import { useState } from "react";
import { CreateNote } from "../../../features/create-note/ui/createNote";
import { ListNotes } from "../../notes-list/ui/ListNotes";

export const HomeWidget = () => {
    const [createModal, setCreateModal] = useState(false);

    const handleModal = () => setCreateModal(!createModal);

    return (
        <>
            <br />
            {createModal && (
                <div className="modal-overlay" onClick={(e) => {
                    if (e.target === e.currentTarget) handleModal();
                }}>
                    <div className="modal-window">
                        <button className="modal-close" onClick={handleModal}>✕</button>
                        <CreateNote />
                    </div>
                </div>
            )}

            <div className="home-widget">
                <div className="create-button-wrapper">
                    <button className="create-button" onClick={handleModal}>
                        <span className="create-icon">➕</span>
                        Создать новую заметку
                    </button>
                </div>
                <ListNotes />
            </div>
        </>
    );
};
