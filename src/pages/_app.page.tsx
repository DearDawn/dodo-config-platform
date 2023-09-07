import type { AppProps } from 'next/app';
import '@/app/globals.css';
import { AppWrapper } from '@/store';
import { ModalRoot } from '@/layout/modalRoot';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
      <ModalRoot />
    </AppWrapper>
  );
}
