import CollectionMegaCombo from '@/components/collection/collection-mega-combo';
import { Metadata } from 'next';
import { getAbsoluteUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Mega Combo Deals - Complete Pet Care Bundles | Animoxkart',
  description: 'Get maximum savings with our mega combo deals! Complete pet care bundles with collars, leashes, harnesses, and more. Best value pet product packages in India.',
  keywords: 'mega combo deals, complete pet bundle, pet care package, dog accessories set, mega combo offers, pet product bundles India',
  openGraph: {
    title: 'Mega Combo Deals - Complete Pet Care Bundles | Animoxkart',
    description: 'Get maximum savings with our mega combo deals! Complete pet care bundles with collars, leashes, harnesses, and more.',
    type: 'website',
    url: getAbsoluteUrl('/shop/mega-combo'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mega Combo Deals - Complete Pet Care Bundles | Animoxkart',
    description: 'Get maximum savings with our mega combo deals! Complete pet care bundles at best prices.',
  },
  alternates: {
    canonical: getAbsoluteUrl('/shop/mega-combo'),
  },
};

export default function Page() {
  return <CollectionMegaCombo />;
}

// Made with Bob
