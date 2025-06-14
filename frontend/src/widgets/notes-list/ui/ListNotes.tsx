import { useEffect, useState } from "react";
import type { Note } from "../../../entities/note/model/type"
import { noteStore } from "../../../entities/note/model/note.store";
import { observer } from "mobx-react";
import { DeleteNote } from "../../../features/delete-note/ui/deleteNote";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";

export const ListNotes = observer(() => {
    useEffect(() => {
        noteStore.fetchNotes();
    }, []);

    const notes = noteStore.notes;
    const loading = noteStore.loading;

    if (loading) return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
            fontSize: '1.1rem',
            color: '#94a3b8'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
            }}>
                <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #f3f4f6',
                    borderTop: '2px solid #3b82f6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                Загрузка заметок...
            </div>
        </div>
    );

    if (notes.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                color: '#64748b'
            }}>
                <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem'
                }}>📝</div>
                <h3 style={{
                    fontSize: '1.25rem',
                    marginBottom: '0.5rem',
                    color: '#475569'
                }}>
                    Пока нет заметок
                </h3>
                <p style={{ fontSize: '0.9rem' }}>
                    Создайте первую заметку, чтобы начать работу
                </p>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '1rem'
        }}>

            <div style={{
                marginBottom: '2rem',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Ваши заметки
                </h2>
                <div style={{
                    fontSize: '0.9rem',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                }}>
                    <span>📚</span>
                    <span>{notes.length} {notes.length === 1 ? 'заметка' : notes.length < 5 ? 'заметки' : 'заметок'}</span>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
            }}>
                {notes.map((note, index) => (
                    <div
                        key={note.id}
                        className="note-card"
                        style={{
                            background: 'linear-gradient(135deg, #1e1e1e, #2a2a2a)',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            position: 'relative',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            cursor: 'pointer',
                            animationDelay: `${index * 0.1}s`
                        }}
                    >
                        <Link
                            to={`note/${note.id}`}
                            className="note-link"
                            style={{
                                color: 'inherit',
                                textDecoration: 'none',
                                display: 'block'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.75rem',
                                marginBottom: '1rem'
                            }}>
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    marginTop: '0.5rem',
                                    flexShrink: 0
                                }}></div>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    color: '#667eea',
                                    margin: 0,
                                    lineHeight: '1.4',
                                    wordBreak: 'break-word'
                                }}>
                                    {note.title || 'Без названия'}
                                </h3>
                            </div>

                            <div
                                className="note-content"
                                style={{
                                    fontSize: '0.9rem',
                                    color: 'white',
                                    lineHeight: '1.6',
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    minHeight: '4.5rem'
                                }}
                            >
                                <Markdown remarkPlugins={[remarkGfm]}>
                                    {note.content.slice(0, 120) + (note.content.length > 120 ? '...' : '')}
                                </Markdown>
                            </div>
                        </Link>

                        <div
                            className="delete-button-container"
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                zIndex: 10
                            }}
                        >
                            <DeleteNote id={note.id} />
                        </div>

                        <div style={{
                            position: 'absolute',
                            bottom: '1rem',
                            right: '1rem',
                            fontSize: '0.75rem',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}>
                            <span>✏️</span>
                            <span>Заметка</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});