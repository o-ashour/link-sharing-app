import type { Metadata } from 'next';
import '../index.css';
import { Instrument_Sans } from 'next/font/google';

const instrumentSans = Instrument_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Link Sharing App',
  description: 'Web site created with Next.js.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={instrumentSans.className}>
      <body>{children}</body>
    </html>
  )
}