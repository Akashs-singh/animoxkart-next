import ViewProduct from '@/components/products/view-product';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) {
  const resolvedParams = await params;
  return <ViewProduct params={resolvedParams} />;
}

// Made with Bob
