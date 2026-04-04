import Collection from '@/components/collection/collection';

export default async function Page({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] }>;
}) {
  const resolvedParams = await params;
  return <Collection params={resolvedParams} />;
}

// Made with Bob
