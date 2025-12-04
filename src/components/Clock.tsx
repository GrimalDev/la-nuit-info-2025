"use client";

import { useEffect, useState } from "react";

export default function Clock() {
    const [time, setTime] = useState<string>("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // setMounted(true);
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? "PM" : "AM";
            const displayHours = hours % 12 || 12;
            const displayMinutes = minutes.toString().padStart(2, "0");
            setTime(`🔊 ${displayHours}:${displayMinutes} ${ampm}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span
            className="time text-uppercase"
            // style={{ visibility: mounted ? "visible" : "hidden" }}
        >
            {time || "🔊 --:-- PM"}
        </span>
    );
}
