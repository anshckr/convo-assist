import { openSans } from '@/app/fonts';
import type { Metadata } from 'next';
import './globals.css';

import { ThemeProvider } from '@/app/material-tailwind';
import TanStackProvider from '@/app/providers/TanStackProvider';
import Dashboard from '@/app/ui/dashboard';

import 'react-toastify/dist/ReactToastify.css';

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
    <html lang="en">
      <body className={openSans.className}>
        <ThemeProvider>
          <TanStackProvider>
            <Dashboard>{children}</Dashboard>
          </TanStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
