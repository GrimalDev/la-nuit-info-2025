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

export default function PartnerPage() {
    const [formData, setFormData] = useState({
        organizationName: "",
        organizationType: "",
        contactName: "",
        email: "",
        phone: "",
        region: "",
        address: "",
        hardwareQuantity: "",
        description: "",
        siret: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/partners', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert(
                    "✅ Demande de partenariat envoyée ! Notre équipe vous contactera sous 48h pour valider votre compte partenaire.",
                );
                
                // Reset form
                setFormData({
                    organizationName: "",
                    organizationType: "",
                    contactName: "",
                    email: "",
                    phone: "",
                    region: "",
                    address: "",
                    hardwareQuantity: "",
                    description: "",
                    siret: "",
                });
            } else {
                alert(`⚠️ ${data.error || 'Erreur lors de l\'envoi du formulaire'}`);
            }
        } catch (error) {
            console.error('Error submitting partner request:', error);
            alert('⚠️ Erreur de connexion. Veuillez réessayer.');
        }
    };

    return (
        <main className="pb-3 p-3">
            <div className="mx-auto" style={{ maxWidth: "1200px" }}>
                {/* Hero Section */}
                <section className="mb-3">
                    <div className="card card-tertiary">
                        <div className="card-header">
                            <div className="card-title-wrapper">
                                <span className="card-icon">🤝</span>
                                <span className="card-title">
                                    Devenir partenaire
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
                                Associations et organisations : rejoignez-nous !
                            </h5>
                            <p className="card-text text-center">
                                Vous êtes une association, une école, une
                                entreprise ou une collectivité ? Devenez
                                partenaire pour faire des dons en plus grande
                                quantité (plus de 5 unités).
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
                                    Formulaire de partenariat
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
                                                htmlFor="organizationName"
                                                className="small"
                                            >
                                                Nom de l'organisation *
                                            </label>
                                            <input
                                                id="organizationName"
                                                type="text"
                                                className="form-control"
                                                placeholder="Association XYZ"
                                                value={
                                                    formData.organizationName
                                                }
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        organizationName:
                                                            e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="organizationType"
                                                className="small"
                                            >
                                                Type d'organisation *
                                            </label>
                                            <select
                                                id="organizationType"
                                                className="form-control"
                                                value={
                                                    formData.organizationType
                                                }
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        organizationType:
                                                            e.target.value,
                                                    })
                                                }
                                                required
                                            >
                                                <option value="">
                                                    -- Sélectionner --
                                                </option>
                                                <option value="association">
                                                    Association
                                                </option>
                                                <option value="school">
                                                    École / Université
                                                </option>
                                                <option value="company">
                                                    Entreprise
                                                </option>
                                                <option value="collectivity">
                                                    Collectivité
                                                </option>
                                                <option value="other">
                                                    Autre
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row g-2">
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="contactName"
                                                className="small"
                                            >
                                                Nom du contact *
                                            </label>
                                            <input
                                                id="contactName"
                                                type="text"
                                                className="form-control"
                                                placeholder="Jean Dupont"
                                                value={formData.contactName}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        contactName:
                                                            e.target.value,
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
                                                Email *
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                className="form-control"
                                                placeholder="contact@association.fr"
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

                                <div className="row g-2">
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="phone"
                                                className="small"
                                            >
                                                Téléphone *
                                            </label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                className="form-control"
                                                placeholder="01 23 45 67 89"
                                                value={formData.phone}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        phone: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="region"
                                                className="small"
                                            >
                                                Région *
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
                                                    <option
                                                        key={region}
                                                        value={region}
                                                    >
                                                        {region}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address" className="small">
                                        Adresse complète *
                                    </label>
                                    <input
                                        id="address"
                                        type="text"
                                        className="form-control"
                                        placeholder="123 Rue de la République, 75001 Paris"
                                        value={formData.address}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                address: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div className="row g-2">
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="siret"
                                                className="small"
                                            >
                                                SIRET (si applicable)
                                            </label>
                                            <input
                                                id="siret"
                                                type="text"
                                                className="form-control"
                                                placeholder="123 456 789 00012"
                                                value={formData.siret}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        siret: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="hardwareQuantity"
                                                className="small"
                                            >
                                                Quantité estimée de matériel *
                                            </label>
                                            <input
                                                id="hardwareQuantity"
                                                type="number"
                                                min="6"
                                                className="form-control"
                                                placeholder="Minimum 6 unités"
                                                value={
                                                    formData.hardwareQuantity
                                                }
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        hardwareQuantity:
                                                            e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label
                                        htmlFor="description"
                                        className="small"
                                    >
                                        Description du matériel et de votre
                                        projet *
                                    </label>
                                    <textarea
                                        id="description"
                                        className="form-control"
                                        rows={4}
                                        placeholder="Décrivez le type de matériel que vous souhaitez donner et votre projet..."
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div className="d-flex justify-content-center mt-4">
                                    <button
                                        className="btn btn-primary border-dark mr-3"
                                        type="submit"
                                    >
                                        <span className="btn-text">
                                            📦 Envoyer la demande
                                        </span>
                                    </button>
                                    <a
                                        href="/donate"
                                        className="btn btn-primary"
                                    >
                                        <span className="btn-text">
                                            ⬅️ Retour aux dons
                                        </span>
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="mb-3">
                    {/* <h3 className="text-center mb-3">✨ Avantages partenaires</h3> */}
                    <div className="row g-2">
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="card h-100">
                                <div className="card-header">
                                    <div className="card-title-wrapper">
                                        <span className="card-icon">🚚</span>
                                        <span className="card-title">
                                            Collecte prioritaire
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
                                    <p className="mb-0">
                                        Service de collecte sur rendez-vous avec
                                        camion dédié
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="card h-100">
                                <div className="card-header">
                                    <div className="card-title-wrapper">
                                        <span className="card-icon">📋</span>
                                        <span className="card-title">
                                            Suivi détaillé
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
                                    <p className="mb-0">
                                        Reporting complet de l'impact de votre
                                        don
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="card h-100">
                                <div className="card-header">
                                    <div className="card-title-wrapper">
                                        <span className="card-icon">🏆</span>
                                        <span className="card-title">
                                            Reconnaissance
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
                                    <p className="mb-0">
                                        Logo sur notre site et communications
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="card h-100">
                                <div className="card-header">
                                    <div className="card-title-wrapper">
                                        <span className="card-icon">💼</span>
                                        <span className="card-title">
                                            Attestation fiscale
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
                                    <p className="mb-0">
                                        Reçu fiscal pour déduction d'impôts
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
