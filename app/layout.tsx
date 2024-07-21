import './globals.css';
import Header from '@/components/Header';
import type { Metadata } from 'next';
import { Nunito, Roboto } from 'next/font/google';

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
  title: 'Create Next App',
  description: 'Generated by create next app',
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
      </body>
    </html>
  );
}
