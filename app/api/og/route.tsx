// app/api/og/route.tsx
import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "سکس کالا";
  const description =
    searchParams.get("description") || "فروشگاه تخصصی محصولات جنسی";

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: "linear-gradient(to bottom, #1a1a2e, #16213e, #0f3460)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        fontFamily: "Vazirmatn, sans-serif",
      }}
    >
      {/* Logo / Brand */}
      <div
        style={{
          background: "linear-gradient(to right, #ec4899, #8b5cf6)",
          padding: "8px 24px",
          borderRadius: "12px",
          marginBottom: "20px",
          color: "white",
          fontSize: "24px",
        }}
      >
        سکس کالا
      </div>

      {/* Title */}
      <h1
        style={{
          color: "white",
          fontSize: "56px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "16px",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>

      {/* Description */}
      <p
        style={{
          color: "#cbd5e1",
          fontSize: "28px",
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
        {description}
      </p>

      {/* URL */}
      <div
        style={{
          marginTop: "30px",
          color: "#64748b",
          fontSize: "18px",
          borderTop: "1px solid #334155",
          paddingTop: "20px",
          width: "80%",
          textAlign: "center",
        }}
      >
        sexkala.com
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
