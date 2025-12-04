import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";
import Clock from "@/components/Clock";

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
    description:
        "Donate your old hardware to clean, install Nird distro and give them to education",
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
                style={{ paddingBottom: "48px" }}
            >
                <BootstrapClient />
                {children}
                <footer
                    style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                    }}
                >
                    <nav className="navbar navbar-main navbar-expand-lg navbar-dark justify-content-between navbar-footer">
                        <ul className="navbar-nav navbar-nav-hover flex-row align-items-center">
                            <li className="nav-item">
                                <Link href="/" className="nav-link" role="button">
                                    <span className="nav-link-inner-text">
                                        🪟 Accueil
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
                        </ul>
                        <div className="text-center">
                            <Clock />
                        </div>
                    </nav>
                </footer>
            </body>
        </html>
    );
}
