
import type { Metadata } from 'next'
import PetsPage from '@/components/layouts/pets/main'

export const metadata: Metadata = {
  title: 'Animoxkart | Pet Store - Outfit your pet in style!',
  description:
    'Discover a world of comfort and style for your loveable pets at Animoxkart. Explore our exclusive collection of dog products which includes dog harness, leash and collar.',
  keywords: ['pet store', 'dog harness', 'dog leash', 'dog collar', 'Animoxkart'],
  openGraph: {
    title: 'Animoxkart | Pet Store',
    description: 'Outfit your pet in style with Animoxkart!',
    images: [
      {
        url: 'https://animoxkart-products.s3.ap-south-1.amazonaws.com/home/460.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function Home() {
  return <PetsPage />
}