
import type { Metadata } from 'next'
import PetsPage from '@/components/layouts/pets/main'

export const metadata: Metadata = {
  title: 'Animoxkart - Premium Dog Collars, Leashes & Harnesses Online India',
  description:
    'Shop premium dog collars, leashes, harnesses & accessories at Animoxkart. High-quality pet products with free shipping across India. Stylish, durable & comfortable for your pets.',
  keywords: 'dog collars India, dog leashes online, dog harness, pet accessories, dog products India, pet store online, Animoxkart, dog collar leash set',
  openGraph: {
    title: 'Animoxkart - Premium Dog Collars, Leashes & Harnesses Online India',
    description: 'Shop premium dog & cat collars, leashes, harnesses & accessories. High-quality pet products with free shipping across India.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Animoxkart',
    images: [
      {
        url: 'https://animoxkart-products.s3.ap-south-1.amazonaws.com/home/460.jpg',
        width: 1200,
        height: 630,
        alt: 'Animoxkart - Premium Pet Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Animoxkart - Premium Dog & Cat Collars, Leashes & Harnesses',
    description: 'Shop premium dog & cat collars, leashes, harnesses & accessories. High-quality pet products with free shipping.',
    images: ['https://animoxkart-products.s3.ap-south-1.amazonaws.com/home/460.jpg'],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function Home() {
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Animoxkart',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: 'https://animoxkart-products.s3.ap-south-1.amazonaws.com/home/460.jpg',
    description: 'Premium pet products including dog and cat collars, leashes, harnesses, and accessories. Quality pet supplies with free shipping across India.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      // Add social media links here when available
    ],
  };

  // WebSite Schema with Search Action
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Animoxkart',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <PetsPage />
    </>
  );
}