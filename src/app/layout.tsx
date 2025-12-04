import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nird Hardware Donation - Recycle & Educate",
  description: "Donate your old hardware to clean, install Nird distro and give them to education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="/w95.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ paddingBottom: '48px' }}
      >
        <BootstrapClient />
        {children}
        <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
          <nav className="navbar navbar-main navbar-expand-lg navbar-dark justify-content-between navbar-footer">
            <ul className="navbar-nav navbar-nav-hover flex-row align-items-center">
              <li className="nav-item">
                <a href="/" className="nav-link" role="button">
                  <span className="nav-link-inner-text">🪟 Accueil</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/performance" className="nav-link" role="button">
                  <span className="nav-link-inner-text">📊 Performance</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/donate" className="nav-link" role="button">
                  <span className="nav-link-inner-text">📝 Don</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/map" className="nav-link" role="button">
                  <span className="nav-link-inner-text">🗺️ Carte</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/about" className="nav-link" role="button">
                  <span className="nav-link-inner-text">📕 À propos</span>
                </a>
              </li>
            </ul>
            <div className="time text-center">
              <span className="time text-uppercase">🔊 1:47 PM</span>
            </div>
          </nav>
        </footer>
      </body>
    </html>
  );
}
