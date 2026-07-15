import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Layout and loading components
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import CookieBanner from './components/CookieBanner';
import WhatsAppWidget from './components/WhatsAppWidget';
const Loading = () => <div className="text-center p-8">Cargando...</div>;

// Page components
const ServicesLayout = lazy(() => import('./components/ServicesLayout'));
const HomePage = lazy(() => import('./pages/HomePage'));
const About = lazy(() => import('./pages/About'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ResidentialMoves = lazy(() => import('./pages/ResidentialMoves'));
const CorporateMoves = lazy(() => import('./pages/CorporateMoves'));
const NationalMoves = lazy(() => import('./pages/NationalMoves'));
const LocalMoves = lazy(() => import('./pages/LocalMoves'));
const Packing = lazy(() => import('./pages/Packing'));
const Storage = lazy(() => import('./pages/Storage'));
const Coverage = lazy(() => import('./pages/Coverage'));
const FaqsPage = lazy(() => import('./pages/FaqsPage'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const QuotePage = lazy(() => import('./pages/QuotePage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const DestinosPage = lazy(() => import('./pages/DestinosPage'));
const DestinoPage = lazy(() => import('./pages/DestinoPage'));

// NotFoundPage is special, we can import it directly or lazy load it as well.
// For the 404 page, direct import is fine as it's small.
import { NotFoundPage } from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#0A0A0A] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
        <Header />
        <Breadcrumbs />
        <main className="flex-grow">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/nosotros" element={<About />} />
              {/* --- Nested Service Routes --- */}
              <Route path="/servicios" element={<ServicesLayout />}>
                <Route index element={<ServicesPage />} />
                <Route path="mudanzas-residenciales" element={<ResidentialMoves />} />
                <Route path="mudanzas-corporativas" element={<CorporateMoves />} />
                <Route path="mudanzas-nacionales" element={<NationalMoves />} />
                <Route path="mudanzas-locales" element={<LocalMoves />} />
                <Route path="embalaje-profesional" element={<Packing />} />
                <Route path="guardamuebles" element={<Storage />} />
              </Route>
              <Route path="/cobertura" element={<Coverage />} />
              <Route path="/preguntas-frecuentes" element={<FaqsPage />} />
              <Route path="/casos-de-exito" element={<SuccessStories />} />
              <Route path="/galeria" element={<Gallery />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/cotizacion" element={<QuotePage />} />
              <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
              <Route path="/terminos-y-condiciones" element={<Terms />} />
              <Route path="/destinos" element={<DestinosPage />} />
              <Route path="/destinos/:slug" element={<DestinoPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieBanner />
        <WhatsAppWidget />
      </div>
    </HelmetProvider>
  );
};

export default App;
