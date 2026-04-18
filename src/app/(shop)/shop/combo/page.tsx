import CollectionCombo from '@/components/collection/collection-combo';
import { Metadata } from 'next';
import { getAbsoluteUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Combo Deals - Pet Product Bundles | Animoxkart',
  description: 'Save more with our combo deals! Get matching collars, leashes, and accessories in bundle packs. Perfect pet product combinations at discounted prices.',
  keywords: 'pet combo deals, dog collar leash set, pet bundle packs, combo offers, pet accessories bundle, dog product sets India',
  openGraph: {
    title: 'Combo Deals - Pet Product Bundles | Animoxkart',
    description: 'Save more with our combo deals! Get matching collars, leashes, and accessories in bundle packs at discounted prices.',
    type: 'website',
    url: getAbsoluteUrl('/shop/combo'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Combo Deals - Pet Product Bundles | Animoxkart',
    description: 'Save more with our combo deals! Get matching collars, leashes, and accessories in bundle packs.',
  },
  alternates: {
    canonical: getAbsoluteUrl('/shop/combo'),
  },
};

export default function Page() {
  return <CollectionCombo />;
}

// Made with Bob
