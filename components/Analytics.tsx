"use client";

import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || null,
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
      }),
    }).catch(() => {});
  }, []);

  return null;
}
