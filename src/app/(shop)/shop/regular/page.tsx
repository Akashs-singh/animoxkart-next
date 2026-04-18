import CollectionRegular from '@/components/collection/collection-regular';
import { Metadata } from 'next';
import { getAbsoluteUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Regular Collection - Affordable Pet Products | Animoxkart',
  description: 'Shop our regular collection of high-quality, affordable pet products including collars, leashes, harnesses, and accessories for dogs and cats. Best prices in India.',
  keywords: 'regular pet products, affordable dog collars, budget pet accessories, dog leashes India, pet supplies online, cheap pet products',
  openGraph: {
    title: 'Regular Collection - Affordable Pet Products | Animoxkart',
    description: 'Shop our regular collection of high-quality, affordable pet products including collars, leashes, harnesses, and accessories for dogs and cats.',
    type: 'website',
    url: getAbsoluteUrl('/shop/regular'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regular Collection - Affordable Pet Products | Animoxkart',
    description: 'Shop our regular collection of high-quality, affordable pet products including collars, leashes, harnesses, and accessories.',
  },
  alternates: {
    canonical: getAbsoluteUrl('/shop/regular'),
  },
};

export default function Page() {
  return <CollectionRegular />;
}

// Made with Bob
