export interface ThemeConfig {
  brand: { name: string; tagline: string };
  site: { domain: string; baseUrl: string; locale: string; city: string; province: string; country: string };
  contact: { whatsapp: string; whatsappUrl: string; phone?: string; email?: string };
  ecosystem?: { informationalUrl?: string; planningUrl?: string; providerUrl?: string };
}

/**
 * theme-mudanzas adoption contract.
 * Visual components remain site-owned; brand/domain/contact values live here
 * so the shared theme can be applied without copying another site's identity.
 */
export const themeConfig: ThemeConfig = {
  brand: {
    name: 'Mudanzas Miranda',
    tagline: 'Mudanzas y fletes profesionales en Mendoza',
  },
  site: {
    domain: 'mudanzasmiranda.com.ar',
    baseUrl: 'https://mudanzasmiranda.com.ar',
    locale: 'es-AR',
    city: 'Mendoza',
    province: 'Mendoza',
    country: 'Argentina',
  },
  contact: {
    whatsapp: '5492615130910',
    whatsappUrl: 'https://wa.me/5492615130910',
  },
  ecosystem: {
    informationalUrl: 'https://mudanzasmendoza.com.ar',
    planningUrl: 'https://mudanzapro.com.ar',
    providerUrl: 'https://mudanzasmiranda.com.ar',
  },
};
