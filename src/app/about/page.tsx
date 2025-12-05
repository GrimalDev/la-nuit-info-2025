"use client";

export default function AboutPage() {
  return (
    <main className="pb-3 p-3">
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        {/* Hero Section */}
        <section className="mb-3">
          <div className="card card-tertiary">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">🐧</span>
                <span className="card-title">À propos de NIRD Linux</span>
              </div>
              <div className="card-controls">
                <button className="card-control-btn">_</button>
                <button className="card-control-btn">□</button>
                <button className="card-control-btn">✕</button>
              </div>
            </div>
            <div className="card-body">
              <div className="text-center" style={{ fontSize: "5rem" }}>
                🐧
              </div>
              <h5 className="text-center mb-2">
                Un système d'exploitation gratuit pour l'école
              </h5>
              <p className="card-text text-center">
                Aux côtés de Windows et MacOS, il existe Linux, un système
                d'exploitation gratuit, rapide et respectueux de votre vie
                privée, capable de faire fonctionner les ordinateurs de tout âge
                et de toute marque.
              </p>
              <p className="card-text text-center">
                Linux se décline en de nombreuses versions appelées
                "distributions". Ce sont des adaptations de Linux conçues pour
                répondre aux besoins spécifiques de chaque utilisateur.
                <strong> Linux NIRD</strong> en fait partie.
              </p>
              <p className="card-text text-center">
                <strong>Linux NIRD</strong> est une distribution Linux
                spécialement adaptée pour les écoles, créée par des enseignants
                et maintenue par des enseignants pour les ordinateurs des
                établissements scolaires.
              </p>
              <p className="card-text text-center">
                En plus de redonner vie aux ordinateurs que l'on pensait
                obsolètes, elle contient tous les logiciels dont on a besoin au
                quotidien : traitement de texte, tableur, logiciel de
                présentation, retouche photo... Une alternative gratuite et
                performante aux logiciels payants habituels.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-3">
          <h3 className="text-center mb-3">✨ Caractéristiques principales</h3>
          <div className="row g-2">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">💨</span>
                    <span className="card-title">Légèreté</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Fonctionne parfaitement sur des PC de plus de 10 ans avec
                    seulement 2 GB de RAM. Redonnez vie à l'ancien matériel.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">🎓</span>
                    <span className="card-title">Éducatif</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Interface adaptée aux enfants avec des logiciels éducatifs
                    préinstallés. LibreOffice, GCompris, et plus encore.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">🔒</span>
                    <span className="card-title">Sécurisé</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Respectueux de la vie privée, sans trackers. Mises à jour de
                    sécurité régulières et protection contre les menaces.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">🎨</span>
                    <span className="card-title">Simple</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Interface intuitive inspirée de Windows 95. Les utilisateurs
                    se sentent immédiatement à l'aise.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">🆓</span>
                    <span className="card-title">Gratuit</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    100% open-source et gratuit. Aucune licence à payer, aucun
                    frais caché. Support communautaire actif.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <div className="card-title-wrapper">
                    <span className="card-icon">🛠️</span>
                    <span className="card-title">Support</span>
                  </div>
                  <div className="card-controls">
                    <button className="card-control-btn">_</button>
                    <button className="card-control-btn">□</button>
                    <button className="card-control-btn">✕</button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Assistance technique gratuite pour toutes les écoles.
                    Documentation complète et tutoriels vidéo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Software Included */}
        <section className="mb-3">
          <div className="card card-tertiary">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">📦</span>
                <span className="card-title">Logiciels inclus</span>
              </div>
              <div className="card-controls">
                <button className="card-control-btn">_</button>
                <button className="card-control-btn">□</button>
                <button className="card-control-btn">✕</button>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-6">
                  <h6 className="font-weight-bold mb-3">📚 Éducation</h6>
                  <ul className="mb-4">
                    <li>GCompris - Activités éducatives pour enfants</li>
                    <li>Scratch - Apprendre la programmation</li>
                    <li>Tux Paint - Dessin créatif</li>
                    <li>Stellarium - Planétarium virtuel</li>
                    <li>Kalzium - Table périodique interactive</li>
                  </ul>
                </div>
                <div className="col-12 col-md-6">
                  <h6 className="font-weight-bold mb-3">💼 Bureautique</h6>
                  <ul className="mb-4">
                    <li>LibreOffice - Suite bureautique complète</li>
                    <li>GIMP - Éditeur d'images</li>
                    <li>Firefox - Navigateur web</li>
                    <li>Thunderbird - Client email</li>
                    <li>VLC - Lecteur multimédia</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Requirements */}
        <section className="mb-3">
          <div className="card">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">⚙️</span>
                <span className="card-title">
                  Configuration minimale requise
                </span>
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
                  <div className="card bg-light h-100">
                    <div className="card-body">
                      <h6 className="font-weight-bold">Processeur</h6>
                      <p className="mb-0 small">
                        Intel Pentium 4 ou équivalent (32-bit ou 64-bit)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card bg-light h-100">
                    <div className="card-body">
                      <h6 className="font-weight-bold">Mémoire RAM</h6>
                      <p className="mb-0 small">
                        2 GB minimum, 4 GB recommandé
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card bg-light h-100">
                    <div className="card-body">
                      <h6 className="font-weight-bold">Stockage</h6>
                      <p className="mb-0 small">
                        20 GB d'espace disque minimum
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="card bg-light h-100">
                    <div className="card-body">
                      <h6 className="font-weight-bold">Écran</h6>
                      <p className="mb-0 small">
                        Résolution 1024x768 ou supérieure
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-3">
          <div className="card">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">🎯</span>
                <span className="card-title">Notre mission</span>
              </div>
              <div className="card-controls">
                <button className="card-control-btn">_</button>
                <button className="card-control-btn">□</button>
                <button className="card-control-btn">✕</button>
              </div>
            </div>
            <div className="card-body">
              <h5 className="text-center mb-3">
                Réduire la fracture numérique en éducation
              </h5>
              <p className="card-text mb-3 text-center">
                Nous croyons que chaque enfant mérite d'avoir accès à un
                ordinateur pour son éducation. En récupérant du matériel
                informatique ancien et en y installant NIRD Linux, nous :
              </p>
              <div className="row g-2">
                <div className="col-12 col-md-4 text-center">
                  <div style={{ fontSize: "3rem" }}>♻️</div>
                  <h6 className="font-weight-bold">Recyclons</h6>
                  <p className="small mb-0">
                    Réduisons les déchets électroniques
                  </p>
                </div>
                <div className="col-12 col-md-4 text-center">
                  <div style={{ fontSize: "3rem" }}>🎓</div>
                  <h6 className="font-weight-bold">Éduquons</h6>
                  <p className="small mb-0">Équipons les écoles françaises</p>
                </div>
                <div className="col-12 col-md-4 text-center">
                  <div style={{ fontSize: "3rem" }}>🌍</div>
                  <h6 className="font-weight-bold">Protégeons</h6>
                  <p className="small mb-0">Préservons notre environnement</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-3">
          <div className="card card-tertiary">
            <div className="card-header">
              <div className="card-title-wrapper">
                <span className="card-icon">💪</span>
                <span className="card-title">Rejoignez le mouvement</span>
              </div>
              <div className="card-controls">
                <button className="card-control-btn">_</button>
                <button className="card-control-btn">□</button>
                <button className="card-control-btn">✕</button>
              </div>
            </div>
            <div className="card-body text-center">
              <p className="card-text mb-3">
                Vous avez du matériel informatique inutilisé ? Donnez-lui une
                seconde vie et aidez des milliers d'élèves à accéder à
                l'éducation numérique.
              </p>
              <div
                className="d-flex justify-content-center flex-wrap"
                style={{ gap: "10px" }}
              >
                <a href="/donate" className="btn btn-primary border-dark">
                  <span className="btn-text">📝 Faire un don</span>
                </a>
                <a href="/map" className="btn btn-primary">
                  <span className="btn-text">🗺️ Voir la carte</span>
                </a>
                <a href="/" className="btn btn-primary">
                  <span className="btn-text">⬅️ Accueil</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
