import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EKH Grafisk | Design, trykk, skilt, dekor og profilering",
  description:
    "Din totalleverandør av design, trykk, skilt, dekor, profilering og nettsider i Molde, Hustadvika og Kristiansund. Siden 1898.",
  keywords: [
    "profilering",
    "trykksaker",
    "skilt",
    "dekor",
    "grafisk design",
    "bilfoliering",
    "nettsider",
    "Molde",
    "Hustadvika",
    "Kristiansund",
    "B2B",
  ],
  openGraph: {
    title: "EKH Grafisk | Din totalleverandør siden 1898",
    description:
      "Design og produksjon — fra idé til ferdig produkt. Alt av profilering, trykk, skilt og markedsmateriell for bedrifter.",
    type: "website",
    locale: "nb_NO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nb"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
