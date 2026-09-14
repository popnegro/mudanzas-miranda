import { useEffect, useState } from 'react';

export function useHeroCarousel(length: number, intervalMs = 5000) {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (length <= 1) return;

    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [length, intervalMs]);

  const previous = () => {
    setHeroIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  const next = () => {
    setHeroIndex((prev) => (prev + 1) % length);
  };

  return { heroIndex, setHeroIndex, previous, next };
}
