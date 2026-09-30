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

interface GoogleMapsNamespace {
  maps: {
    importLibrary: (library: string) => Promise<GoogleMapsPlacesLibrary>;
  };
}

declare global {
  interface Window {
    google?: GoogleMapsNamespace;
  }
}

let googleMapsPromise: Promise<void> | null = null;

function loadGoogleMaps(): Promise<void> {
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
    let cancelled = false;
    let places: GoogleMapsPlacesLibrary | null = null;
    let sessionToken: unknown;
    let requestId = 0;

    const input = inputRef.current;
    if (!input) return undefined;

    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.setAttribute('role', 'listbox');
    suggestionsContainer.className = 'absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-line bg-surface shadow-lg';
    suggestionsContainer.hidden = true;

    const wrapper = input.parentElement;
    if (!wrapper) return undefined;

    wrapper.appendChild(suggestionsContainer);

    const clearSuggestions = () => {
      suggestionsContainer.replaceChildren();
      suggestionsContainer.hidden = true;
    };

    const selectSuggestion = async (prediction: GoogleMapsPlacePrediction) => {
      clearSuggestions();

      try {
        const place = prediction.toPlace();
        await place.fetchFields({ fields: ['formattedAddress'] });

        if (cancelled) return;

        const address = place.formattedAddress?.trim() || prediction.text.toString().trim();
        if (!address) return;

        input.value = address;
        onChangeRef.current(address);
        onErrorRef.current?.();

        sessionToken = places ? new places.AutocompleteSessionToken() : undefined;
      } catch {
        if (!cancelled) onErrorRef.current?.();
      }
    };

    const renderSuggestions = (suggestions: GoogleMapsSuggestion[]) => {
      suggestionsContainer.replaceChildren();

      const predictions = suggestions
        .map((suggestion) => suggestion.placePrediction)
        .filter((prediction): prediction is GoogleMapsPlacePrediction => Boolean(prediction));

      if (!predictions.length) {
        suggestionsContainer.hidden = true;
        return;
      }

      predictions.forEach((prediction, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.role = 'option';
        button.tabIndex = -1;
        button.id = `quote-destination-option-${index}`;
        button.className = 'block w-full border-b border-line px-4 py-3 text-left text-sm text-ink last:border-b-0 hover:bg-background-soft focus:bg-background-soft focus:outline-none';
        button.textContent = prediction.text.toString();
        button.addEventListener('mousedown', (event) => event.preventDefault());
        button.addEventListener('click', () => { void selectSuggestion(prediction); });
        suggestionsContainer.appendChild(button);
      });

      suggestionsContainer.hidden = false;
    };

    const handleInput = async () => {
      const query = input.value.trim();
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

        places = await window.google.maps.importLibrary('places');
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
  }, []);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
  }, [value]);

  return inputRef;
}
