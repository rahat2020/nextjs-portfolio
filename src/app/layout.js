import { Geist, Unbounded } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { siteConfig } from "@/lib/seo/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Kazi Rahat - Portfolio",
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: "Kazi Rahat - Portfolio",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          {children}
          {/* <GoToTop /> */}
        </Suspense>
      </body>
    </html>
  );
}
