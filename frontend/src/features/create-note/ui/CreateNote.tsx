import { useEffect, useState } from "react";
import { noteStore } from "../../../entities/note/model/note.store";
import axios from "axios";

export const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [profile, setProfile] = useState<any>(null);
  const [userId, setUserId] = useState("")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = profile.id;

    console.log(userId)
    await noteStore.createNote({
      title: title,
      content: content,
      createdAt: "",
      updatedAt: "",
      // user_id: userId
    });
    setTitle("");
    setContent("");
  };
  const handleRegister = async () => {
    const user = await axios.post("http://localhost:3000/auth/register", {
      username: username,
      password: password
    }, { withCredentials: true })
    return {
      user
    }
  }
  const handleLogin = async () => {
    const token = await axios.post("http://localhost:3000/auth/login", {
      username: username,
      password: password
    }, { withCredentials: true })
    console.log(token)
    return {
      token
    }
  }
  const handleGetProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/profile", {
        withCredentials: true
      });
      console.log("Профиль:", res.data);
      setProfile(res.data);
    } catch (err) {
      console.error("Ошибка при получении профиля", err);
    }
  };
  const logout = async () => {
    await axios.post("http://localhost:3000/auth/logout", {}, {
      withCredentials: true
    });
    setProfile(null)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">Создать</button>
      </form>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>
        Login
      </button>
      <button onClick={handleRegister}>
        register
      </button>
      <button onClick={handleGetProfile}>
        Load Profile
      </button>
      <button onClick={logout}>
        Logout
      </button>
      {profile && (
        <pre style={{ whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(profile, null, 2)}

        </pre>
      )}
    </>
  );
};
