import CollectionPremium from '@/components/collection/collection-premium';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium Collection - Luxury Pet Products | Animoxkart',
  description: 'Discover our premium collection of luxury pet products. High-end collars, leashes, harnesses, and accessories for discerning pet parents. Premium quality guaranteed.',
  keywords: 'premium pet products, luxury dog collars, designer pet accessories, high-end dog leashes, premium pet supplies India, luxury pet products',
  openGraph: {
    title: 'Premium Collection - Luxury Pet Products | Animoxkart',
    description: 'Discover our premium collection of luxury pet products. High-end collars, leashes, harnesses, and accessories for discerning pet parents.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/premium`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Collection - Luxury Pet Products | Animoxkart',
    description: 'Discover our premium collection of luxury pet products. High-end collars, leashes, harnesses, and accessories.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/premium`,
  },
};

export default function Page() {
  return <CollectionPremium />;
}

// Made with Bob
