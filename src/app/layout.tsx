import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";
import NavbarFooter from "@/components/NavbarFooter";

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
                    <NavbarFooter />
                </footer>
            </body>
        </html>
    );
}
