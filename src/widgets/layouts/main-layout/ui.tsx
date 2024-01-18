import type { PropsWithChildren } from 'react';
import { Footer } from '../../footer';
import { Header } from '../../header';

export const MainLayout = ({ children }: PropsWithChildren) => {

  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}