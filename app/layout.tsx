import type { Metadata } from "next";
import {IBM_Plex_Serif, Inter} from "next/font/google" ;
import localFont from "next/font/local";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
})

export const metadata: Metadata = {
  title: "Carbon Reducer",
  description: "Carbon Reducer is a modern platform for everyone.",
  /*icons: {
    icon: '/icons/logo.svg'
  }*/
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>{children}</body>
    </html>
  );
}
