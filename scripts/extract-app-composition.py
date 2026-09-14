from pathlib import Path
import re

p = Path('src/App.tsx')
s = p.read_text()

s = s.replace("import React, { useState, useEffect } from 'react';", "import React, { useState } from 'react';")
s = s.replace("import { servicePages } from './data/seoPages';", "import { servicePages } from './data/seoPages';\nimport { getPageSeo, useAppRouting, useHeroCarousel } from './app';")
s = s.replace("  const [activePage, setActivePage] = useState<string>(''); // empty string means main page, otherwise slug\n", "")
s = s.replace("  const [heroIndex, setHeroIndex] = useState(0);\n", "")
s = re.sub(r"\n  // Hero Image Carousel Auto-play\n  useEffect\(\(\) => \{.*?\n  \}, \[\]\);\n", "\n  const { heroIndex, setHeroIndex, previous: previousHero, next: nextHero } = useHeroCarousel(HERO_CAROUSEL_SLIDES.length);\n", s, flags=re.S)
pattern = r"\n  // Sync state with URL pathname on mount & popstate.*?\n  // Group destinations by region for display"
replacement = "\n  const { activePage, currentDestination, currentService, navigate: handleNavigation } = useAppRouting();\n\n  // Group destinations by region for display"
s, n = re.subn(pattern, replacement, s, flags=re.S)
if n != 1:
    raise SystemExit(f'Expected one routing block, found {n}')
seo_pattern = r"\n  // SEO details for active view.*?\n  return \("
seo_replacement = "\n  // SEO details for active view\n  const { title: pageTitle, description: pageDescription, canonicalUrl: pageCanonical } = getPageSeo(\n    activePage,\n    currentDestination,\n    currentService,\n  );\n\n  return ("
s, n = re.subn(seo_pattern, seo_replacement, s, flags=re.S)
if n != 1:
    raise SystemExit(f'Expected one SEO block, found {n}')
s = s.replace("setHeroIndex((prev) => (prev === 0 ? HERO_CAROUSEL_SLIDES.length - 1 : prev - 1));", "previousHero();")
s = s.replace("setHeroIndex((prev) => (prev + 1) % HERO_CAROUSEL_SLIDES.length);", "nextHero();")
p.write_text(s)
print('App composition extraction applied successfully')
