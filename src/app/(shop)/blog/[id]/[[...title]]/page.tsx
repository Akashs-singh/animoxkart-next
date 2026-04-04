// src/app/(shop)/blog/[id]/[[...title]]/page.tsx
import BlogDetails from '@/components/blogs/details'

// This runs SERVER SIDE — good for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; title?: string[] }>
}) {
  const { id } = await params
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/getBlogById?id=${id}`
  )
  const data = await res.json()
  const blog = data?.[0]

  return {
    title: blog?.title ?? 'Blog',
    description: blog?.short_description
      ?.replace(/<[^>]+>/g, '')
      .slice(0, 160) ?? '',
    openGraph: {
      title: blog?.title,
      images: [{ url: blog?.blog_image }],
    },
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string; title?: string[] }>
}) {
  const resolvedParams = await params
  return <BlogDetails params={resolvedParams} />
}