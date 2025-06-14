import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import axios from "axios";
import { userStore } from "../../../entities/user/model/user.store";
import { noteStore } from "../../../entities/note/model/note.store";

const ProfilePage: React.FC = observer((): React.JSX.Element => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        userStore.fetchProfile();
    }, []);

    const handleRegister = async () => {
        setLoading(true);
        setError("");
        try {
            await axios.post("http://localhost:3000/auth/register", {
                username,
                password,
            }, { withCredentials: true });

            await userStore.fetchProfile();
        } catch (err: any) {
            setError("Ошибка при регистрации: " + err?.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            await axios.post("http://localhost:3000/auth/login", {
                username,
                password,
            }, { withCredentials: true });

            await userStore.fetchProfile();
        } catch (err: any) {
            setError("Ошибка при входе: " + err?.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError("");
        try {
            await axios.post("http://localhost:3000/auth/logout", {}, {
                withCredentials: true
            });
            noteStore.notes = [];
            userStore.logout();
        } catch (err: any) {
            setError("Ошибка при выходе: " + err?.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const user = userStore.user?.[0]; // ❗ поправь на `.user`, если это не массив

    return (
        <div className="profile-page">
            <div className="profile-card">
                <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                    {user ? `Привет, ${user.username}` : "Не авторизован"}
                </h1>

                {!user ? (
                    <>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Имя пользователя"
                            disabled={loading}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Пароль"
                            disabled={loading}
                        />
                        <button className="buttonAuth" onClick={handleLogin} disabled={loading}>Войти</button>
                        <button className="buttonAuth" onClick={handleRegister} disabled={loading}>Зарегистрироваться</button>
                    </>
                ) : (
                    <button className="buttonAuth" onClick={logout} disabled={loading}>Выйти</button>
                )}

                {error && <div className="error">{error}</div>}
            </div>
        </div>
    );

});

export default ProfilePage;
