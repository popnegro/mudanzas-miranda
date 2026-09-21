export interface ThemeConfig {
  brand: { name: string; tagline: string };
  site: { role: 'informational' | 'planning' | 'provider'; domain: string; baseUrl: string; locale: string; city: string; province: string; country: string };
  shared: { primary: string; primaryDark: string; accent: string; surface: string; background: string; text: string; textSecondary: string; border: string };
  brandExpression: { primary: string; primaryDark: string; accent: string };
  ecosystem: { informationalUrl?: string; planningUrl?: string; providerUrl?: string };\n  brandRelationship?: { type: 'project' | 'platform'; label: string; parentName: string; parentUrl: string; googleRating?: { value: number; label: string } };
};

/** theme-mudanzas adoption contract. Shared structure/tokens; provider brand expression remains local. */
export const themeConfig: ThemeConfig = {
  brand: { name: 'Mudanzas Miranda', tagline: 'Mudanzas profesionales en Mendoza' },
  site: { role: 'provider', domain: 'mudanzasmiranda.com.ar', baseUrl: 'https://mudanzasmiranda.com.ar', locale: 'es-AR', city: 'Mendoza', province: 'Mendoza', country: 'Argentina' },
  shared: { primary: '#06434A', primaryDark: '#05373D', accent: '#07BE8A', surface: '#FFFFFF', background: '#FAF9F5', text: '#12383A', textSecondary: '#5F6B73', border: '#E2E8F0' },
  brandExpression: { primary: '#9A2D00', primaryDark: '#7B2400', accent: '#D98B00' },
  ecosystem: { informationalUrl: 'https://mudanzasmendoza.com.ar', planningUrl: 'https://mudanzapro.com.ar', providerUrl: 'https://mudanzasmiranda.com.ar' },
};
