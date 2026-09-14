import { useMemo, useState } from 'react';
import { destinations } from '../data/destinations';

export function useHomePageState() {
  const [activeServiceTab, setActiveServiceTab] = useState('residencial');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [destSearch, setDestSearch] = useState('');

  const filteredDestinations = useMemo(
    () => destinations.filter((destination) =>
      !destSearch ||
      destination.name.toLowerCase().includes(destSearch.toLowerCase()) ||
      destination.region.toLowerCase().includes(destSearch.toLowerCase()),
    ),
    [destSearch],
  );

  const regions = useMemo(
    () => ({
      'Gran Mendoza': filteredDestinations.filter((destination) => destination.region === 'Gran Mendoza'),
      'Zona Este y Valle de Uco': filteredDestinations.filter((destination) => destination.region === 'Zona Este y Valle de Uco'),
      'Sur de Mendoza': filteredDestinations.filter((destination) => destination.region === 'Sur de Mendoza'),
    }),
    [filteredDestinations],
  );

  return {
    activeServiceTab,
    setActiveServiceTab,
    openFaq,
    setOpenFaq,
    activeTestimonial,
    setActiveTestimonial,
    destSearch,
    setDestSearch,
    filteredDestinations,
    regions,
  };
}
