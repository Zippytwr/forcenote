import { Link, useLocation } from "react-router-dom";

export const Header = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <>
            <style>{`
                .header-nav {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
                
                .nav-link {
                    position: relative;
                    transition: all 0.3s ease;
                    overflow: hidden;
                }
                
                .nav-link::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    transition: left 0.3s ease;
                    z-index: -1;
                    border-radius: 8px;
                }
                
                .nav-link:hover::before,
                .nav-link.active::before {
                    left: 0;
                }
                
                .nav-link:hover {
                    color: white !important;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                }
                
                .nav-link.active {
                    color: white !important;
                    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
                }
                
                .logo {
                    transition: transform 0.2s ease;
                }
                
                .logo:hover {
                    transform: scale(1.05);
                }
                
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .header-container {
                    animation: slideDown 0.4s ease-out;
                }
            `}</style>

            <header
                className="header-nav"
                style={{
                    background: 'linear-gradient(135deg, #1e1e1e, #2a2a2a)',
                    borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.05)'
                }}
            >
                <div
                    className="header-container"
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '1rem 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '2rem'
                    }}
                >
                    {/* Logo */}
                    <Link
                        to="/"
                        className="logo"
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <span style={{ fontSize: '1.8rem' }}>📚</span>
                        <span>ForceNote</span>
                    </Link>

                    {/* Navigation */}
                    <nav style={{
                        display: 'flex',
                        gap: '0.5rem'
                    }}>
                        <Link
                            to="/"
                            className={`nav-link ${isActive('/') ? 'active' : ''}`}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: isActive('/') ? 'white' : '#475569',
                                fontWeight: '500',
                                fontSize: '0.95rem',
                                position: 'relative',
                                zIndex: 1,
                                background: isActive('/') ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'
                            }}
                        >
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <span>🏠</span>
                                Home
                            </span>
                        </Link>

                        <Link
                            to="/profile"
                            className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: isActive('/profile') ? 'white' : '#475569',
                                fontWeight: '500',
                                fontSize: '0.95rem',
                                position: 'relative',
                                zIndex: 1,
                                background: isActive('/profile') ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'
                            }}
                        >
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <span>👤</span>
                                Profile
                            </span>
                        </Link>
                    </nav>

                    {/* Optional: User indicator */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: '#64748b',
                        fontSize: '0.9rem'
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#10b981',
                            boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)'
                        }}></div>
                        <span>Онлайн</span>
                    </div>
                </div>
            </header>
        </>
    );
};