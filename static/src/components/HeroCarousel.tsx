import React from 'react';

const HERO_SLIDES = [
  {
    image: '/images/flota-mudanzas-miranda-hero.webp',
    eyebrow: 'Mudanzas Miranda · Mendoza',
    title: 'Mudanzas en Mendoza',
    description: 'Trasladamos tu hogar o empresa con una experiencia clara, cuidada y coordinada.',
  },
  {
    image: '/images/mudanza-miranda-hero-2.webp',
    eyebrow: 'Mudanzas Miranda · Hogares y empresas',
    title: 'Tu mudanza, en buenas manos',
    description: 'Una presentación visual más directa para conocer nuestro servicio.',
  },
  {
    image: '/images/mudanza-miranda-hero-3.webp',
    eyebrow: 'Mudanzas Miranda · Mendoza',
    title: 'Nos ocupamos del traslado',
    description: 'Coordiná tu mudanza y recibí una cotización.',
  },
];

export default function HeroCarousel() {
  return (
    <section className="hero-carousel" aria-label="Mudanzas Miranda">
      <div className="hero-carousel__slides">
        {HERO_SLIDES.map((slide, index) => (
          <article
            className={`hero-carousel__slide${index === 0 ? ' is-active' : ''}`}
            key={slide.image}
            aria-hidden={index !== 0}
          >
            <img
              className="hero-carousel__image"
              src={slide.image}
              alt=""
              fetchPriority={index === 0 ? 'high' : 'auto'}
              loading={index === 0 ? 'eager' : 'lazy'}
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
          </article>
        ))}
      </div>
      <div className="hero-carousel__dots" aria-label="Seleccionar imagen del hero">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            className={index === 0 ? 'is-active' : ''}
            aria-label={`Mostrar imagen ${index + 1}`}
            aria-current={index === 0 ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
}
