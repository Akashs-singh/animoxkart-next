import Collection from '@/components/collection/collection';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
  const slug = resolvedParams.slug as string[];
  
  // Validate slug
  if (!slug || !Array.isArray(slug) || slug.length === 0 || slug.length > 2) {
    return {
      title: 'Page Not Found | Animoxkart',
      description: 'The page you are looking for does not exist.',
    };
  }
  
  // Handle both /products/collar and /products/dog/collar
  const isPetSpecific = slug.length === 2;
  const petType = isPetSpecific ? slug[0] : null;
  const categoryName = isPetSpecific ? slug[1] : slug[0];
  
  // Validate pet type if specified
  const validPets = ['dog', 'cat'];
  if (petType && !validPets.includes(petType)) {
    return {
      title: 'Page Not Found | Animoxkart',
      description: 'The page you are looking for does not exist.',
    };
  }
  
  const categoryTitles: { [key: string]: string } = {
    'leash': 'Leashes',
    'collar': 'Collars',
    'harness': 'Harnesses',
    'rope': 'Ropes',
    'body-belt': 'Body Belts',
    'chain': 'Chains',
  };

  const petTitles: { [key: string]: string } = {
    'dog': 'Dog',
    'cat': 'Cat',
  };

  const categoryTitle = categoryTitles[categoryName] || categoryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const petTitle = petType ? petTitles[petType] || petType.charAt(0).toUpperCase() + petType.slice(1) : '';
  const title = petTitle ? `${petTitle} ${categoryTitle}` : categoryTitle;
  const description = petTitle 
    ? `Shop premium ${title.toLowerCase()} at Animoxkart. High-quality pet accessories for your beloved ${petType}.`
    : `Shop ${title} at Animoxkart - Premium pet products for dogs and cats.`;

  const urlPath = isPetSpecific ? `/products/${petType}/${categoryName}` : `/products/${categoryName}`;

  return {
    title: `${title} | Animoxkart - Premium Pet Products`,
    description,
    keywords: `${title}, pet accessories, ${categoryName}, pet products, pet supplies${petType ? `, ${petType} ${categoryName}` : ''}`,
    openGraph: {
      title: `${title} | Animoxkart`,
      description,
      type: 'website',
      url: getAbsoluteUrl(urlPath),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Animoxkart`,
      description,
    },
    alternates: {
      canonical: getAbsoluteUrl(urlPath),
    },
  };
}

export async function generateStaticParams() {
  const tags = await getCatalogTags();
  const petTypes = ['dog', 'cat'];

  const params: { slug: string[] }[] = [];
  
  // Generate params for /products/[category]
  tags
    .filter((tag: any) => typeof tag?.name === 'string' && tag.name.trim() !== '')
    .forEach((tag: any) => {
      params.push({
        slug: [tag.name.toLowerCase()],
      });
    });

  // Generate params for /products/[pet]/[category]
  petTypes.forEach(petType => {
    tags
      .filter((tag: any) => typeof tag?.name === 'string' && tag.name.trim() !== '')
      .forEach((tag: any) => {
        params.push({
          slug: [petType, tag.name.toLowerCase()],
        });
      });
  });

  return params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] }>;
}) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug as string[];
    
    // Validate slug
    if (!slug || !Array.isArray(slug) || slug.length === 0 || slug.length > 2) {
      notFound();
    }
    
    // Handle both /products/collar and /products/dog/collar
    const isPetSpecific = slug.length === 2;
    const petType = isPetSpecific ? slug[0] : null;
    const categoryName = isPetSpecific ? slug[1] : slug[0];
    
    // Validate category name
    if (!categoryName || categoryName.trim() === '') {
      notFound();
    }
    
    // Validate pet type if specified
    const validPets = ['dog', 'cat'];
    if (petType && !validPets.includes(petType)) {
      notFound();
    }
    
    const [products, tags] = await Promise.all([getCatalogProducts(), getCatalogTags()]);
    
    // Get category products
    let categoryProducts = getCategoryProducts(products, categoryName);
    
    // Filter by pet type if specified
    if (petType) {
      categoryProducts = categoryProducts.filter((product: any) =>
        product.pet?.toLowerCase() === petType.toLowerCase()
      );
    }

    return (
      <Collection
        params={{ ...resolvedParams, category_name: categoryName, ...(petType && { pet: petType }) }}
        initialProducts={categoryProducts}
        initialCategoryTag={getCategoryTag(tags, categoryName)}
      />
    );
  } catch (error) {
    console.error('Error loading products page:', error);
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>Unable to load products</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
}

export const revalidate = 3600;
export const dynamicParams = true;
// Made with Bob