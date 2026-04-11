import { Suspense } from 'react';
import Search from '@/components/pages/search';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Search />
    </Suspense>
  );
}

// Made with Bob
