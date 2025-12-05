"use client";

import { useEffect, useState } from "react";

interface RegionData {
    name: string;
    donations: number;
    schools: number;
}

interface GeoFeature {
    type: string;
    properties: {
        code: string;
        nom: string;
    };
    geometry: {
        type: string;
        coordinates: any;
    };
}

const colorScale = [
    "#c8e6c9",
    "#a5d6a7",
    "#81c784",
    "#66bb6a",
    "#4caf50",
    "#43a047",
    "#388e3c",
    "#2e7d32",
];

// Helper function to convert GeoJSON coordinates to SVG path
function geoToPath(
    geometry: any,
    projection: (coord: [number, number]) => [number, number],
): string {
    if (geometry.type === "Polygon") {
        return geometry.coordinates
            .map((ring: any) => {
                return (
                    ring
                        .map((coord: any, i: number) => {
                            const [x, y] = projection(coord);
                            return `${i === 0 ? "M" : "L"}${x},${y}`;
                        })
                        .join("") + "Z"
                );
            })
            .join(" ");
    } else if (geometry.type === "MultiPolygon") {
        return geometry.coordinates
            .map((polygon: any) => {
                return polygon
                    .map((ring: any) => {
                        return (
                            ring
                                .map((coord: any, i: number) => {
                                    const [x, y] = projection(coord);
                                    return `${i === 0 ? "M" : "L"}${x},${y}`;
                                })
                                .join("") + "Z"
                        );
                    })
                    .join(" ");
            })
            .join(" ");
    }
    return "";
}

// Simple projection function for France
function simpleProjection(coord: [number, number]): [number, number] {
    const [lon, lat] = coord;
    // Center on France (lon: -5 to 10, lat: 41 to 51)
    const scale = 50;
    const offsetX = 300;
    const offsetY = 500;

    const x = (lon + 2) * scale + offsetX;
    const y = (51 - lat) * scale + offsetY;

    return [x, y];
}

