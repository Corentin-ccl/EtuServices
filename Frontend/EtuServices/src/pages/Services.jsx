import React, { useState } from 'react';
import './Services.css';

const mockServices = [
    { id: 1, title: 'Cours de Maths Avancées', category: 'Education', price: '15€/h', provider: 'Julie D.', icon: '📐', desc: 'Aide pour l\'algèbre linéaire et l\'analyse réelle.' },
    { id: 2, title: 'Déménagement Studio', category: 'Aide locale', price: 'Gratuit', provider: 'Marc A.', icon: '📦', desc: 'Besoin de bras pour déplacer quelques cartons samedi.' },
    { id: 3, title: 'Calculatrice TI-83', category: 'Matériel', price: 'Caution', provider: 'Yassine K.', icon: '🧮', desc: 'Prêt pour la semaine d\'examens uniquement.' },
    { id: 4, title: 'Correction de Mémoire', category: 'Rédaction', price: '10€', provider: 'Emma S.', icon: '✍️', desc: 'Relecture orthographique et syntaxique.' },
    { id: 5, title: 'Installation Dev Environment', category: 'Informatique', price: 'Gratuit', provider: 'Thomas L.', icon: '💻', desc: 'Aide pour Docker, Node et VSCode.' },
    { id: 6, title: 'Covoiturage Rennes-Paris', category: 'Transport', price: '20€', provider: 'Sofiane B.', icon: '🚗', desc: 'Départ vendredi 18h, 3 places dispos.' },
    { id: 7, title: 'Guitare Folk Prêt', category: 'Loisirs', price: '5€/jour', provider: 'Lucas M.', icon: '🎸', desc: 'Guitare en bon état, cordes neuves.' },
    { id: 8, title: 'Aide Photoshop', category: 'Informatique', price: '12€', provider: 'Clara V.', icon: '🎨', desc: 'Retouches ou création de logos.' },
];

export default function Services() {
    const [filter, setFilter] = useState('Tous');
    const categories = ['Tous', ...new Set(mockServices.map(s => s.category))];

    const filteredServices = filter === 'Tous'
        ? mockServices
        : mockServices.filter(s => s.category === filter);

    return (
        <div className="services-page container">
            <header className="services-header">
                <h1>Nos Services</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>La communauté s'entraide. Trouvez ce dont vous avez besoin.</p>
            </header>

            <div className="filter-bar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="services-grid">
                {filteredServices.map(service => (
                    <div key={service.id} className="service-card">
                        <div className="service-image">{service.icon}</div>
                        <div className="service-content">
                            <span className="service-badge">{service.category}</span>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                            <div className="service-footer">
                                <span className="service-price">{service.price}</span>
                                <button className="reserve-btn">Réserver</button>
                            </div>
                            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                Par {service.provider}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
