import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const display = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
});

const text = DM_Sans({
  variable: "--font-text",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wilkandwilk.com"),
  title: "Wilk & Wilk Orthodontics | Cambridge, Ontario",
  description:
    "Specialist orthodontic care, braces, and Invisalign treatment for children, teens, and adults in Cambridge, Ontario.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wilk & Wilk Orthodontics",
    description:
      "A warm, precise approach to specialist orthodontic care in Cambridge.",
    url: "/",
    siteName: "Wilk & Wilk Orthodontics",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${text.variable}`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
