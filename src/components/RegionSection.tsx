import React from 'react';
import { Destination } from '../types';
import DestinationCard from './DestinationCard';

interface RegionSectionProps {
  regionName: string;
  destinations: Destination[];
}

const RegionSection: React.FC<RegionSectionProps> = React.memo(({ regionName, destinations }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-serif font-bold text-amber-500 mb-6 border-b border-white/10 pb-3">{regionName}</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {destinations.map(dest => <DestinationCard key={dest.slug} destination={dest} />)}
    </div>
  </div>
));

export default RegionSection;