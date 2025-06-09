import { useEffect, useState } from "react";
import { noteStore } from "../../../entities/note/model/note.store";
import axios from "axios";
import { userStore } from "../../../entities/user/model/user.store";
import { observer } from "mobx-react-lite";

export const CreateNote = observer(() => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

    try {
      await noteStore.createNote({
        title,
        content,
        createdAt: "",
        updatedAt: "",
        // user_id: userId — если backend требует, раскомментируй
      });

      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Ошибка при создании заметки", err);
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3000/auth/register", {
        username,
        password,
      }, { withCredentials: true });

      await userStore.fetchProfile();
    } catch (err) {
      console.error("Ошибка при регистрации", err);
    }
  };

  const handleLogin = async () => {
    try {
      await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      }, { withCredentials: true });

      await userStore.fetchProfile();
    } catch (err) {
      console.error("Ошибка при входе", err);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/auth/logout", {}, {
        withCredentials: true
      });
      noteStore.notes = []
      userStore.logout();
    } catch (err) {
      console.error("Ошибка при выходе", err);
    }
  };

  return (
    <>
      <h1>
        {userStore.user ? `Привет, ${userStore.user?.[0]?.username}` : "Не авторизован"}
      </h1>
      <div style={{ marginTop: "1rem" }}>
        {!userStore.user ?
          <>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Имя пользователя"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
            />
            <button onClick={handleLogin}>Войти</button>
            <button onClick={handleRegister}>Зарегистрироваться</button>
          </>
          :
          <button onClick={logout}>Выйти</button>

        }
      </div>

      {
        userStore.user &&
        <>
          <div className="editor">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Заголовок"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Содержимое"
            />
            <button type="submit" onClick={handleSubmit}>Создать заметку</button>
          </div>
        </>
      }


    </>
  );
});
