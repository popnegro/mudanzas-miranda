import { useEffect, useRef } from 'react';

interface GoogleMapsPlacePrediction {
  text: { toString: () => string };
  toPlace: () => GoogleMapsPlace;
}

interface GoogleMapsSuggestion {
  placePrediction?: GoogleMapsPlacePrediction;
}

interface GoogleMapsPlace {
  fetchFields: (options: { fields: string[] }) => Promise<void>;
  formattedAddress?: string;
}

interface GoogleMapsPlacesLibrary {
  AutocompleteSessionToken: new () => unknown;
  AutocompleteSuggestion: {
    fetchAutocompleteSuggestions: (request: {
      input: string;
      includedRegionCodes?: string[];
      includedPrimaryTypes?: string[];
      language?: string;
      region?: string;
      sessionToken?: unknown;
    }) => Promise<{ suggestions: GoogleMapsSuggestion[] }>;
  };
}

interface GoogleMapsGeocoderResult {
  formatted_address?: string;
}

interface GoogleMapsGeocodingLibrary {
  Geocoder: new () => {
    geocode: (
      request: { location: { lat: number; lng: number } },
      callback: (results: GoogleMapsGeocoderResult[] | null, status: string) => void,
    ) => void;
  };
}

interface GoogleMapsNamespace {
  maps: {
    importLibrary: (library: string) => Promise<GoogleMapsPlacesLibrary | GoogleMapsGeocodingLibrary>;
  };
}

declare global {
  interface Window {
    google?: GoogleMapsNamespace;
  }
}

let googleMapsPromise: Promise<void> | null = null;

export function loadGoogleMaps(): Promise<void> {
  if (window.google?.maps?.importLibrary) return Promise.resolve();

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
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = 'places';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google Maps API could not be loaded.'));
    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

/** Reverse-geocode WGS84 coordinates to a formatted address. */
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  await loadGoogleMaps();
  if (!window.google?.maps?.importLibrary) {
    throw new Error('Google Maps no disponible.');
  }

  const geocoding = (await window.google.maps.importLibrary('geocoding')) as GoogleMapsGeocodingLibrary;
  const geocoder = new geocoding.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results?.[0]?.formatted_address) {
        resolve(results[0].formatted_address);
        return;
      }
      reject(new Error('No se pudo obtener la dirección a partir de la ubicación.'));
    });
  });
}

interface AddressAutocompleteOptions {
  value: string;
  onChange: (value: string) => void;
  onError?: (message?: string) => void;
  /** Prefix for suggestion option element ids (default: quote-address). */
  idPrefix?: string;
}

export function useAddressAutocomplete({
  value,
  onChange,
  onError,
  idPrefix = 'quote-address',
}: AddressAutocompleteOptions) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onChangeRef = useRef(onChange);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    let cancelled = false;
    let places: GoogleMapsPlacesLibrary | null = null;
    let sessionToken: unknown;
    let requestId = 0;

    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.id = `${idPrefix}-suggestions`;
    suggestionsContainer.role = 'listbox';
    suggestionsContainer.className =
      'absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-auto rounded-xl border border-line bg-surface shadow-lg';
    suggestionsContainer.hidden = true;

    const parent = input.parentElement;
    if (parent) {
      const previousPosition = parent.style.position;
      if (!previousPosition || previousPosition === 'static') {
        parent.style.position = 'relative';
      }
      parent.appendChild(suggestionsContainer);
    }

    const clearSuggestions = () => {
      suggestionsContainer.innerHTML = '';
      suggestionsContainer.hidden = true;
    };

    const selectSuggestion = async (prediction: GoogleMapsPlacePrediction) => {
      try {
        const place = prediction.toPlace();
        await place.fetchFields({ fields: ['formattedAddress'] });
        const address = place.formattedAddress || prediction.text.toString();
        input.value = address;
        onChangeRef.current(address);
        clearSuggestions();
        input.focus();
      } catch {
        const fallback = prediction.text.toString();
        input.value = fallback;
        onChangeRef.current(fallback);
        clearSuggestions();
      }
    };

    const renderSuggestions = (suggestions: GoogleMapsSuggestion[]) => {
      clearSuggestions();
      const predictions = suggestions
        .map((item) => item.placePrediction)
        .filter((item): item is GoogleMapsPlacePrediction => Boolean(item));

      if (!predictions.length) {
        suggestionsContainer.hidden = true;
        return;
      }

      predictions.forEach((prediction, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.role = 'option';
        button.tabIndex = -1;
        button.id = `${idPrefix}-option-${index}`;
        button.className =
          'block w-full border-b border-line px-4 py-3 text-left text-sm text-ink last:border-b-0 hover:bg-background-soft focus:bg-background-soft focus:outline-none';
        button.textContent = prediction.text.toString();
        button.addEventListener('mousedown', (event) => event.preventDefault());
        button.addEventListener('click', () => {
          void selectSuggestion(prediction);
        });
        suggestionsContainer.appendChild(button);
      });

      suggestionsContainer.hidden = false;
    };

    const handleInput = async () => {
      const raw = input.value;
      onChangeRef.current(raw);

      const query = raw.trim();
      const currentRequestId = ++requestId;

      if (query.length < 3 || !places) {
        clearSuggestions();
        return;
      }

      try {
        const { suggestions } = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: query,
          includedRegionCodes: ['ar'],
          language: 'es',
          region: 'ar',
          sessionToken,
        });

        if (!cancelled && currentRequestId === requestId) {
          renderSuggestions(suggestions);
        }
      } catch {
        if (!cancelled) clearSuggestions();
      }
    };

    const handleBlur = () => {
      window.setTimeout(clearSuggestions, 150);
    };

    const initialize = async () => {
      try {
        await loadGoogleMaps();
        if (cancelled || !window.google?.maps?.importLibrary) return;

        places = (await window.google.maps.importLibrary('places')) as GoogleMapsPlacesLibrary;
        sessionToken = new places.AutocompleteSessionToken();
        input.addEventListener('input', handleInput);
        input.addEventListener('blur', handleBlur);
      } catch {
        if (!cancelled) onErrorRef.current?.();
      }
    };

    void initialize();

    return () => {
      cancelled = true;
      input.removeEventListener('input', handleInput);
      input.removeEventListener('blur', handleBlur);
      suggestionsContainer.remove();
    };
  }, [idPrefix]);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
  }, [value]);

  return inputRef;
}
