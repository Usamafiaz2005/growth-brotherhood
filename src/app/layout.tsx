import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navigation/Navbar';
import CustomCursor from '@/components/cursor/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ConsoleFilter from '@/components/utils/ConsoleFilter';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Footer from '@/components/layout/Footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Growth Brotherhood — Digital Experiences & Growth Systems',
  description:
    'We build digital systems that drive measurable growth. Web development, AI automation, digital marketing and brand identity for ambitious businesses.',
  keywords: ['digital agency', 'web development', 'AI automation', 'growth marketing', 'brand identity', 'Growth Brotherhood'],
  authors: [{ name: 'Growth Brotherhood' }],
  openGraph: {
    title: 'Growth Brotherhood — Digital Experiences & Growth Systems',
    description: 'We build digital systems that drive measurable growth.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Growth Brotherhood',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Growth Brotherhood',
    description: 'Digital Experiences × Growth Systems',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-gb-black text-gb-offwhite antialiased overflow-x-hidden" suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <ConsoleFilter />
        <CustomCursor />
        <Navbar />
        <SmoothScroll>
          <main id="main-content">{children}</main>
        </SmoothScroll>
        <Footer />
        <ScrollProgress />
      </body>
    </html>
  );
}
