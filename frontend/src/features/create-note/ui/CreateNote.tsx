import { useEffect, useState } from "react";
import { noteStore } from "../../../entities/note/model/note.store";
import { userStore } from "../../../entities/user/model/user.store";
import { observer } from "mobx-react-lite";

export const CreateNote = observer(() => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    userStore.fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = userStore.user?.[0]?.id;

    if (!userId) {
      console.error("Пользователь не авторизован");
      return;
    }

    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await noteStore.createNote({
        title: title.trim(),
        content: content.trim(),
        createdAt: "",
        updatedAt: "",
        // user_id: userId
      });
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Ошибка при создании заметки", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userStore.user) {
    return (
      <div className="create-note-auth-warning">
        <div className="emoji">🔐</div>
        <p>Необходимо войти в систему для создания заметок</p>
      </div>
    );
  }

  return (
    <>
      <div className="create-note-wrapper">
        <div className="create-note-header">
          <div className="create-note-dot" />
          <h2 className="create-note-title">Новая заметка</h2>
        </div>

        <form className="create-note-form" onSubmit={handleSubmit}>
          <div>
            <label className="create-note-label">📝 Заголовок</label>
            <input
              type="text"
              className="create-note-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок заметки..."
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="create-note-label">📄 Содержимое</label>
            <textarea
              className="create-note-input create-note-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Напишите содержимое заметки... Поддерживается Markdown!"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting || !title.trim() || !content.trim()}
          >
            {isSubmitting ? (
              <>
                <div className="spinner" /> Создание...
              </>
            ) : (
              <>
                <span>✨</span> Создать заметку
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
});
