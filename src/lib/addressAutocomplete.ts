import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google?: typeof google;
  }
}

let googleMapsPromise: Promise<void> | null = null;

function loadGoogleMaps(): Promise<void> {
  if (window.google?.maps?.places) return Promise.resolve();

  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  if (!key) return Promise.reject(new Error('Google Maps API key not configured.'));

  if (googleMapsPromise) return googleMapsPromise;

  googleMapsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-google-maps="places"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Google Maps API could not be loaded.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places&v=weekly`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = 'places';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google Maps API could not be loaded.'));
    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

interface AddressAutocompleteOptions {
  value: string;
  onChange: (value: string) => void;
  onError?: (message?: string) => void;
}

export function useAddressAutocomplete({ value, onChange, onError }: AddressAutocompleteOptions) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onChangeRef = useRef(onChange);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onChangeRef.current = onChange;
    onErrorRef.current = onError;
  }, [onChange, onError]);

  useEffect(() => {
    let autocomplete: google.maps.places.Autocomplete | null = null;
    let listener: google.maps.MapsEventListener | null = null;
    let cancelled = false;

    loadGoogleMaps()
      .then(() => {
        if (cancelled || !inputRef.current || !window.google?.maps?.places) return;

        autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: 'ar' },
          fields: ['formatted_address', 'geometry', 'name'],
          types: ['address'],
        });

        listener = autocomplete.addListener('place_changed', () => {
          const place = autocomplete?.getPlace();
          const address = place?.formatted_address?.trim();

          if (address) {
            onChangeRef.current(address);
            onErrorRef.current?.();
          }
        });
      })
      .catch(() => {
        if (!cancelled) onErrorRef.current?.();
      });

    return () => {
      cancelled = true;
      listener?.remove();
    };
  }, []);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
  }, [value]);

  return inputRef;
}
