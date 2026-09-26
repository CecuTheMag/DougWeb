import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Doug: every call answered, only the right ones reach you.";

const font = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

/** The share image, in the site's own type and palette. Rendered at build time. */
export async function renderOg() {
  const [serif, serifItalic, sans] = await Promise.all([
    font("instrument-serif", "instrument-serif-latin-400-normal.woff"),
    font("instrument-serif", "instrument-serif-latin-400-italic.woff"),
    font("inter-tight", "inter-tight-latin-500-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0b0b0c",
          color: "#f4f1ea",
          fontFamily: "Inter Tight",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "Instrument Serif", fontSize: 44, letterSpacing: -1 }}>Doug</span>
          <span style={{ fontSize: 20, letterSpacing: 3, color: "#a39d93", textTransform: "uppercase" }}>
            An assistant for your phone
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Instrument Serif", lineHeight: 1.02 }}>
          <span style={{ fontSize: 104, letterSpacing: -2.5 }}>Every call answered.</span>
          <span style={{ fontSize: 104, letterSpacing: -2.5, fontStyle: "italic", color: "#a39d93" }}>
            Only the right ones reach you.
          </span>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 22 }}>
          <span style={{ padding: "8px 20px", borderRadius: 999, background: "#d0848c", color: "#0b0b0c" }}>
            Put through
          </span>
          <span style={{ padding: "8px 20px", borderRadius: 999, border: "1px solid #f4f1ea" }}>Message taken</span>
          <span style={{ padding: "8px 20px", borderRadius: 999, border: "1px solid #5c574f", color: "#a39d93" }}>
            Declined: spam
          </span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "Inter Tight", data: sans, style: "normal", weight: 500 },
      ],
    },
  );
}
