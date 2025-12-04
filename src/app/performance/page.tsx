'use client';

export default function Performance() {
  const performanceData = {
    totalDonations: 1862,
    totalSchools: 601,
    totalRegions: 13,
    monthlyGrowth: 15.3,
    averageProcessingTime: 4.8,
    successRate: 96.2,
  };

  const monthlyStats = [
    { month: "Janvier", donations: 142, schools: 48 },
    { month: "Février", donations: 168, schools: 52 },
    { month: "Mars", donations: 195, schools: 61 },
    { month: "Avril", donations: 156, schools: 47 },
    { month: "Mai", donations: 223, schools: 74 },
    { month: "Juin", donations: 289, schools: 98 },
  ];

  const topRegions = [
    { name: "Île-de-France", donations: 423, percentage: 22.7 },
    { name: "Auvergne-Rhône-Alpes", donations: 267, percentage: 14.3 },
    { name: "Nouvelle-Aquitaine", donations: 198, percentage: 10.6 },
    { name: "Occitanie", donations: 176, percentage: 9.5 },
    { name: "Provence-Alpes-Côte d'Azur", donations: 154, percentage: 8.3 },
  ];

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
                    <span className="card-title">Dons</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-center p-2">
                  <div className="display-4 mb-0">{performanceData.totalDonations}</div>
                  <small className="text-muted">Total</small>
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
                  <div className="display-4 mb-0">{performanceData.totalSchools}</div>
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
                  <div className="display-4 mb-0">{performanceData.totalRegions}</div>
                  <small className="text-muted">Actives</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">📈</span>
                    <span className="card-title">Croissance</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-center p-2">
                  <div className="display-4 mb-0">{performanceData.monthlyGrowth}%</div>
                  <small className="text-muted">Mensuelle</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">⏱️</span>
                    <span className="card-title">Délai</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-center p-2">
                  <div className="display-4 mb-0">{performanceData.averageProcessingTime}</div>
                  <small className="text-muted">Jours moy.</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">✅</span>
                    <span className="card-title">Réussite</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-center p-2">
                  <div className="display-4 mb-0">{performanceData.successRate}%</div>
                  <small className="text-muted">Taux</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Monthly Stats */}
        <section className="mb-3">
          <div className="card">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">📅</span>
                <span className="card-title">Statistiques mensuelles</span>
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
                      <th className="p-2">Mois</th>
                      <th className="p-2 text-center">Dons reçus</th>
                      <th className="p-2 text-center">Écoles servies</th>
                      <th className="p-2">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyStats.map((stat, index) => (
                      <tr key={index}>
                        <td className="p-2 font-weight-bold">{stat.month}</td>
                        <td className="p-2 text-center">{stat.donations}</td>
                        <td className="p-2 text-center">{stat.schools}</td>
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
                                width: `${(stat.donations / 300) * 100}%`
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
                      <span className="small">{region.donations} dons ({region.percentage}%)</span>
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
                          width: `${region.percentage * 4}%`
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
                  { goal: "2500 dons", current: 1862, target: 2500, icon: "🖥️" },
                  { goal: "750 écoles", current: 601, target: 750, icon: "🏫" },
                  { goal: "Toutes les régions", current: 13, target: 18, icon: "🗺️" },
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
                            width: `${(item.current / item.target) * 100}%`
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
