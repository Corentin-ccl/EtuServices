import React from 'react';
import './Navbar.css';

export default function Navbar({ currentPage, setCurrentPage, isLoggedIn, onLogout }) {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('accueil'); }}>
                    <h1>Etu<span>Services</span></h1>
                </a>
            </div>
            <ul className="navbar-links">
                {isLoggedIn && (
                    <>
                        <li className={currentPage === 'accueil' ? 'active' : ''}>
                            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('accueil'); }}>Accueil</a>
                        </li>
                        <li className={currentPage === 'services' ? 'active' : ''}>
                            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('services'); }}>Services</a>
                        </li>
                    </>
                )}
                {!isLoggedIn ? (
                    <li className={currentPage === 'login' ? 'active' : ''}>
                        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('login'); }}>Connexion</a>
                    </li>
                ) : (
                    <li>
                        <button
                            className="secondary-btn"
                            style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}
                            onClick={onLogout}
                        >
                            Déconnexion
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}