export default function MapPage() {
    const [regionsData, setRegionsData] = useState<RegionData[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(
        null,
    );
    const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);
    const [donationsByCode, setDonationsByCode] = useState<{
        [key: string]: RegionData;
    }>({});
    const [geoFeatures, setGeoFeatures] = useState<GeoFeature[]>([]);

    useEffect(() => {
        // Load GeoJSON
        fetch(
            "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions-version-simplifiee.geojson",
        )
            .then((res) => res.json())
            .then((geojson) => {
                setGeoFeatures(geojson.features);
            })
            .catch((err) => console.error("Error loading GeoJSON:", err));

        // Load stats
        fetch("/api/stats")
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.stats.byRegion) {
                    const regions: RegionData[] = data.stats.byRegion.map(
                        (r: any) => ({
                            name: r.region,
                            donations: r.total_quantity || 0,
                            schools: Math.floor((r.total_quantity || 0) / 3),
                        }),
                    );
                    setRegionsData(regions);

                    // Map region names to GeoJSON codes
                    const regionNameToCode: { [key: string]: string } = {
                        "Île-de-France": "11",
                        "Centre-Val de Loire": "24",
                        "Bourgogne-Franche-Comté": "27",
                        Normandie: "28",
                        "Hauts-de-France": "32",
                        "Grand Est": "44",
                        "Pays de la Loire": "52",
                        Bretagne: "53",
                        "Nouvelle-Aquitaine": "75",
                        Occitanie: "76",
                        "Auvergne-Rhône-Alpes": "84",
                        "Provence-Alpes-Côte d'Azur": "93",
                        Corse: "94",
                    };

                    const donationsMap: { [key: string]: RegionData } = {};
                    regions.forEach((region: RegionData) => {
                        const code = regionNameToCode[region.name];
                        if (code) {
                            donationsMap[code] = region;
                        }
                    });
                    setDonationsByCode(donationsMap);
                }
            })
            .catch((err) => console.error("Error loading region data:", err));
    }, []);

    const donations = regionsData.map((r) => r.donations);
    const minDonations = donations.length > 0 ? Math.min(...donations) : 0;
    const maxDonations = donations.length > 0 ? Math.max(...donations) : 0;

    const getColorForDonations = (donations: number) => {
        if (maxDonations === minDonations) return colorScale[0];
        const ratio =
            (donations - minDonations) / (maxDonations - minDonations);
        const index = Math.min(
            Math.floor(ratio * colorScale.length),
            colorScale.length - 1,
        );
        return colorScale[index];
    };

    return (
        <main
            className="container"
            style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        >
            <div className="row mb-3">
                <div className="col">
                    <div className="card card-primary">
                        <div className="card-header">
                            <div className="card-title-wrapper">
                                <span className="card-icon">🗺️</span>
                                <span className="card-title">
                                    Carte des Dons - Libre Tous Tech
                                </span>
                            </div>
                            <div className="card-controls">
                                <button className="card-control-btn">_</button>
                                <button className="card-control-btn">□</button>
                                <button className="card-control-btn">✕</button>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="mb-3">
                                Explorez la répartition géographique des dons de
                                matériel informatique à travers la France.
                                Cliquez sur une région pour voir les détails.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <section className="mb-3">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title-wrapper">
                            <span className="card-icon">📍</span>
                            <span className="card-title">
                                France - Cliquez sur une région
                            </span>
                        </div>
                        <div className="card-controls">
                            <button className="card-control-btn">_</button>
                            <button className="card-control-btn">□</button>
                            <button className="card-control-btn">✕</button>
                        </div>
                    </div>
                    <div className="card-body" style={{ padding: "0.5rem" }}>
                        <div style={{ position: "relative" }}>
                            {/* Hover info box - top right with fixed width */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    width: "220px",
                                    minHeight: "100px",
                                    zIndex: 10,
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {hoveredRegion ? (
                                    <div
                                        className="card border-dark"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                                            boxShadow:
                                                "0 4px 12px rgba(0,0,0,0.15)",
                                            animation: "fadeIn 0.3s ease",
                                        }}
                                    >
                                        <div
                                            className="card-header py-2"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #007bff 0%, #0056b3 100%)",
                                                color: "white",
                                                borderBottom:
                                                    "2px solid #004085",
                                            }}
                                        >
                                            <small className="font-weight-bold">
                                                📍 {hoveredRegion.name}
                                            </small>
                                        </div>
                                        <div className="card-body py-2">
                                            <p
                                                className="mb-1 small"
                                                style={{ fontWeight: "600" }}
                                            >
                                                <span
                                                    style={{ color: "#28a745" }}
                                                >
                                                    💻
                                                </span>{" "}
                                                Dons:{" "}
                                                <strong>
                                                    {hoveredRegion.donations}
                                                </strong>
                                            </p>
                                            <p
                                                className="mb-0 small"
                                                style={{ fontWeight: "600" }}
                                            >
                                                <span
                                                    style={{ color: "#dc3545" }}
                                                >
                                                    🏫
                                                </span>{" "}
                                                Écoles:{" "}
                                                <strong>
                                                    {hoveredRegion.schools}
                                                </strong>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ height: "100px" }}></div>
                                )}
                            </div>

                            <svg
                                viewBox="200 400 700 800"
                                className="w-100"
                                style={{
                                    maxWidth: "700px",
                                    margin: "0 auto",
                                    display: "block",
                                }}
                            >
                                {geoFeatures.map((feature) => {
                                    const code = feature.properties.code;
                                    const regionData = donationsByCode[code];
                                    const isHovered =
                                        hoveredRegion?.name ===
                                        regionData?.name;
                                    const isSelected =
                                        selectedRegion?.name ===
                                        regionData?.name;

                                    return (
                                        <path
                                            key={code}
                                            d={geoToPath(
                                                feature.geometry,
                                                simpleProjection,
                                            )}
                                            fill={
                                                regionData
                                                    ? getColorForDonations(
                                                          regionData.donations,
                                                      )
                                                    : "#e0e0e0"
                                            }
                                            stroke={
                                                isSelected
                                                    ? "#0066cc"
                                                    : isHovered
                                                      ? "#004499"
                                                      : "#2c3e50"
                                            }
                                            strokeWidth={
                                                isSelected
                                                    ? 2.5
                                                    : isHovered
                                                      ? 2
                                                      : 1
                                            }
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            style={{
                                                cursor: "pointer",
                                                transition:
                                                    "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                filter: isHovered
                                                    ? "brightness(1.15)"
                                                    : isSelected
                                                      ? "brightness(1.1)"
                                                      : "none",
                                            }}
                                            onMouseEnter={() => {
                                                if (regionData)
                                                    setHoveredRegion(
                                                        regionData,
                                                    );
                                            }}
                                            onMouseLeave={() =>
                                                setHoveredRegion(null)
                                            }
                                            onClick={() => {
                                                if (regionData) {
                                                    setSelectedRegion(
                                                        isSelected
                                                            ? null
                                                            : regionData,
                                                    );
                                                }
                                            }}
                                        />
                                    );
                                })}
                            </svg>
                        </div>
                        <div
                            className="mt-2"
                            style={{ padding: "0 0.5rem 0.5rem 0.5rem" }}
                        >
                            <h6
                                className="text-center mb-2"
                                style={{
                                    fontWeight: "600",
                                    color: "#495057",
                                    fontSize: "0.9rem",
                                }}
                            >
                                📊 Intensité des dons
                            </h6>
                            <div className="d-flex align-items-center justify-content-between px-3">
                                <span
                                    className="small font-weight-bold"
                                    style={{ color: "#6c757d" }}
                                >
                                    Faible
                                    <br />
                                    <small style={{ fontSize: "0.75rem" }}>
                                        ({minDonations})
                                    </small>
                                </span>
                                <div
                                    className="d-flex"
                                    style={{
                                        gap: "3px",
                                        flex: 1,
                                        maxWidth: "300px",
                                        margin: "0 15px",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                        borderRadius: "4px",
                                        overflow: "hidden",
                                    }}
                                >
                                    {colorScale.map((color, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                backgroundColor: color,
                                                height: "24px",
                                                flex: 1,
                                                border: "1px solid rgba(255,255,255,0.3)",
                                                transition:
                                                    "transform 0.2s ease",
                                            }}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.transform =
                                                    "scaleY(1.2)")
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.transform =
                                                    "scaleY(1)")
                                            }
                                        />
                                    ))}
                                </div>
                                <span
                                    className="small font-weight-bold"
                                    style={{ color: "#6c757d" }}
                                >
                                    Élevé
                                    <br />
                                    <small style={{ fontSize: "0.75rem" }}>
                                        ({maxDonations})
                                    </small>
                                </span>
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
                                <span className="card-title">
                                    {selectedRegion.name}
                                </span>
                            </div>
                            <div className="card-controls">
                                <button className="card-control-btn">_</button>
                                <button className="card-control-btn">□</button>
                                <button className="card-control-btn">✕</button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="stat-box">
                                        <div className="stat-icon">💻</div>
                                        <div>
                                            <div className="stat-label">
                                                Matériel donné
                                            </div>
                                            <div className="stat-value">
                                                {selectedRegion.donations}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="stat-box">
                                        <div className="stat-icon">🏫</div>
                                        <div>
                                            <div className="stat-label">
                                                Écoles partenaires
                                            </div>
                                            <div className="stat-value">
                                                {selectedRegion.schools}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
