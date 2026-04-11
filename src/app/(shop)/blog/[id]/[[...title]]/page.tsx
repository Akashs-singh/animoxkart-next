// src/app/(shop)/blog/[id]/[[...title]]/page.tsx
import BlogDetails from '@/components/blogs/details'

// Generate static paths for all blogs at build time
export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAllBlogs`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    if (!res.ok) {
      return [];
    }

    const blogs = await res.json();

    // Generate params for each blog
    return blogs.map((blog: any) => ({
      id: blog.id.toString(),
      title: [blog.title.toLowerCase().replace(/\s+/g, '-')],
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Fetch blog data at build time
async function getBlogData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/getBlogById?id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 } // ISR: Revalidate every 60 minutes
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch blog');
    }

    const data = await res.json();
    return data?.[0] || null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; title?: string[] }>
}) {
  const { id } = await params;
  const blog = await getBlogData(id);

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${blog.title} | Animoxkart Blog`,
    description: blog.short_description
      ?.replace(/<[^>]+>/g, '')
      .slice(0, 160) ?? '',
    openGraph: {
      title: blog.title,
      description: blog.short_description?.replace(/<[^>]+>/g, '').slice(0, 160),
      images: [{ url: blog.blog_image }],
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author_name],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.short_description?.replace(/<[^>]+>/g, '').slice(0, 160),
      images: [blog.blog_image],
    },
  };
}

// Main page component with pre-fetched data
export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string; title?: string[] }>
}) {
  const resolvedParams = await params;
  const blog = await getBlogData(resolvedParams.id);

  return <BlogDetails params={resolvedParams} initialBlog={blog} />;
}

// Enable ISR - revalidate every 60 minutes
export const revalidate = 3600;

// Generate static pages for all blogs at build time
export const dynamicParams = true; // Allow new blogs to be generated on-demand