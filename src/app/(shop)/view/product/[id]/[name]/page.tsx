import ViewProduct from '@/components/products/view-product';
import { Metadata } from 'next';
import axios from 'axios';

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
    const description = product?.description || `Buy ${productName} - High quality pet products at Animoxkart`;
    const imageUrl = product?.pictures?.[0] || '/assets/images/default-product.jpg';

    return {
      title: `${productName} | Animoxkart - Premium Pet Products`,
      description: description.substring(0, 160),
      keywords: `${productName}, pet products, dog accessories, cat accessories, pet supplies`,
      openGraph: {
        title: productName,
        description: description.substring(0, 160),
        images: [imageUrl],
        type: 'website',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/view/product/${id}/${name}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: productName,
        description: description.substring(0, 160),
        images: [imageUrl],
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/view/product/${id}/${name}`,
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
  return <ViewProduct params={resolvedParams} />;
}

// Made with Bob
