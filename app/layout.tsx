import './globals.css';
import './icons.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import type { Metadata } from 'next';
import { Nunito, Roboto } from 'next/font/google';

dayjs.locale('it');

const nunito = Nunito({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-nunito',
});

const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Chiesa Grazia e Verità',
  description: 'Sito ufficiale della Chiesa Cristiana Evangelica "Grazia e Verità"',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='it'>
      <body className={`${roboto.variable} ${nunito.variable}`}>
        <Header />
        {children}
        <Analytics />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
