import AddPetFinder from '@/components/smart_pet/add-pet-finder';

export default async function Page({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] }>;
}) {
  const resolvedParams = await params;
  return <AddPetFinder params={resolvedParams} />;
}

// Made with Bob
