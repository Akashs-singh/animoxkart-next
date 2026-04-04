'use client';

import { IntlProvider } from 'react-redux-multilingual';
import { useAppSelector } from '@/store/hooks';

export default function IntlProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const intlData = useAppSelector((state) => state.Intl);

  return (
    <IntlProvider translations={intlData?.translations} locale={intlData?.locale}>
      {children}
    </IntlProvider>
  );
}

// Made with Bob
