import UpdatePetFinder from '@/components/smart_pet/update-pet-finder';

export default async function Page({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] }>;
}) {
  const resolvedParams = await params;
  return <UpdatePetFinder params={resolvedParams} />;
}

// Made with Bob
