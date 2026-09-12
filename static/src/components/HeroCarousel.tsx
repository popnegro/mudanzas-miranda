import React from 'react';

const HERO_SLIDES = [
  {
    image: '/images/flota-mudanzas-miranda-hero.webp',
    eyebrow: 'Mudanzas Miranda · Mendoza',
    title: 'Mudanzas en Mendoza',
    description: 'Trasladamos tu hogar o empresa con una experiencia clara, cuidada y coordinada.',
  },
];

export default function HeroCarousel() {
  const slide = HERO_SLIDES[0];

  return (
    <section className="hero-carousel" aria-label="Mudanzas Miranda">
      <div className="hero-carousel__slide">
        <img
          className="hero-carousel__image"
          src={slide.image}
          alt="Flota de Mudanzas Miranda circulando por Mendoza"
          fetchPriority="high"
        />
        <div className="hero-carousel__overlay" aria-hidden="true" />
        <div className="hero-carousel__content">
          <p className="hero-carousel__eyebrow">{slide.eyebrow}</p>
          <h1>{slide.title}</h1>
          <p className="hero-carousel__description">{slide.description}</p>
          <div className="hero-carousel__actions">
            <a className="hero-carousel__primary" href="#cotizar">Cotizar mi mudanza</a>
            <a className="hero-carousel__secondary" href="#contacto">Contactar por WhatsApp</a>
          </div>
        </div>
        <div className="hero-carousel__dots" aria-hidden="true">
          <span className="is-active" />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
