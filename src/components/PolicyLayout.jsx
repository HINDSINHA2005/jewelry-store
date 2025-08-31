import { useEffect } from "react";

export default function PolicyLayout({ title, lastUpdated = "2025-09-01", children }) {
  useEffect(() => {
    const prev = document.title;
    document.title = `${title} • Jewelora`;
    return () => (document.title = prev);
  }, [title]);

  return (
    <main style={{ maxWidth: 860, margin: "48px auto", padding: "0 16px", lineHeight: 1.65 }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>{title}</h1>
        <p style={{ margin: "6px 0 0", fontSize: 14, opacity: 0.8 }}>
          Last updated: {lastUpdated}
        </p>
      </header>

      <div
        style={{
          padding: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          background: "#fafafa",
          marginBottom: 24,
          fontSize: 14,
        }}
        aria-label="Legal disclaimer"
      >
        This page is provided for general information and does not constitute legal advice.
       
      </div>

      {/* Content */}
      <article>{children}</article>

      <footer style={{ marginTop: 40, fontSize: 14, opacity: 0.8 }}>
        Questions? Email{" "}
        <a href="info@jewelora.in" style={{ textDecoration: "underline" }}>
          info@jewelora.in
        </a>
      </footer>
    </main>
  );
}
