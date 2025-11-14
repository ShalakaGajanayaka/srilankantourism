import Header from './Header';
import Footer from './Footer';
import { useBackToTop } from '../hooks/useBackToTop';

function Layout({ children }) {
  useBackToTop();

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;

