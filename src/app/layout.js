import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kazi Rahat - Portfolio",
  description:
    "Portfolio website of Kazi Rahat, a software developer specializing in web design, SEO, ERP development, and graphics design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
