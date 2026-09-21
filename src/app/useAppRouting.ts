import { useCallback, useEffect, useMemo, useState } from 'react';
import { destinations } from '../data/destinations';
import { servicePages } from '../data/seoPages';

type Destination = (typeof destinations)[number];
type ServicePage = (typeof servicePages)[number];

export function useAppRouting() {
  const [activePage, setActivePage] = useState('');

  const resolvePath = useCallback(() => {
    const path = window.location.pathname;
    const htmlMatch = path.match(/\/mudanzas-mendoza\/(mudanzas-[a-z-]+)\.html/);
    const serviceMatch = path.match(/\/servicios\/([a-z-]+)\.html/);
    const simpleMatch = path.match(/^\/([a-z-]+)(\.html)?$/);

    const slugCandidate = htmlMatch?.[1] ?? serviceMatch?.[1] ?? simpleMatch?.[1] ?? '';

    if (destinations.some((item) => item.slug === slugCandidate)) return slugCandidate;
    if (servicePages.some((item) => item.slug === slugCandidate)) return slugCandidate;
    if (slugCandidate === 'nosotros') return 'nosotros';
    if (slugCandidate === 'servicios') return 'servicios';
    if (slugCandidate === 'destinos') return 'destinos';
    return '';
  }, []);

  useEffect(() => {
    const handleUrlChange = () => setActivePage(resolvePath());
    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [resolvePath]);

  const navigate = useCallback((slug: string) => {
    setActivePage(slug);
    let newPath = '/';
    if (slug) {
      if (destinations.some((item) => item.slug === slug)) {
        newPath = `/mudanzas-mendoza/${slug}.html`;
      } else if (servicePages.some((item) => item.slug === slug)) {
        newPath = `/servicios/${slug}.html`;
      } else if (slug === 'nosotros') {
        newPath = '/nosotros.html';
      } else if (slug === 'servicios') {
        newPath = '/servicios/';
      } else if (slug === 'destinos') {
        newPath = '/destinos/';
      }
    }
    window.history.pushState({}, '', newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const currentDestination = useMemo<Destination | undefined>(
    () => destinations.find((item) => item.slug === activePage),
    [activePage],
  );

  const currentService = useMemo<ServicePage | undefined>(
    () => servicePages.find((item) => item.slug === activePage),
    [activePage],
  );

  return { activePage, currentDestination, currentService, navigate };
}
