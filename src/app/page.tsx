'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalUnits: 0,
    schoolsReached: 0,
    totalPartners: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats({
            totalDonations: data.stats.totalDonations,
            totalUnits: data.stats.totalUnits,
            schoolsReached: data.stats.schoolsReached,
            totalPartners: data.stats.totalPartners,
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stats:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="pb-3 p-3">
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Hero Section */}
        <section id="home" className="mb-3">
          <div className="card card-tertiary">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">🖥️</span>
                <span className="card-title">NIRD Hardware Recycling Initiative</span>
              </div>
              <div className="card-controls">
                <button className="card-control-btn">_</button>
                <button className="card-control-btn">□</button>
                <button className="card-control-btn">✕</button>
              </div>
            </div>
            <div className="card-body">
              <h5 className="text-center mb-2">♻️ Recyclez votre matériel informatique</h5>
              <p className="card-text text-center">
                Donnez une seconde vie à vos anciens ordinateurs !<br />
                Nous les nettoyons, installons <strong>NIRD Linux</strong>, et les distribuons aux écoles françaises.
              </p>
              <div className="d-flex justify-content-center flex-wrap mt-2">
                <a href="/donate" className="btn btn-primary border-dark m-2">
                  <span className="btn-text">📋 Faire un don</span>
                </a>
                <a href="/about" className="btn btn-primary m-2">
                  <span className="btn-text">🤝 En savoir plus</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-3">
          <div className="row g-2">
            <div className="col-12 col-md-4">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">📊</span>
                    <span className="card-title">Dons totaux</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-center">
                  <h2 className="display-3 mb-0">{loading ? '...' : stats.totalUnits}</h2>
                  <p className="text-muted mb-0">équipements</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">🏫</span>
                    <span className="card-title">Écoles partenaires</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-center">
                  <h2 className="display-3 mb-0">{loading ? '...' : stats.schoolsReached}</h2>
                  <p className="text-muted mb-0">établissements</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">💻</span>
                    <span className="card-title">PC déployés</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-center">
                  <h2 className="display-3 mb-0">{loading ? '...' : Math.floor(stats.totalUnits * 0.78)}</h2>
                  <p className="text-muted mb-0">avec NIRD OS</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-3">
          <div className="card">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">⚙️</span>
                <span className="card-title">Comment ça marche ?</span>
              </div>
              <div className="card-controls">
                <button className="card-control-btn">_</button>
                <button className="card-control-btn">□</button>
                <button className="card-control-btn">✕</button>
              </div>
            </div>
            <div className="card-body">
              <div className="row text-center g-2">
                <div className="col-12 col-md-3">
                  <div className="p-2">
                    <div style={{ fontSize: '2.5rem' }}>1️⃣</div>
                    <h6 className="font-weight-bold mb-2">Inscription</h6>
                    <p className="small mb-0">Remplissez le formulaire avec vos informations</p>
                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <div className="p-2">
                    <div style={{ fontSize: '2.5rem' }}>2️⃣</div>
                    <h6 className="font-weight-bold mb-2">Collecte</h6>
                    <p className="small mb-0">Nous récupérons votre matériel à domicile</p>
                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <div className="p-2">
                    <div style={{ fontSize: '2.5rem' }}>3️⃣</div>
                    <h6 className="font-weight-bold mb-2">Reconditionnement</h6>
                    <p className="small mb-0">Nettoyage et installation de NIRD Linux</p>
                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <div className="p-2">
                    <div style={{ fontSize: '2.5rem' }}>4️⃣</div>
                    <h6 className="font-weight-bold mb-2">Distribution</h6>
                    <p className="small mb-0">Don aux établissements scolaires</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-3">
          <div className="card card-tertiary">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">🔗</span>
                <span className="card-title">Liens rapides</span>
              </div>
              <div className="card-controls">
                <button className="card-control-btn">_</button>
                <button className="card-control-btn">□</button>
                <button className="card-control-btn">✕</button>
              </div>
            </div>
            <div className="card-body text-center">
              <p className="mb-2">Explorez notre plateforme pour en savoir plus</p>
              <div className="d-flex justify-content-center flex-wrap" style={{ gap: '10px' }}>
                <a href="/map" className="btn btn-primary border-dark">
                  <span className="btn-text">🗺️ Voir la carte</span>
                </a>
                <a href="/donate" className="btn btn-primary">
                  <span className="btn-text">📝 Faire un don</span>
                </a>
                <a href="/about" className="btn btn-primary">
                  <span className="btn-text">🐧 À propos NIRD</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
