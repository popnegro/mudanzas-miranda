import React, { lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Truck, Locate, Star, ChevronDown, Phone, MapPin, ArrowRight, Home, Building, Users, Package, ArrowLeft, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { services, faqs } from '../data/staticData';
import { HERO_CAROUSEL_SLIDES } from '../config/site';
import { servicePages } from '../data/seoPages';
import { trackEvent } from '../lib/analytics';
import { destinations } from '../data/destinations';
import FormSection from '../theme/components/FormSection';
import Hero from '../theme/components/Hero';
import Section from '../theme/components/Section';
import FleetShowcase from '../components/FleetShowcase';

const QuoteForm = lazy(() => import('../components/QuoteForm'));

const IconMap: Record<string, React.ComponentType<any>> = { Home, Building, Users, Package, Truck };
const HOME_SERVICE_EXCLUDED_IDS = new Set(['combinada', 'logistica']);
const homeServices = services.filter((service) => !HOME_SERVICE_EXCLUDED_IDS.has(service.id));
