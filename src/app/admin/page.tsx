"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem("adminToken");
        if (!token) {
            router.push("/login");
        } else {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        alert("✅ Déconnexion réussie");
        router.push("/");
    };

    if (loading) {
        return (
            <main className="pb-3 p-3">
                <div className="mx-auto" style={{ maxWidth: "1200px" }}>
                    <p className="text-center">Chargement...</p>
                </div>
            </main>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <main className="pb-3 p-3">
            <div className="mx-auto" style={{ maxWidth: "1200px" }}>
                {/* Header */}
                <section className="mb-3">
                    <div className="card card-tertiary">
                        <div className="card-header">
                            <div className="card-title-wrapper">
                                <span className="card-icon">👨‍💼</span>
                                <span className="card-title">
                                    Tableau de bord administrateur
                                </span>
                            </div>
                            <div className="card-controls">
                                <button className="card-control-btn">_</button>
                                <button className="card-control-btn">□</button>
                                <button className="card-control-btn">✕</button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-2">
                                        Bienvenue, Administrateur
                                    </h5>
                                    <p className="mb-0">
                                        Gérez les dons et les demandes de
                                        partenariat
                                    </p>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleLogout}
                                >
                                    <span className="btn-text">
                                        🚪 Déconnexion
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="mb-3">
                    <h3 className="text-center mb-3">📊 Statistiques</h3>
                    <div className="row g-2">
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="card h-100">
                                <div className="card-header">
                                    <div className="card-title-wrapper">
                                        <span className="card-icon">📝</span>
                                        <span className="card-title">
                                            Dons totaux
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
                                <div className="card-body text-center d-flex flex-column justify-content-center">
                                    <h2 className="display-3 mb-0">1862</h2>
                                    <p className="text-muted mb-0">
                                        matériels reçus
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="card h-100">
                                <div className="card-header">
                                    <div className="card-title-wrapper">
                                        <span className="card-icon">🤝</span>
                                        <span className="card-title">
                                            Partenaires
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
                                <div className="card-body text-center d-flex flex-column justify-content-center">
                                    <h2 className="display-3 mb-0">42</h2>
                                    <p className="text-muted mb-0">actifs</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="card h-100">
                                <div className="card-header">
                                    <div className="card-title-wrapper">
                                        <span className="card-icon">🏫</span>
                                        <span className="card-title">
                                            Écoles
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
                                <div className="card-body text-center d-flex flex-column justify-content-center">
                                    <h2 className="display-3 mb-0">601</h2>
                                    <p className="text-muted mb-0">
                                        bénéficiaires
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
                                            En attente
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
                                <div className="card-body text-center d-flex flex-column justify-content-center">
                                    <h2 className="display-3 mb-0">23</h2>
                                    <p className="text-muted mb-0">demandes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="mb-3">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title-wrapper">
                                <span className="card-icon">⚡</span>
                                <span className="card-title">
                                    Actions rapides
                                </span>
                            </div>
                            <div className="card-controls">
                                <button className="card-control-btn">_</button>
                                <button className="card-control-btn">□</button>
                                <button className="card-control-btn">✕</button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div
                                className="d-flex flex-wrap justify-content-center"
                                style={{ gap: "10px" }}
                            >
                                <button className="btn btn-primary border-dark">
                                    <span className="btn-text">
                                        📥 Voir les dons
                                    </span>
                                </button>
                                <button className="btn btn-primary border-dark">
                                    <span className="btn-text">
                                        🤝 Gérer les partenaires
                                    </span>
                                </button>
                                <button className="btn btn-primary border-dark">
                                    <span className="btn-text">
                                        📊 Rapports
                                    </span>
                                </button>
                                <a
                                    href="/admin/snake"
                                    className="btn btn-primary border-dark"
                                >
                                    <span className="btn-text">
                                        🐍 mange la pomme
                                    </span>
                                </a>
                                <button className="btn btn-primary border-dark">
                                    <span className="btn-text">
                                        ⚙️ Paramètres
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Info */}
                <section className="mb-3">
                    <div className="card card-tertiary">
                        <div className="card-header">
                            <div className="card-title-wrapper">
                                <span className="card-icon">ℹ️</span>
                                <span className="card-title">Informations</span>
                            </div>
                            <div className="card-controls">
                                <button className="card-control-btn">_</button>
                                <button className="card-control-btn">□</button>
                                <button className="card-control-btn">✕</button>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="mb-2">
                                <strong>Version :</strong> NIRD Admin v1.0
                            </p>
                            <p className="mb-2">
                                <strong>Dernière connexion :</strong>{" "}
                                {new Date().toLocaleString("fr-FR")}
                            </p>
                            <p className="mb-0">
                                <strong>Statut :</strong>{" "}
                                <span style={{ color: "green" }}>
                                    ✓ Système opérationnel
                                </span>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
