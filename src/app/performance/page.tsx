'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalDonations: number;
  totalUnits: number;
  totalPartners: number;
  schoolsReached: number;
  byRegion: { region: string; count: number; total_quantity: number }[];
  byHardwareType: { hardware_type: string; count: number; total_quantity: number }[];
  byCondition: { status_name: string; count: number; total_quantity: number }[];
}

export default function Performance() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.stats);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="pb-3 p-3">
        <div className="mx-auto text-center" style={{ maxWidth: '1200px' }}>
          <div className="card">
            <div className="card-body">
              <p>Chargement des statistiques...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!stats) {
    return (
      <main className="pb-3 p-3">
        <div className="mx-auto text-center" style={{ maxWidth: '1200px' }}>
          <div className="card">
            <div className="card-body">
              <p>Erreur de chargement des statistiques</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const totalRegions = stats.byRegion.length;
  const maxRegionUnits = Math.max(...stats.byRegion.map(r => r.total_quantity));
  const topRegions = stats.byRegion
    .sort((a, b) => b.total_quantity - a.total_quantity)
    .slice(0, 5)
    .map(r => ({
      name: r.region,
      units: r.total_quantity,
      percentage: maxRegionUnits > 0 ? (r.total_quantity / maxRegionUnits * 100) : 0
    }));

  return (
    <main className="pb-3 p-3">
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <section className="mb-3">
          <div className="card card-tertiary">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">📊</span>
                <span className="card-title">Tableau de bord - Performance</span>
              </div>
              <div className="card-controls">
                <button className="card-control-btn">_</button>
                <button className="card-control-btn">□</button>
                <button className="card-control-btn">✕</button>
              </div>
            </div>
            <div className="card-body text-center">
              <h5 className="mb-2">📈 Résumé des performances</h5>
              <p className="mb-0">Vue d'ensemble des statistiques de l'initiative NIRD</p>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-3">
          <div className="row g-2">
            <div className="col-6 col-md-4 col-lg-2">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">🖥️</span>
                    <span className="card-title">Équipements</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-center p-2">
                  <div className="display-4 mb-0">{stats.totalUnits}</div>
                  <small className="text-muted">Unités</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">🏫</span>
                    <span className="card-title">Écoles</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-center p-2">
                  <div className="display-4 mb-0">{stats.schoolsReached}</div>
                  <small className="text-muted">Équipées</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">🗺️</span>
                    <span className="card-title">Régions</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-center p-2">
                  <div className="display-4 mb-0">{totalRegions}</div>
                  <small className="text-muted">Actives</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">📈</span>
                    <span className="card-title">Unités</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-center p-2">
                  <div className="display-4 mb-0">{stats.totalUnits}</div>
                  <small className="text-muted">Unités</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">🤝</span>
                    <span className="card-title">Partenaires</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-center p-2">
                  <div className="display-4 mb-0">{stats.totalPartners}</div>
                  <small className="text-muted">Actifs</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">⏱️</span>
                    <span className="card-title">Types</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-center p-2">
                  <div className="display-4 mb-0">{stats.byHardwareType.length}</div>
                  <small className="text-muted">Matériel</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hardware Type Stats */}
        <section className="mb-3">
          <div className="card">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">🖥️</span>
                <span className="card-title">Statistiques par type de matériel</span>
              </div>
              <div className="card-controls">
                <button className="card-control-btn">_</button>
                <button className="card-control-btn">□</button>
                <button className="card-control-btn">✕</button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped mb-0">
                  <thead>
                    <tr style={{ background: '#000080', color: 'white' }}>
                      <th className="p-2">Type de matériel</th>
                      <th className="p-2 text-center">Dons reçus</th>
                      <th className="p-2 text-center">Unités totales</th>
                      <th className="p-2">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.byHardwareType.map((stat, index) => (
                      <tr key={index}>
                        <td className="p-2 font-weight-bold">{stat.hardware_type}</td>
                        <td className="p-2 text-center">{stat.count}</td>
                        <td className="p-2 text-center">{stat.total_quantity}</td>
                        <td className="p-2">
                          <div style={{ 
                            height: '16px', 
                            background: '#fff',
                            border: '2px solid #000',
                            borderTop: '2px solid #808080',
                            borderLeft: '2px solid #808080',
                            position: 'relative'
                          }}>
                            <div 
                              style={{ 
                                position: 'absolute',
                                inset: 0,
                                background: '#00bf9a',
                                width: `${(stat.total_quantity / stats.totalUnits) * 100}%`
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Top Regions */}
        <section className="mb-3">
          <div className="card">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">🏆</span>
                <span className="card-title">Top régions</span>
              </div>
              <div className="card-controls">
                <button className="card-control-btn">_</button>
                <button className="card-control-btn">□</button>
                <button className="card-control-btn">✕</button>
              </div>
            </div>
            <div className="card-body">
              {topRegions.map((region, index) => (
                <div key={index} className="d-flex align-items-center mb-3">
                  <div className="display-4 font-weight-bold mr-3" style={{ minWidth: '40px' }}>
                    {index + 1}
                  </div>
                  <div className="flex-fill">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="font-weight-bold">{region.name}</span>
                      <span className="small">{region.units} équipements</span>
                    </div>
                    <div style={{ 
                      height: '20px', 
                      background: '#fff',
                      border: '2px solid #000',
                      borderTop: '2px solid #808080',
                      borderLeft: '2px solid #808080',
                      position: 'relative'
                    }}>
                      <div 
                        style={{ 
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)',
                          width: `${region.percentage}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Goals Section */}
        <section className="mb-3">
          <div className="card">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">🎯</span>
                <span className="card-title">Objectifs 2024</span>
              </div>
              <div className="card-controls">
                <button className="card-control-btn">_</button>
                <button className="card-control-btn">□</button>
                <button className="card-control-btn">✕</button>
              </div>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {[
                  { goal: "2500 équipements", current: stats.totalUnits, target: 2500, icon: "🖥️" },
                  { goal: "750 écoles", current: stats.schoolsReached, target: 750, icon: "🏫" },
                  { goal: "Toutes les régions", current: totalRegions, target: 18, icon: "🗺️" },
                ].map((item, index) => (
                  <div key={index} className="col-12 col-md-4">
                    <div className="text-center p-3">
                      <div style={{ fontSize: '3rem' }} className="mb-2">{item.icon}</div>
                      <div className="font-weight-bold mb-2">{item.goal}</div>
                      <div style={{ 
                        height: '24px', 
                        background: '#fff',
                        border: '2px solid #000',
                        borderTop: '2px solid #808080',
                        borderLeft: '2px solid #808080',
                        position: 'relative',
                        marginBottom: '8px'
                      }}>
                        <div 
                          style={{ 
                            position: 'absolute',
                            inset: 0,
                            background: '#00bf9a',
                            width: `${Math.min((item.current / item.target) * 100, 100)}%`
                          }}
                        />
                      </div>
                      <div className="small">
                        {item.current} / {item.target} ({Math.round((item.current / item.target) * 100)}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
