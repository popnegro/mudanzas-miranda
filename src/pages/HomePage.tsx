import React from 'react';
import { Hero } from '../components/sections/Hero';
import { TrustFeatures } from '../components/sections/TrustFeatures';
import { Services } from '../components/sections/Services';
import { Quote } from '../components/sections/Quote';
import { Faqs } from '../components/sections/Faqs';
import { Testimonials } from '../components/sections/Testimonials';


const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <TrustFeatures />
      <Services />
      <Quote />
      <Testimonials />
      <Faqs />
    </>
  );
};

export default HomePage;

