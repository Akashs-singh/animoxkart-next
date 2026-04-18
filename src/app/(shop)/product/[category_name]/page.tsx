import Collection from '@/components/collection/collection';
import { Metadata } from 'next';
import { getAbsoluteUrl } from '@/lib/site-url';
import {
  getCatalogProducts,
  getCatalogTags,
  getCategoryProducts,
  getCategoryTag,
} from '@/lib/catalog';

// Generate dynamic metadata for category pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryName = resolvedParams.category_name as string;
  
  const categoryTitles: { [key: string]: string } = {
    'leash': 'Dog Leashes',
    'collar': 'Dog Collars',
    'harness': 'Dog Harnesses',
    'rope': 'Dog Ropes',
    'body-belt': 'Dog Body Belts',
  };

  const categoryDescriptions: { [key: string]: string } = {
    'leash': 'Premium quality dog leashes for safe and comfortable walks. Available in various sizes and colors.',
    'collar': 'Stylish and durable dog collars. Perfect for everyday use and special occasions.',
    'harness': 'Comfortable dog harnesses designed for better control and safety during walks.',
    'rope': 'Strong and reliable dog ropes for training and outdoor activities.',
    'body-belt': 'Secure dog body belts for car travel and outdoor adventures.',
  };

  const title = categoryTitles[categoryName] || categoryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const description = categoryDescriptions[categoryName] || `Shop ${title} at Animoxkart - Premium pet products`;

  return {
    title: `${title} | Animoxkart - Premium Pet Products`,
    description,
    keywords: `${title}, dog accessories, cat accessories, pet products, ${categoryName}, pet supplies`,
    openGraph: {
      title: `${title} | Animoxkart`,
      description,
      type: 'website',
      url: getAbsoluteUrl(`/product/${categoryName}`),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Animoxkart`,
      description,
    },
    alternates: {
      canonical: getAbsoluteUrl(`/product/${categoryName}`),
    },
  };
}

export async function generateStaticParams() {
  const tags = await getCatalogTags();

  return tags
    .filter((tag: any) => typeof tag?.name === 'string' && tag.name.trim() !== '')
    .map((tag: any) => ({
      category_name: tag.name.toLowerCase(),
    }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] }>;
}) {
  const resolvedParams = await params;
  const categoryName = resolvedParams.category_name as string;
  const [products, tags] = await Promise.all([getCatalogProducts(), getCatalogTags()]);

  return (
    <Collection
      params={resolvedParams}
      initialProducts={getCategoryProducts(products, categoryName)}
      initialCategoryTag={getCategoryTag(tags, categoryName)}
    />
  );
}

export const revalidate = 3600;

// Made with Bob
