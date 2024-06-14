import type { Metadata } from 'next';
import '../index.css';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}