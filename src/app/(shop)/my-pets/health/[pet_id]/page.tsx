import PetHealthManager from '@/components/smart_pet/pet-health-manager';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ pet_id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  return (
    <PetHealthManager
      params={{
        pet_id:   resolvedParams.pet_id,
        pet_name: resolvedSearch.name  || '',
        breed:    resolvedSearch.breed || '',
      }}
    />
  );
}
