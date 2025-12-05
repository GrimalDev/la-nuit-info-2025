"use client";

import { useState, useEffect } from "react";

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
        name: "",
        email: "",
        region: "",
        hardwareType: "",
        quantity: "1",
        condition: "",
    });
    const [totalDonated, setTotalDonated] = useState(0);
    const [remainingSlots, setRemainingSlots] = useState(5);

    useEffect(() => {
        // Fetch current donation count from API
        fetch('/api/donations')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setTotalDonated(data.currentDonations);
                    setRemainingSlots(data.remainingSlots);
                }
            })
            .catch(err => console.error('Error fetching donation count:', err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/donations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    region: formData.region,
                    hardwareType: formData.hardwareType,
                    quantity: parseInt(formData.quantity),
                    condition: formData.condition,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Update local state
                setTotalDonated(data.currentDonations);
                setRemainingSlots(data.remainingSlots);

                if (data.currentDonations >= 5) {
                    alert(
                        `✅ Formulaire envoyé ! Merci pour votre don.\n\nVous avez atteint la limite de 5 unités. Pour donner plus, veuillez devenir partenaire.`,
                    );
                } else {
                    alert(
                        `✅ Formulaire envoyé ! Merci pour votre don. Nous vous contacterons bientôt.\n\nVous pouvez encore donner ${data.remainingSlots} unité(s).`,
                    );
                }

                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    region: "",
                    hardwareType: "",
                    quantity: "1",
                    condition: "",
                });
            } else {
                // Handle error
                alert(`⚠️ ${data.message || data.error || 'Erreur lors de l\'envoi du formulaire'}`);
            }
        } catch (error) {
            console.error('Error submitting donation:', error);
            alert('⚠️ Erreur de connexion. Veuillez réessayer.');
        }
    };

    return (
        <main className="pb-3 p-3">
            <div className="mx-auto" style={{ maxWidth: "1200px" }}>
                {/* Limit Notice */}
                {remainingSlots < 5 && (
                    <section className="mb-3">
                        <div className="card" style={{ borderColor: remainingSlots === 0 ? '#ff0000' : '#ffa500', borderWidth: '2px' }}>
                            <div className="card-header" style={{ backgroundColor: remainingSlots === 0 ? '#ffcccc' : '#fff3cd' }}>
                                <div className="card-title-wrapper">
                                    <span className="card-icon">⚠️</span>
                                    <span className="card-title">
                                        {remainingSlots === 0 ? 'Limite atteinte' : 'Limite de dons'}
                                    </span>
                                </div>
                            </div>
                            <div className="card-body">
                                {remainingSlots === 0 ? (
                                    <>
                                        <p className="mb-2">Vous avez atteint la limite de 5 unités pour les particuliers.</p>
                                        <p className="mb-0">
                                            <strong>Besoin de donner plus ?</strong> <a href="/partner" className="text-primary">Devenez partenaire</a> pour des dons illimités !
                                        </p>
                                    </>
                                ) : (
                                    <p className="mb-0">
                                        Vous avez déjà fait don de <strong>{totalDonated} unité(s)</strong>. 
                                        Il vous reste <strong>{remainingSlots} unité(s)</strong> à donner. 
                                        <a href="/partner" className="text-primary ml-2">Devenir partenaire pour plus</a>
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>
                )}
                
                {/* Hero Section */}
                <section className="mb-3">
                    <div className="card card-tertiary">
                        <div className="card-header">
                            <div className="card-title-wrapper">
                                <span className="card-icon">📝</span>
                                <span className="card-title">
                                    Faire un don de matériel
                                </span>
                            </div>
                            <div className="card-controls">
                                <button className="card-control-btn">_</button>
                                <button className="card-control-btn">□</button>
                                <button className="card-control-btn">✕</button>
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="text-center mb-2">
                                Donnez une seconde vie à votre matériel
                                informatique
                            </h5>
                            <p className="card-text text-center">
                                Remplissez ce formulaire pour nous indiquer le
                                matériel que vous souhaitez donner. Nous vous
                                contacterons rapidement pour organiser la
                                collecte.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="mb-3">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title-wrapper">
                                <span className="card-icon">📋</span>
                                <span className="card-title">
                                    Formulaire de don
                                </span>
                            </div>
                            <div className="card-controls">
                                <button className="card-control-btn">_</button>
                                <button className="card-control-btn">□</button>
                                <button className="card-control-btn">✕</button>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row g-2">
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="name"
                                                className="small"
                                            >
                                                Nom complet
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                className="form-control"
                                                placeholder="Jean Dupont"
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        name: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="email"
                                                className="small"
                                            >
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                className="form-control"
                                                placeholder="jean@exemple.fr"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        email: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="region" className="small">
                                        Région
                                    </label>
                                    <select
                                        id="region"
                                        className="form-control"
                                        value={formData.region}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                region: e.target.value,
                                            })
                                        }
                                        required
                                    >
                                        <option value="">
                                            -- Sélectionner --
                                        </option>
                                        {regionsData.map((region) => (
                                            <option key={region} value={region}>
                                                {region}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="row g-2">
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="hardwareType"
                                                className="small"
                                            >
                                                Type de matériel
                                            </label>
                                            <select
                                                id="hardwareType"
                                                className="form-control"
                                                value={formData.hardwareType}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        hardwareType:
                                                            e.target.value,
                                                    })
                                                }
                                                required
                                            >
                                                <option value="">
                                                    -- Sélectionner --
                                                </option>
                                                <option value="desktop">
                                                    Ordinateur de bureau
                                                </option>
                                                <option value="laptop">
                                                    Ordinateur portable
                                                </option>
                                                <option value="monitor">
                                                    Écran
                                                </option>
                                                <option value="keyboard">
                                                    Clavier
                                                </option>
                                                <option value="mouse">
                                                    Souris
                                                </option>
                                                <option value="other">
                                                    Autre
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="quantity"
                                                className="small"
                                            >
                                                Quantité (max: {remainingSlots > 0 ? remainingSlots : 0})
                                            </label>
                                            <input
                                                id="quantity"
                                                type="number"
                                                min="1"
                                                max={remainingSlots > 0 ? remainingSlots : 0}
                                                className="form-control"
                                                value={formData.quantity}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        quantity:
                                                            e.target.value,
                                                    })
                                                }
                                                disabled={remainingSlots === 0}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="small d-block mb-2">
                                        État du matériel
                                    </label>
                                    <div
                                        className="d-flex flex-wrap"
                                        style={{ gap: "10px" }}
                                    >
                                        {[
                                            "Excellent",
                                            "Bon",
                                            "Acceptable",
                                            "À réparer",
                                        ].map((condition) => (
                                            <label
                                                key={condition}
                                                className="d-flex align-items-center small"
                                                style={{ cursor: "pointer" }}
                                            >
                                                <input
                                                    type="radio"
                                                    name="condition"
                                                    value={condition.toLowerCase()}
                                                    checked={
                                                        formData.condition ===
                                                        condition.toLowerCase()
                                                    }
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            condition:
                                                                e.target.value,
                                                        })
                                                    }
                                                    required
                                                    className="mr-1"
                                                />
                                                {condition}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-4">
                                    <button
                                        className="btn btn-primary border-dark mr-3"
                                        type="submit"
                                    >
                                        <span className="btn-text">
                                            📦 Envoyer le formulaire
                                        </span>
                                    </button>
                                    <a href="/" className="btn btn-primary">
                                        <span className="btn-text">
                                            ⬅️ Retour à l'accueil
                                        </span>
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                {/* What We Accept Section */}
                <section className="mb-3">
                    {/* <h3 className="text-center mb-3">💡 Ce que nous acceptons</h3> */}
                    <div className="row g-2">
                        <div className="col-12 col-lg-6">
                            <div className="card h-100">
                                <div className="card-header">
                                    <div className="card-title-wrapper">
                                        <span className="card-icon">✅</span>
                                        <span className="card-title">
                                            Matériel accepté
                                        </span>
                                    </div>
                                    <div className="card-controls">
                                        <button className="card-control-btn">
                                            _
                                        </button>
                                        <button className="card-control-btn">
                                            □
                                        </button>
                                        <button className="card-control-btn">
                                            ✕
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="mb-0">
                                        <li>
                                            💻 Ordinateurs de bureau (tour
                                            complète ou composants)
                                        </li>
                                        <li>🖥️ Ordinateurs portables</li>
                                        <li>🖨️ Écrans et moniteurs</li>
                                        <li>⌨️ Claviers et souris</li>
                                        <li>🔌 Câbles et périphériques</li>
                                        <li>
                                            💾 Composants (RAM, disques durs,
                                            etc.)
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="card card-tertiary h-100">
                                <div className="card-header">
                                    <div className="card-title-wrapper">
                                        <span className="card-icon">ℹ️</span>
                                        <span className="card-title">
                                            Conditions
                                        </span>
                                    </div>
                                    <div className="card-controls">
                                        <button className="card-control-btn">
                                            _
                                        </button>
                                        <button className="card-control-btn">
                                            □
                                        </button>
                                        <button className="card-control-btn">
                                            ✕
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="mb-0">
                                        <li>
                                            📅 Matériel de 2005 ou plus récent
                                        </li>
                                        <li>
                                            💾 Minimum 2 GB de RAM (pour les PC)
                                        </li>
                                        <li>
                                            🔧 État fonctionnel ou réparable
                                        </li>
                                        <li>
                                            🧹 Nettoyage effectué par nos soins
                                        </li>
                                        <li>
                                            🚚 Collecte gratuite dans toute la
                                            France
                                        </li>
                                        <li>📋 Reçu fiscal pour votre don</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
