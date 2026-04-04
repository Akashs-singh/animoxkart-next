import Register from '@/components/pages/register';

export default async function Page({
  params,
}: {
  params: Promise<{ cashback?: string[] }>;
}) {
  const resolvedParams = await params;
  return <Register params={resolvedParams} />;
}

// Made with Bob
