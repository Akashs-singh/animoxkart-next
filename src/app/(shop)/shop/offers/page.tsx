import CollectionOffers from '@/components/collection/collection-offers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Special Offers & Deals - Pet Products on Sale | Animoxkart',
  description: 'Grab amazing deals on pet products! Limited time offers on dog and cat collars, leashes, harnesses, and accessories. Save big on premium pet supplies today.',
  keywords: 'pet product offers, dog accessories sale, pet deals India, discount pet products, pet supplies offers, dog and cat collar deals',
  openGraph: {
    title: 'Special Offers & Deals - Pet Products on Sale | Animoxkart',
    description: 'Grab amazing deals on pet products! Limited time offers on dog and cat collars, leashes, harnesses, and accessories.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/offers`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Special Offers & Deals - Pet Products on Sale | Animoxkart',
    description: 'Grab amazing deals on pet products! Limited time offers on premium pet supplies.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/offers`,
  },
};

export default function Page() {
  return <CollectionOffers />;
}

// Made with Bob
