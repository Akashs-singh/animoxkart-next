'use client';
import { use } from 'react';
import FinderTag from '@/components/smart_pet/finder-tag';

export default function Page({
  params,
}: {
  params: Promise<{ tag_id: string }>;
}) {
  const resolvedParams = use(params);
  return <FinderTag key={resolvedParams.tag_id} params={resolvedParams} />;
}
