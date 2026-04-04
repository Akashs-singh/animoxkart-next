import ViewPet from '@/components/smart_pet/view-pet';

export default async function Page({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] }>;
}) {
  const resolvedParams = await params;
  return <ViewPet params={resolvedParams} />;
}

// Made with Bob
