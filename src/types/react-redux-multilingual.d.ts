declare module 'react-redux-multilingual' {
  import { ComponentType } from 'react';

  export interface IntlState {
    locale: string;
    translations: Record<string, any>;
  }

  export function IntlReducer(state: IntlState | undefined, action: any): IntlState;

  export interface IntlProviderProps {
    translations: Record<string, any>;
    locale: string;
    children: React.ReactNode;
  }

  export const IntlProvider: ComponentType<IntlProviderProps>;

  export function translate(key: string): string;
  export function withTranslate(component: ComponentType<any>): ComponentType<any>;
}

// Made with Bob
