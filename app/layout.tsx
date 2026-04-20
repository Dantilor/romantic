import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { SITE } from "@/data/site";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE.brand.title,
  description: SITE.brand.eyebrow,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#FBF7F2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
