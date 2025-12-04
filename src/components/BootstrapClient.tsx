"use client";
import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    // Dynamically load jQuery, Bootstrap, and w95.js on client side
    if (typeof window !== 'undefined') {
      // Load jQuery first
      const jqueryScript = document.createElement('script');
      jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      jqueryScript.integrity = 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=';
      jqueryScript.crossOrigin = 'anonymous';
      jqueryScript.onload = () => {
        // Load Bootstrap after jQuery
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js';
        bootstrapScript.integrity = 'sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct';
        bootstrapScript.crossOrigin = 'anonymous';
        bootstrapScript.onload = () => {
          // Load w95.js after Bootstrap is loaded
          const w95Script = document.createElement('script');
          w95Script.src = '/w95.js';
          document.body.appendChild(w95Script);
        };
        document.body.appendChild(bootstrapScript);
      };
      document.body.appendChild(jqueryScript);
    }
  }, []);
  return null;
}
