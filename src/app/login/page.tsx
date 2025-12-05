'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('adminToken', data.token);
        alert('✅ Connexion réussie !');
        router.push('/admin');
      } else {
        setError(data.message || 'Identifiants incorrects');
      }
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  return (
    <main className="pb-3 p-3">
      <div className="mx-auto" style={{ maxWidth: '600px' }}>
        <section className="mb-3" style={{ marginTop: '100px' }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">🔐</span>
                <span className="card-title">Connexion Administrateur</span>
              </div>
              <div className="card-controls">
                <button className="card-control-btn">_</button>
                <button className="card-control-btn">□</button>
                <button className="card-control-btn">✕</button>
              </div>
            </div>
            <div className="card-body">
              {error && (
                <div 
                  className="alert alert-danger mb-3" 
                  style={{ 
                    backgroundColor: '#ffcccc', 
                    border: '2px solid #ff0000',
                    padding: '0.75rem'
                  }}
                >
                  ⚠️ {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username" className="small">Nom d'utilisateur</label>
                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    placeholder="admin"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="small">Mot de passe</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                  />
                </div>

                <div className="d-flex justify-content-center mt-4">
                  <button className="btn btn-primary border-dark mr-3" type="submit">
                    <span className="btn-text">🔓 Se connecter</span>
                  </button>
                  <a href="/" className="btn btn-primary">
                    <span className="btn-text">⬅️ Retour</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
