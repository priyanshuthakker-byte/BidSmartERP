export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script src="/sw.js" />
      </head>
      <body>{children}</body>
    </html>
  )
}