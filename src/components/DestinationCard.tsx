import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = React.memo(({ destination }) => (
  <Link to={`/destinos/${destination.slug}`} className="block p-4 bg-[#111111] border border-white/10 rounded-lg hover:border-amber-500/50 hover:bg-[#151515] transition-all group">
    <div className="flex items-center justify-between"><h3 className="font-semibold text-white">{destination.name}</h3><ArrowRight className="w-5 h-5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" /></div>
  </Link>
));

export default DestinationCard;