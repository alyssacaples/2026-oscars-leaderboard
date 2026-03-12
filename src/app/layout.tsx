import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Oscar Pool Leaderboard',
  description: 'Live leaderboard for the 2026 Academy Awards',
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
