import { MetadataRoute } from 'next';
import CryptoJS from 'crypto-js';

// Function to fetch and decrypt products from API
async function getProductsFromAPI() {
  try {
    const response = await fetch('https://api.animoxkart.com/chunk', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`API response was not ok: ${response.status}`);
    }

    const { data, iv } = await response.json();
    const secret = 'animal-cat-dog-bird-fish-tree-su';

    const decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(secret), {
      iv: CryptoJS.enc.Base64.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decodedString = CryptoJS.enc.Utf8.stringify(decrypted);
    const decoded = JSON.parse(decodedString);
    return decoded;
  } catch (error) {
    console.error('❌ Error fetching or decrypting products:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.animoxkart.com';

  // Static pages with SEO priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
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
    // Fetch all products using encrypted API
    const products = await getProductsFromAPI();
    
    // Generate product URLs
    const productPages: MetadataRoute.Sitemap = products
      .filter((product: any) => product.id && product.name)
      .map((product: any) => {
        const slug = product.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        return {
          url: `${baseUrl}/view/product/${product.id}/${slug}`,
          lastModified: new Date(product.updated_at || product.created_at || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        };
      });

    console.log(`✅ Sitemap generated with ${productPages.length} products`);

    // Generate category URLs
    const categories = ['leash', 'collar', 'harness', 'rope', 'body-belt'];
    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${baseUrl}/product/${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.85,
    }));

    // Try to fetch blogs (optional, won't fail sitemap if it errors)
    let blogPages: MetadataRoute.Sitemap = [];
    try {
      const blogsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAllBlogs`, {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }
      });
      
      if (blogsResponse.ok) {
        const blogs = await blogsResponse.json();
        blogPages = blogs
          .filter((blog: any) => blog.id && blog.title)
          .map((blog: any) => {
            const slug = blog.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '');
            
            return {
              url: `${baseUrl}/blog/${blog.id}/${slug}`,
              lastModified: new Date(blog.date || new Date()),
              changeFrequency: 'monthly' as const,
              priority: 0.6,
            };
          });
      }
    } catch (blogError) {
      console.warn('⚠️ Could not fetch blogs for sitemap:', blogError);
    }

    return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    // Return static pages if product fetch fails
    return staticPages;
  }
}

// Revalidate sitemap every hour
export const revalidate = 3600;

// Made with Bob
