// src/app/(shop)/layout.tsx
import ShopLayoutClient from '@/components/layouts/ShopLayoutClient'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ShopLayoutClient>{children}</ShopLayoutClient>
}

// Made with Bob
