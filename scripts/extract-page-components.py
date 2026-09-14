from pathlib import Path

src = Path('src/AppLegacy.tsx').read_text()

header = """import React from 'react';\nimport { motion, AnimatePresence } from 'motion/react';\nimport { Award, Truck, ShieldCheck, Star, ChevronDown, Phone, Mail, MapPin, Clock, ArrowRight, Home, Building, Users, Package, Warehouse, CheckCircle2, Calendar, ArrowLeft, ChevronLeft, ChevronRight, Navigation, History, Target, Heart, Search, X } from 'lucide-react';\nimport { services, faqs, testimonials } from '../data/staticData';\nimport { servicePages } from '../data/seoPages';\nimport { destinations } from '../data/destinations';\nimport FormSection from '../components/FormSection';\nimport FleetShowcase from '../components/FleetShowcase';\n\nconst IconMap: Record<string, React.ComponentType<any>> = { Home, Building, Users, Package, Warehouse, Truck };\nconst HERO_CAROUSEL_SLIDES = [\n  { id: 'flota', src: '/img/mudanzas-miranda-camiones.webp', alt: 'Camiones profesionales de Mudanzas Miranda estacionados listos para brindar servicio en Mendoza.' },\n  { id: 'residencial', src: '/img/mudanzas-miranda-embalaje.webp', alt: 'Operarios realizando embalaje cuidadoso de muebles para una mudanza en un departamento de Mendoza.' },\n  { id: 'equipo', src: '/img/mudanzas-miranda-residencial.webp', alt: 'Equipo de estibadores de Mudanzas Miranda sonrientes al realizar una mudanza profesional en Mendoza.' },\n];\n"""

def block(start_marker, end_marker):
    start = src.index(start_marker)
    expr = src.index('            <motion.div', start)
    end = src.index(end_marker, expr)
    close = src.rfind('            </motion.div>', expr, end) + len('            </motion.div>')
    return src[expr:close]

home_jsx = block('/* ==================== HOMEPAGE VIEW ==================== */', '          ) : activePage === \'nosotros\' ? (')
about_jsx = block('/* ==================== NOSOTROS (ABOUT US) VIEW ==================== */', '          ) : currentService ? (')
service_jsx = block('/* ==================== SPECIALIZED SERVICE VIEW ==================== */', '          ) : (')
dest_start = src.index('/* ==================== LOCAL SEO DESTINATION VIEW ==================== */')
dest_expr = src.index('            <motion.div', dest_start)
dest_end_marker = src.index('          )}\n        </AnimatePresence>', dest_expr)
dest_jsx = src[src.index('            <motion.div', dest_expr):src.rfind('            </motion.div>', dest_expr, dest_end_marker) + len('            </motion.div>')]

Path('src/pages').mkdir(exist_ok=True)

Path('src/pages/HomePage.tsx').write_text(header + f'''\ninterface HomePageProps {{\n  activeServiceTab: string; setActiveServiceTab: React.Dispatch<React.SetStateAction<string>>;\n  openFaq: string | null; setOpenFaq: React.Dispatch<React.SetStateAction<string | null>>;\n  activeTestimonial: number; setActiveTestimonial: React.Dispatch<React.SetStateAction<number>>;\n  destSearch: string; setDestSearch: React.Dispatch<React.SetStateAction<string>>;\n  filteredDestinations: typeof destinations; regions: Record<string, typeof destinations>;\n  handleNavigation: (slug: string) => void; heroIndex: number;\n  setHeroIndex: React.Dispatch<React.SetStateAction<number>>; previousHero: () => void; nextHero: () => void;\n}}\nexport default function HomePage(props: HomePageProps) {{\n  const {{ activeServiceTab, setActiveServiceTab, openFaq, setOpenFaq, activeTestimonial, setActiveTestimonial, destSearch, setDestSearch, filteredDestinations, regions, handleNavigation, heroIndex, setHeroIndex, previousHero, nextHero }} = props;\n  return (\n{home_jsx}\n  );\n}}\n''')

Path('src/pages/AboutPage.tsx').write_text(header + f'''\ninterface AboutPageProps {{ handleNavigation: (slug: string) => void; }}\nexport default function AboutPage({{ handleNavigation }}: AboutPageProps) {{\n  return (\n{about_jsx}\n  );\n}}\n''')

Path('src/pages/ServicePage.tsx').write_text(header + f'''\ninterface ServicePageProps {{ currentService: (typeof servicePages)[number]; activePage: string; handleNavigation: (slug: string) => void; }}\nexport default function ServicePage({{ currentService, activePage, handleNavigation }}: ServicePageProps) {{\n  return (\n{service_jsx}\n  );\n}}\n''')

Path('src/pages/DestinationPage.tsx').write_text(header + f'''\ninterface DestinationPageProps {{ currentDestination: (typeof destinations)[number]; handleNavigation: (slug: string) => void; }}\nexport default function DestinationPage({{ currentDestination, handleNavigation }}: DestinationPageProps) {{\n  return (\n{dest_jsx}\n  );\n}}\n''')

print('Generated HomePage, AboutPage, ServicePage and DestinationPage from AppLegacy.tsx')
