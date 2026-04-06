import FinderTag from '@/components/smart_pet/finder-tag';

export default async function Page({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] }>;
}) {
  const resolvedParams = await params;
  return <FinderTag params={resolvedParams} />;
}

// Made with Bob