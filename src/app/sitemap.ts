import { MetadataRoute } from 'next';
import axios from 'axios';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://animoxkart.in';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop/regular`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop/premium`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop/combo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop/mega-combo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop/offers`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pet-finder-tag`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  try {
    // Fetch all products for dynamic URLs
    const productsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_NEW}/products`);
    const products = productsResponse.data || [];

    // Generate product URLs
    const productPages: MetadataRoute.Sitemap = products.map((product: any) => ({
      url: `${baseUrl}/view/product/${product.id}/${product.name?.replace(/\s+/g, '-').toLowerCase()}`,
      lastModified: new Date(product.updated_at || product.created_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Fetch all blogs
    const blogsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getAllBlogs`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
    const blogs = blogsResponse.data || [];

    // Generate blog URLs
    const blogPages: MetadataRoute.Sitemap = blogs.map((blog: any) => ({
      url: `${baseUrl}/blog/${blog.id}/${blog.title?.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(blog.date || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Generate category URLs
    const categories = ['leash', 'collar', 'harness', 'rope', 'body-belt'];
    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${baseUrl}/product/${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    }));

    return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static pages if product fetch fails
    return staticPages;
  }
}

// Made with Bob
