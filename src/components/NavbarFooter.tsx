'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Clock from './Clock';
import ClippyModal from './ClippyModal';

export default function NavbarFooter() {
  const [isClippyOpen, setIsClippyOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const token = localStorage.getItem('adminToken');
    setIsAdmin(!!token);
  }, []);

  return (
    <>
      <nav className="navbar navbar-main navbar-expand-lg navbar-dark justify-content-between navbar-footer">
        <ul className="navbar-nav navbar-nav-hover flex-row align-items-center">
          <li className="nav-item">
            <button
              className="nav-link"
              role="button"
              onClick={() => setIsClippyOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <span className="nav-link-inner-text">
                🪟 Démarrez
              </span>
            </button>
          </li>
          <li className="nav-item">
            <Link href="/" className="nav-link" role="button">
              <span className="nav-link-inner-text">
                🏠 Accueil
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href="/performance"
              className="nav-link"
              role="button"
            >
              <span className="nav-link-inner-text">
                📊 Performance
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href="/donate"
              className="nav-link"
              role="button"
            >
              <span className="nav-link-inner-text">
                📝 Don
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href="/partner"
              className="nav-link"
              role="button"
            >
              <span className="nav-link-inner-text">
                🤝 Partenaire
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href="/map"
              className="nav-link"
              role="button"
            >
              <span className="nav-link-inner-text">
                🗺️ Carte
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href="/about"
              className="nav-link"
              role="button"
            >
              <span className="nav-link-inner-text">
                📕 À propos
              </span>
            </Link>
          </li>
          {isAdmin && (
            <li className="nav-item">
              <Link
                href="/admin"
                className="nav-link"
                role="button"
                style={{ borderLeft: '2px solid #fff' }}
              >
                <span className="nav-link-inner-text">
                  👨‍💼 Admin
                </span>
              </Link>
            </li>
          )}
        </ul>
        <div className="text-center">
          <Clock />
        </div>
      </nav>
      
      <ClippyModal isOpen={isClippyOpen} onClose={() => setIsClippyOpen(false)} />
    </>
  );
}
