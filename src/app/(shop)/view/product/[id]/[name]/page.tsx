import ViewProduct from '@/components/products/view-product';
import { Metadata } from 'next';
import axios from 'axios';
import { getAbsoluteUrl, getSiteUrl } from '@/lib/site-url';

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { id, name } = resolvedParams;

  try {
    // Fetch product data for metadata
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_NEW}/products/${id}`,
      {
        validateStatus: function (status) {
          return status < 500; // Resolve only if status is less than 500
        },
      }
    );
    
    // If product not found or error, use fallback metadata
    if (response.status !== 200 || !response.data) {
      throw new Error('Product not found');
    }

    const product = response.data;
    const productName = product?.name || name.replace(/-/g, ' ');
    const productPrice = product?.price ? `₹${product.price}` : '';
    const productCategory = product?.category || 'Pet Products';
    
    // Create SEO-optimized description
    let description = product?.description || `Buy ${productName} online at Animoxkart`;
    // Strip HTML tags if present
    description = description.replace(/<[^>]*>/g, '');
    // Ensure description is between 140-160 characters
    if (description.length > 160) {
      description = description.substring(0, 157) + '...';
    } else if (description.length < 140) {
      description = `${description}. Premium quality ${productCategory.toLowerCase()} at best prices. Free shipping across India.`;
      description = description.substring(0, 160);
    }
    
    const imageUrl = product?.pictures?.[0] || '/assets/images/default-product.jpg';
    
    // Create keyword-rich title
    const seoTitle = `${productName} ${productPrice ? `- ${productPrice}` : ''} | Buy Online India - Animoxkart`;

    return {
      title: seoTitle,
      description: description,
      keywords: `${productName}, buy ${productName} online, ${productCategory}, dog accessories India, pet products online, ${productName} price, pet supplies India`,
      openGraph: {
        title: `${productName} ${productPrice}`,
        description: description,
        images: [{
          url: imageUrl,
          width: 800,
          height: 600,
          alt: productName,
        }],
        type: 'website',
        url: getAbsoluteUrl(`/view/product/${id}/${name}`),
        siteName: 'Animoxkart',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${productName} ${productPrice}`,
        description: description,
        images: [imageUrl],
      },
      alternates: {
        canonical: getAbsoluteUrl(`/view/product/${id}/${name}`),
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    // Silently handle error and return fallback metadata
    const fallbackName = name.replace(/-/g, ' ');
    return {
      title: `${fallbackName} | Animoxkart`,
      description: `Buy ${fallbackName} - Premium pet products at Animoxkart`,
      keywords: `${fallbackName}, pet products, dog accessories, pet supplies`,
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) {
  const resolvedParams = await params;
  const { id, name } = resolvedParams;

  // Fetch product data for JSON-LD
  let productData = null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_NEW}/products/${id}`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (response.ok) {
      productData = await response.json();
    }
  } catch (error) {
    console.error('Error fetching product for JSON-LD:', error);
  }

  // Generate Product JSON-LD structured data
  const productJsonLd = productData ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productData.name,
    description: productData.description?.replace(/<[^>]*>/g, '').substring(0, 200),
    image: productData.pictures || [],
    brand: {
      '@type': 'Brand',
      name: 'Animoxkart',
    },
    offers: {
      '@type': 'Offer',
      url: getAbsoluteUrl(`/view/product/${id}/${name}`),
      priceCurrency: 'INR',
      price: productData.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: productData.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Animoxkart',
      },
    },
    aggregateRating: productData.rating ? {
      '@type': 'AggregateRating',
      ratingValue: productData.rating,
      reviewCount: productData.reviewCount || 1,
    } : undefined,
    sku: productData.id,
    category: productData.category,
  } : null;

  // Generate Breadcrumb JSON-LD
  const breadcrumbJsonLd = productData ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: getSiteUrl(),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: productData.category || 'Products',
        item: getAbsoluteUrl(`/product/${productData.category?.toLowerCase()}`),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: productData.name,
        item: getAbsoluteUrl(`/view/product/${id}/${name}`),
      },
    ],
  } : null;

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      <ViewProduct params={resolvedParams} />
    </>
  );
}

// Enable ISR
export const revalidate = 3600;

// Made with Bob
