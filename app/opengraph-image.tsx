import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        color: "white",
        background: "linear-gradient(135deg, #052e2b 0%, #064e45 58%, #157f64 100%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", fontSize: 28, fontWeight: 700 }}>
        HEALTH <span style={{ color: "#86d7a8", marginLeft: 8 }}>enLIGHT</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
        <div style={{ color: "#86d7a8", fontSize: 24, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
          Health literacy in action
        </div>
        <div style={{ marginTop: 22, fontSize: 68, lineHeight: 1.08, fontWeight: 700 }}>
          Enlightening Communities, Transforming Health
        </div>
        <div style={{ marginTop: 24, fontSize: 26, color: "rgba(255,255,255,0.75)" }}>
          Evidence-based education, research and community engagement.
        </div>
      </div>
    </div>,
    size,
  );
}
