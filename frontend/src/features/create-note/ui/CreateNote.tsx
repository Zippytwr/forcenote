import React from "react";
import { createNote } from "../model/createNote"



export const CreateNote = () => {
    const [title, setTitle] = React.useState('')
    const handleClick = async () => {
        try {
            const result = await createNote({
                title: title
            });
            console.log("Создана заметка:", result);
        } catch (err) {
            alert("Ошибка при создании заметки");
        }
    };


    return (
        <div className="createNote">
            <input type="text" value={title}
                onChange={(e) => setTitle(e.target.value)} />
            <button onClick={handleClick}>
                Создать заметку
            </button>
        </div>
    );
}