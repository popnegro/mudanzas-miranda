import { useMemo } from 'react';
import { destinations, REGIONS } from '../data/destinations';
import { Destination } from '../types';

type RegionKey = typeof REGIONS[keyof typeof REGIONS];

export const useDestinations = () => {
  const regions = useMemo(() => {
    const grouped: Record<RegionKey, Destination[]> = {
      [REGIONS.GRAN_MENDOZA]: destinations.filter(d => d.region === REGIONS.GRAN_MENDOZA),
      [REGIONS.ZONA_ESTE_UCO]: destinations.filter(d => d.region === REGIONS.ZONA_ESTE_UCO),
      [REGIONS.ZONA_SUR]: destinations.filter(d => d.region === REGIONS.ZONA_SUR),
    };
    return Object.entries(grouped);
  }, []);

  return { regions };
};