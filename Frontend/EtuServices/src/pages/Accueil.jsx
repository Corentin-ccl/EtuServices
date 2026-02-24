import React from 'react';
import './Accueil.css';

export default function Accueil({ setCurrentPage }) {
    return (
        <div className="accueil-page">
            <section className="hero">
                <div className="container">
                    <h1>Simplifiez votre vie <span>étudiante</span></h1>
                    <p>
                        EtuServices est la plateforme d'entre-aide dédiée aux étudiants. Trouvez des services, partagez vos compétences et facilitez votre quotidien universitaire.
                    </p>
                    <div className="hero-btns">
                        <button onClick={() => setCurrentPage('services')}>Découvrir les services</button>
                        <button className="secondary-btn" onClick={() => setCurrentPage('login')}>Se connecter</button>
                    </div>
                </div>
            </section>

            <section className="features container">
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Pourquoi choisir EtuServices ?</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '4rem' }}>Une plateforme pensée par des étudiants, pour des étudiants.</p>

                <div className="features-grid">
                    <div className="feature-card">
                        <span className="feature-icon">📚</span>
                        <h3>Aide aux devoirs</h3>
                        <p>Trouvez des tuteurs passionnés pour vous aider dans vos matières les plus difficiles. Partagez vos connaissances et soyez récompensé.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🚗</span>
                        <h3>Covoiturage</h3>
                        <p>Partagez vos trajets vers le campus et économisez sur vos déplacements. Une solution écologique et économique pour tous.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🛒</span>
                        <h3>Petites annonces</h3>
                        <p>Achetez ou vendez vos anciens livres et matériel universitaire à prix mini au sein de votre propre établissement.</p>
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Ce qu'en disent les étudiants</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="testimonial-card">
                            <p>"Grâce à EtuServices, j'ai pu trouver un binôme pour mes projets de programmation et j'ai réussi mon semestre !"</p>
                            <div className="testimonial-author">
                                <div className="author-info">
                                    <h4>Léo Martin</h4>
                                    <span>L3 Informatique</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <p>"C'est tellement pratique pour vendre mes anciens manuels. J'ai libéré de l'étagère et gagné un peu d'argent."</p>
                            <div className="testimonial-author">
                                <div className="author-info">
                                    <h4>Sarah Bernard</h4>
                                    <span>M1 Droit</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
