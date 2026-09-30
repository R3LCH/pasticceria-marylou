import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button.tsx'
import { useGSAP } from '../../hooks/useGSAP.ts'
import { fadeInOnScroll, parallax } from '../../utils/animations.ts'

const HERO_IMAGE = `${import.meta.env.BASE_URL}images/hero.jpg`
const LOGO_LIGHT = `${import.meta.env.BASE_URL}images/logo-light.png`

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.2 2.4h2.1l1 2.4-1.3 1a8.6 8.6 0 0 0 4.2 4.2l1-1.3 2.4 1v2.1c0 .5-.4.9-.9.8A11.2 11.2 0 0 1 2.4 3.3c-.1-.5.3-.9.8-.9Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 6 8 10.5 12.5 6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Hero() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    parallax('.hero-photo', {
      distance: 48,
      start: 'top top',
      end: 'bottom top',
    })
    fadeInOnScroll('.hero-copy', { start: 'top 90%', distance: 16, duration: 1 })
  }, { scope: root })

  return (
    <section ref={root} id="top" className="relative min-h-[100dvh] overflow-hidden text-cream">
      <img
        src={HERO_IMAGE}
        alt=""
        width={1280}
        height={854}
        className="hero-photo absolute inset-0 size-full scale-105 object-cover"
      />
      <div className="absolute inset-0 bg-[#241812]/60" aria-hidden="true" />

      <div className="hero-copy relative flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-24 pt-28 text-center">
        <img
          src={LOGO_LIGHT}
          alt={t('hero.logoAlt')}
          width={900}
          height={1110}
          className="mb-6 h-28 w-auto sm:h-36"
        />
        <p className="text-xs uppercase tracking-[0.18em] text-cream/75">
          {t('hero.eyebrow')}
        </p>
        <h1 className="mt-5 max-w-4xl font-serif text-32 font-medium tracking-tight sm:text-48 lg:text-64">
          {t('hero.title')}
        </h1>
        <p className="mt-5 max-w-xl text-16 leading-relaxed text-cream/85 sm:text-18">
          {t('hero.subtitle')}
        </p>
        <div className="mt-10 flex w-full max-w-xs justify-center sm:w-auto sm:max-w-none">
          <Button
            href="tel:0985272108"
            className="!w-full !justify-center !border-cream !bg-cream !text-espresso hover:!bg-cream-100 sm:!w-fit"
            icon={<PhoneIcon />}
          >
            {t('hero.cta.call')}
          </Button>
        </div>
      </div>

      <a
        href="#chi-siamo"
        className="absolute bottom-4 left-1/2 inline-flex size-11 -translate-x-1/2 items-center justify-center text-cream/80 transition-colors duration-200 hover:text-cream"
      >
        <span className="sr-only">{t('nav.chiSiamo')}</span>
        <ChevronDown />
      </a>
    </section>
  )
}
