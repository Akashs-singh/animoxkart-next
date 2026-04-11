import FAQ from '@/components/pages/faq';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) - Pet Products | Animoxkart',
  description: 'Find answers to common questions about our pet products, shipping, returns, and more. Get help with dog collars, leashes, harnesses, and pet accessories.',
  keywords: 'pet products FAQ, dog collar questions, pet accessories help, shipping information, return policy, pet product guide',
  openGraph: {
    title: 'FAQ - Pet Products | Animoxkart',
    description: 'Find answers to common questions about our pet products, shipping, returns, and more.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/pages/faq`,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/pages/faq`,
  },
};

export default function Page() {
  // FAQ Schema JSON-LD
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What types of pet products do you offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer a wide range of pet products including dog collars, leashes, harnesses, ropes, body belts, and various pet accessories. All products are available in regular, premium, and combo packages.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer free shipping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer free shipping across India on all orders. Delivery typically takes 3-7 business days depending on your location.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is your return policy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer a 7-day return policy on all products. Items must be unused and in original packaging. Please contact our customer support to initiate a return.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are your products suitable for all dog breeds?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our products come in various sizes to accommodate all dog breeds from small to large. Please check the size guide on each product page to find the perfect fit for your pet.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I choose the right size for my pet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each product page includes a detailed size guide. Measure your pet according to the instructions provided and select the appropriate size. If you need help, our customer support team is always ready to assist.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQ />
    </>
  );
}

// Made with Bob
