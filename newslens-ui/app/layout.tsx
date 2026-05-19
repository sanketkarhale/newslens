import type { Metadata } from "next";
import { Inter, Poppins, Space_Grotesk } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'], variable: '--font-poppins' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

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
      <body className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} bg-background text-on-surface antialiased min-h-screen font-sans overflow-x-hidden selection:bg-primary/30 selection:text-primary`}>
        {children}
      </body>
    </html>
  );
}
