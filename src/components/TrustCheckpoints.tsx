import React from 'react';
import { Award, Truck, Locate, Star, CheckCircle2 } from 'lucide-react';

const CHECKPOINTS = [
  { icon: CheckCircle2, label: 'Seguro de carga incluido' },
  { icon: Truck, label: 'Camiones alfombrados' },
  { icon: Award, label: 'Habilitación CNRT' },
  { icon: Locate, label: 'Seguimiento satelital' },
  { icon: Star, label: '+20 años de trayectoria' },
] as const;

/** CRO trust strip — reduces anxiety above the fold */
export default function TrustCheckpoints() {
  return (
    <div className="bg-surface border-y border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <ul
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-8"
          aria-label="Garantías de confianza"
        >
          {CHECKPOINTS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-ink"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 border border-brand/20 text-brand">
                <Icon className="w-4 h-4" aria-hidden="true" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
