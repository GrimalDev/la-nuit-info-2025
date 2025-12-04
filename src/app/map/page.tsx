'use client';

import { useState } from 'react';

interface RegionData {
  name: string;
  donations: number;
  schools: number;
}

const regionsData: RegionData[] = [
  { name: "Île-de-France", donations: 245, schools: 89 },
  { name: "Hauts-de-France", donations: 178, schools: 52 },
  { name: "Grand Est", donations: 156, schools: 48 },
  { name: "Normandie", donations: 98, schools: 31 },
  { name: "Bretagne", donations: 132, schools: 45 },
  { name: "Pays de la Loire", donations: 124, schools: 38 },
  { name: "Centre-Val de Loire", donations: 87, schools: 24 },
  { name: "Bourgogne-Franche-Comté", donations: 94, schools: 29 },
  { name: "Nouvelle-Aquitaine", donations: 189, schools: 61 },
  { name: "Occitanie", donations: 167, schools: 55 },
  { name: "Auvergne-Rhône-Alpes", donations: 213, schools: 74 },
  { name: "Provence-Alpes-Côte d'Azur", donations: 156, schools: 47 },
  { name: "Corse", donations: 23, schools: 8 },
];

const colorScale = ["#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32"];

export default function MapPage() {
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);

  const totalDonations = regionsData.reduce((sum, r) => sum + r.donations, 0);
  const totalSchools = regionsData.reduce((sum, r) => sum + r.schools, 0);

  const maxDonations = Math.max(...regionsData.map((r) => r.donations));
  const minDonations = Math.min(...regionsData.map((r) => r.donations));

  const getColorForDonations = (donations: number) => {
    const range = maxDonations - minDonations;
    const normalized = (donations - minDonations) / range;
    const index = Math.min(Math.floor(normalized * colorScale.length), colorScale.length - 1);
    return colorScale[index];
  };

  const getRegionStyle = (region: RegionData, isHovered: boolean, isSelected: boolean) => ({
    fill: getColorForDonations(region.donations),
    stroke: isSelected ? "#000080" : "#1a1a1a",
    strokeWidth: isSelected ? 3 : isHovered ? 2 : 1.5,
    cursor: "pointer",
    transition: "all 0.2s ease",
    filter: isHovered ? "brightness(1.1)" : "none",
  });

  return (
    <main className="pb-3 p-3">
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Hero Section */}
        <section className="mb-3">
          <div className="card card-tertiary">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">🗺️</span>
                <span className="card-title">Carte des dons par région</span>
              </div>
              <div className="card-controls">
                <button className="card-control-btn">_</button>
                <button className="card-control-btn">□</button>
                <button className="card-control-btn">✕</button>
              </div>
            </div>
            <div className="card-body">
              <h5 className="text-center mb-2">Visualisez l'impact de notre initiative</h5>
              <p className="card-text text-center">
                Découvrez la répartition des dons de matériel informatique et des écoles partenaires 
                dans chaque région de France.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-3">
          <div className="row g-2">
            <div className="col-12 col-md-6">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">📊</span>
                    <span className="card-title">{selectedRegion ? selectedRegion.name : "Statistiques nationales"}</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row text-center">
                    <div className="col-6">
                      <h3 className="display-4 mb-0">{selectedRegion ? selectedRegion.donations : totalDonations}</h3>
                      <p className="text-muted small mb-0">Dons</p>
                    </div>
                    <div className="col-6">
                      <h3 className="display-4 mb-0">{selectedRegion ? selectedRegion.schools : totalSchools}</h3>
                      <p className="text-muted small mb-0">Écoles</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card card-tertiary h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">ℹ️</span>
                    <span className="card-title">Instructions</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="mb-0 small">
                    <li>🖱️ Cliquez sur une région pour la sélectionner</li>
                    <li>👆 Survolez une région pour voir un aperçu</li>
                    <li>📊 Les couleurs indiquent la densité de dons</li>
                    <li>🔄 Cliquez à nouveau pour désélectionner</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="mb-3">
          <div className="card">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">📍</span>
                <span className="card-title">France - Cliquez sur une région</span>
              </div>
              <div className="card-controls">
                <button className="card-control-btn">_</button>
                <button className="card-control-btn">□</button>
                <button className="card-control-btn">✕</button>
              </div>
            </div>
            <div className="card-body">
              <div style={{ position: 'relative' }}>
                {/* Hover info box - top right with fixed width */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', minHeight: '80px' }}>
                  {hoveredRegion ? (
                    <div className="card border-dark">
                      <div className="card-header py-1">
                        <small className="font-weight-bold">{hoveredRegion.name}</small>
                      </div>
                      <div className="card-body py-2">
                        <p className="mb-1 small">💻 Dons: {hoveredRegion.donations}</p>
                        <p className="mb-0 small">🏫 Écoles: {hoveredRegion.schools}</p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ height: '80px' }}></div>
                  )}
                </div>
                
                <svg
                  viewBox="0 0 600 600"
                  className="w-100"
                  style={{ maxWidth: '500px', margin: '0 auto', display: 'block', filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.5))" }}
                >
                  {regionsData.map((region, index) => {
                    const paths = [
                      "M310 200 L340 195 L355 210 L350 235 L325 245 L300 235 L295 215 Z",
                      "M280 100 L340 90 L380 110 L390 150 L355 195 L310 200 L270 180 L260 140 Z",
                      "M380 110 L450 130 L480 180 L470 250 L420 280 L355 235 L355 195 L390 150 Z",
                      "M180 140 L260 140 L270 180 L240 210 L180 220 L140 190 L150 150 Z",
                      "M60 200 L140 190 L160 230 L140 270 L80 280 L40 250 L30 220 Z",
                      "M140 270 L160 230 L220 240 L230 280 L210 330 L140 340 L100 310 L80 280 Z",
                      "M220 240 L295 215 L325 245 L330 290 L290 330 L230 330 L210 330 L230 280 Z",
                      "M325 245 L355 235 L420 280 L430 340 L390 380 L330 360 L330 290 Z",
                      "M140 340 L210 330 L230 330 L260 380 L240 450 L200 500 L120 480 L100 400 L100 360 Z",
                      "M200 500 L240 450 L260 380 L330 400 L380 420 L400 480 L350 520 L280 530 L220 520 Z",
                      "M330 290 L330 360 L390 380 L450 370 L480 420 L440 460 L380 420 L330 400 L260 380 L290 330 Z",
                      "M380 420 L440 460 L500 450 L530 490 L480 530 L400 520 L350 520 L400 480 Z",
                      "M540 480 L555 490 L560 540 L550 580 L530 570 L525 520 L535 490 Z",
                    ];
                    const isHovered = hoveredRegion?.name === region.name;
                    const isSelected = selectedRegion?.name === region.name;
                    return (
                      <path
                        key={region.name}
                        d={paths[index]}
                        style={getRegionStyle(region, isHovered, isSelected)}
                        onClick={() => setSelectedRegion(isSelected ? null : region)}
                        onMouseEnter={() => setHoveredRegion(region)}
                        onMouseLeave={() => setHoveredRegion(null)}
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="mt-4">
                <div className="d-flex align-items-center justify-content-between px-3">
                  <span className="small">Faible ({minDonations})</span>
                  <div className="d-flex" style={{ gap: '2px', flex: 1, maxWidth: '200px', margin: '0 10px' }}>
                    {colorScale.map((color, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: color,
                          height: '16px',
                          flex: 1,
                          border: '1px solid #000'
                        }}
                      />
                    ))}
                  </div>
                  <span className="small">Élevé ({maxDonations})</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Region Details */}
        {selectedRegion && (
          <section className="mb-3">
            <div className="card card-tertiary">
              <div className="card-header">
                <div className="card-title-wrapper">
                  <span className="card-icon">📍</span>
                  <span className="card-title">{selectedRegion.name}</span>
                </div>
                <div className="card-controls">
                  <button className="card-control-btn">_</button>
                  <button className="card-control-btn">□</button>
                  <button className="card-control-btn">✕</button>
                </div>
              </div>
              <div className="card-body">
                <div className="row g-2">
                  <div className="col-12 col-md-6">
                    <div className="card h-100">
                      <div className="card-body text-center d-flex flex-column justify-content-center">
                        <h2 className="display-3 mb-0">{selectedRegion.donations}</h2>
                        <p className="text-muted mb-0">💻 Dons de matériel</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="card h-100">
                      <div className="card-body text-center d-flex flex-column justify-content-center">
                        <h2 className="display-3 mb-0">{selectedRegion.schools}</h2>
                        <p className="text-muted mb-0">🏫 Écoles partenaires</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="progress mb-2" style={{ height: '24px' }}>
                    <div 
                      className="progress-bar bg-success" 
                      role="progressbar" 
                      style={{ width: `${(selectedRegion.donations / totalDonations) * 100}%` }}
                    >
                      <span className="font-weight-bold">
                        {((selectedRegion.donations / totalDonations) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-center small text-muted mb-0">Part des dons nationaux</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Back Button */}
        <section className="mb-3 text-center">
          <a href="/" className="btn btn-primary border-dark">
            <span className="btn-text">⬅️ Retour à l'accueil</span>
          </a>
        </section>
      </div>
    </main>
  );
}
