import { openSans } from '@/app/fonts';
import type { Metadata } from 'next';
import './globals.css';

import { ThemeProvider } from '@/app/material-tailwind';
import TanStackProvider from '@/app/providers/TanStackProvider';
import Dashboard from '@/app/ui/dashboard';

import 'react-toastify/dist/ReactToastify.css';
import Pwa from './Pwa';

export const metadata: Metadata = {
  title: 'Convo Assist',
  description:
    'This app helps support teams manager conversations with customer',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'nextjs13', 'next13', 'pwa', 'next-pwa'],
  authors: [{ name: 'Anshul Nema' }],
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png' },
    { rel: 'icon', url: 'icons/icon-128x128.png' },
  ],
};

export const viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Pwa />
        <ThemeProvider>
          <TanStackProvider>
            <Dashboard>{children}</Dashboard>
          </TanStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
