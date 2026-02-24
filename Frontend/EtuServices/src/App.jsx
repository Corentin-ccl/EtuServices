import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx'
import Accueil from './pages/Accueil.jsx'
import Services from './pages/Services.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('accueil');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Check for session in localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('etu_user');
    const sessionId = localStorage.getItem('etu_session');

    if (savedUser && sessionId) {
      setIsLoggedIn(true);
      setUsername(savedUser);
    }
  }, []);

  const handleLogin = (user, sessionId) => {
    localStorage.setItem('etu_user', user);
    localStorage.setItem('etu_session', sessionId);
    setIsLoggedIn(true);
    setUsername(user);
    setCurrentPage('accueil');
  };

  const handleLogout = () => {
    localStorage.removeItem('etu_user');
    localStorage.removeItem('etu_session');
    setIsLoggedIn(false);
    setUsername('');
    setCurrentPage('login');
  };

  const renderPage = () => {
    // Protected routes logic
    if (!isLoggedIn && (currentPage === 'accueil' || currentPage === 'services')) {
      return <Login onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'accueil': return <Accueil setCurrentPage={setCurrentPage} />;
      case 'services': return <Services />;
      case 'login': return isLoggedIn ? <Accueil setCurrentPage={setCurrentPage} /> : <Login onLogin={handleLogin} />;
      default: return <Accueil setCurrentPage={setCurrentPage} />;
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {renderPage()}
      </main>
      <footer style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid #334155',
        color: 'var(--text-muted)',
        marginTop: 'auto'
      }}>
        <div className="container">
          <p>&copy; 2024 EtuServices - Solution d'entre-aide étudiante</p>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.875rem' }}>
            <a href="#">À propos</a>
            <a href="#">Contact</a>
            <a href="#">Conditions d'utilisation</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
