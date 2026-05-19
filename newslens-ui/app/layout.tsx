import type { Metadata } from "next";
import { Orbitron, Rajdhani, Chakra_Petch } from 'next/font/google';
import "./globals.css";

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const rajdhani = Rajdhani({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'], variable: '--font-rajdhani' });
const chakra = Chakra_Petch({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'], variable: '--font-chakra' });

export const metadata: Metadata = {
  title: "NewsLens - AI-Powered Global Intelligence",
  description: "The AI Layer Between You and Global Chaos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${orbitron.variable} ${rajdhani.variable} ${chakra.variable} bg-background text-on-surface antialiased min-h-screen font-sans overflow-x-hidden selection:bg-primary/30 selection:text-primary relative`}>
        {children}
      </body>
    </html>
  );
}
