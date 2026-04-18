import BlogPage from '@/components/blogs/blog-page';
import { Metadata } from 'next';
import { getAbsoluteUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Pet Care Blog - Tips, Guides & Advice | Animoxkart',
  description: 'Read our pet care blog for expert tips, guides, and advice on dog training, nutrition, grooming, and health. Stay informed about the best pet care practices.',
  keywords: 'pet care blog, dog training tips, pet health advice, dog grooming guide, pet nutrition, dog care tips India',
  openGraph: {
    title: 'Pet Care Blog - Tips, Guides & Advice | Animoxkart',
    description: 'Read our pet care blog for expert tips, guides, and advice on dog training, nutrition, grooming, and health.',
    type: 'website',
    url: getAbsoluteUrl('/blogs'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Care Blog - Tips, Guides & Advice | Animoxkart',
    description: 'Expert pet care tips, guides, and advice for dog and cat parents.',
  },
  alternates: {
    canonical: getAbsoluteUrl('/blogs'),
  },
};

// Fetch blogs at build time with ISR (revalidate every hour)
async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAllBlogs`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      next: { revalidate: 3600 } // ISR: Revalidate every 60 minutes
    });

    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }

    const blogs = await res.json();
    
    // Sort blogs by date (newest first)
    const sortedBlogs = blogs.sort((a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Get recent and popular blogs (top 5)
    const recentBlogs = sortedBlogs.slice(0, 5);
    
    return {
      blogs: sortedBlogs,
      recentBlogs,
      popularBlogs: recentBlogs,
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      blogs: [],
      recentBlogs: [],
      popularBlogs: [],
    };
  }
}

export default async function Page() {
  const { blogs, recentBlogs, popularBlogs } = await getBlogs();
  
  return (
    <BlogPage
      initialBlogs={blogs}
      initialRecentBlogs={recentBlogs}
      initialPopularBlogs={popularBlogs}
    />
  );
}

// Enable ISR
export const revalidate = 3600; // Revalidate every 60 minutes

// Made with Bob
