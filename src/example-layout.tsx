import { ClientBody } from './components/ClientBody'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClientBody>{children}</ClientBody>
    </html>
  )
} 