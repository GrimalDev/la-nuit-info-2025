'use client';

import { useState } from 'react';

const regionsData = [
  "Île-de-France",
  "Hauts-de-France",
  "Grand Est",
  "Normandie",
  "Bretagne",
  "Pays de la Loire",
  "Centre-Val de Loire",
  "Bourgogne-Franche-Comté",
  "Nouvelle-Aquitaine",
  "Occitanie",
  "Auvergne-Rhône-Alpes",
  "Provence-Alpes-Côte d'Azur",
  "Corse",
];

export default function DonatePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    region: '',
    hardwareType: '',
    quantity: '1',
    condition: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Formulaire envoyé ! Merci pour votre don. Nous vous contacterons bientôt.");
    setFormData({
      name: '',
      email: '',
      region: '',
      hardwareType: '',
      quantity: '1',
      condition: '',
    });
  };

  return (
    <main>
      <section className="section section-lg bg-secondary overflow-hidden z-2">
        <div className="container z-2">
          <div className="row justify-content-center pt-6 pt-md-5 pb-0 mb-2">
            <div className="col-12 col-xl-9">
              <div className="card card-tertiary">
                <div className="card-header text-center">
                  <span>📝 Faire un don de matériel</span>
                </div>
                <div className="card-body text-center">
                  <h5 className="mb-4">Donnez une seconde vie à votre matériel informatique</h5>
                  <p className="card-text">
                    Remplissez ce formulaire pour nous indiquer le matériel que vous souhaitez donner.
                    Nous vous contacterons rapidement pour organiser la collecte.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="card">
                <div className="card-header">
                  <span>📋 Formulaire de don</span>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label htmlFor="name" className="small">Nom complet</label>
                          <input
                            id="name"
                            type="text"
                            className="form-control"
                            placeholder="Jean Dupont"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label htmlFor="email" className="small">Email</label>
                          <input
                            id="email"
                            type="email"
                            className="form-control"
                            placeholder="jean@exemple.fr"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="region" className="small">Région</label>
                      <select
                        id="region"
                        className="form-control"
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        required
                      >
                        <option value="">-- Sélectionner --</option>
                        {regionsData.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label htmlFor="hardwareType" className="small">Type de matériel</label>
                          <select
                            id="hardwareType"
                            className="form-control"
                            value={formData.hardwareType}
                            onChange={(e) => setFormData({ ...formData, hardwareType: e.target.value })}
                            required
                          >
                            <option value="">-- Sélectionner --</option>
                            <option value="desktop">Ordinateur de bureau</option>
                            <option value="laptop">Ordinateur portable</option>
                            <option value="monitor">Écran</option>
                            <option value="keyboard">Clavier</option>
                            <option value="mouse">Souris</option>
                            <option value="other">Autre</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label htmlFor="quantity" className="small">Quantité</label>
                          <input
                            id="quantity"
                            type="number"
                            min="1"
                            className="form-control"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="small d-block mb-2">État du matériel</label>
                      <div className="d-flex flex-wrap" style={{ gap: '10px' }}>
                        {["Excellent", "Bon", "Acceptable", "À réparer"].map((condition) => (
                          <label key={condition} className="d-flex align-items-center small" style={{ cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name="condition"
                              value={condition.toLowerCase()}
                              checked={formData.condition === condition.toLowerCase()}
                              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                              required
                              className="mr-1"
                            />
                            {condition}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                      <button className="btn btn-primary border-dark mr-3" type="submit">
                        <span className="btn-text">📦 Envoyer le formulaire</span>
                      </button>
                      <a href="/" className="btn btn-primary">
                        <span className="btn-text">⬅️ Retour à l'accueil</span>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm bg-secondary">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-4">
              <h3 className="text-white text-center mb-4">💡 Ce que nous acceptons</h3>
            </div>
            <div className="col-12 col-lg-6 mb-4">
              <div className="card">
                <div className="card-header">
                  ✅ Matériel accepté
                </div>
                <div className="card-body">
                  <ul className="mb-0">
                    <li>💻 Ordinateurs de bureau (tour complète ou composants)</li>
                    <li>🖥️ Ordinateurs portables</li>
                    <li>🖨️ Écrans et moniteurs</li>
                    <li>⌨️ Claviers et souris</li>
                    <li>🔌 Câbles et périphériques</li>
                    <li>💾 Composants (RAM, disques durs, etc.)</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mb-4">
              <div className="card card-tertiary">
                <div className="card-header">
                  <span>ℹ️ Conditions</span>
                </div>
                <div className="card-body">
                  <ul className="mb-0">
                    <li>📅 Matériel de 2005 ou plus récent</li>
                    <li>💾 Minimum 2 GB de RAM (pour les PC)</li>
                    <li>🔧 État fonctionnel ou réparable</li>
                    <li>🧹 Nettoyage effectué par nos soins</li>
                    <li>🚚 Collecte gratuite dans toute la France</li>
                    <li>📋 Reçu fiscal pour votre don</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
