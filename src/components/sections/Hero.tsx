import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button.tsx'
import { useGSAP } from '../../hooks/useGSAP.ts'
import { fadeInOnScroll, parallax } from '../../utils/animations.ts'

const HERO_IMAGE = `${import.meta.env.BASE_URL}images/hero.jpg`

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

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 2.2a5.7 5.7 0 0 0-4.9 8.6L2.4 13.6l2.9-.7A5.8 5.8 0 1 0 8 2.2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M6.1 6.2c.1-.3.3-.3.5-.3h.4c.1 0 .3 0 .4.3.1.4.4 1.2.4 1.3.1.1 0 .3-.1.4l-.2.3c-.1.1-.1.2 0 .4.2.3.6.9 1.3 1.2.5.2.7.2.8 0l.3-.4c.1-.1.2-.1.4 0 .1.1 1 .5 1.1.6.2.1.2.2.2.4 0 .3-.3.9-.7 1-.4.2-1 .2-1.8-.1-.8-.3-1.8-.9-2.5-1.7-.7-.8-1.1-1.5-1.2-2.1-.1-.5 0-1 .2-1.3Z"
        fill="currentColor"
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
        width={1920}
        height={1080}
        className="hero-photo absolute inset-0 size-full scale-105 object-cover"
      />
      <div className="absolute inset-0 bg-[#241812]/60" aria-hidden="true" />

      <div className="hero-copy relative flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-24 pt-28 text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-cream/75">
          {t('hero.eyebrow')}
        </p>
        <h1 className="mt-5 max-w-4xl font-serif text-32 font-medium tracking-tight sm:text-48 lg:text-64">
          {t('hero.title')}
        </h1>
        <p className="mt-5 max-w-xl text-16 leading-relaxed text-cream/85 sm:text-18">
          {t('hero.subtitle')}
        </p>
        <div className="mt-10 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
          <Button
            href="tel:0985272108"
            className="!w-full !justify-center !border-cream !bg-cream !text-espresso hover:!bg-cream-100 sm:!w-fit"
            icon={<PhoneIcon />}
          >
            {t('hero.cta.call')}
          </Button>
          <Button
            href="https://wa.me/390985272108"
            variant="secondary"
            className="!w-full !justify-center !border-cream/50 !bg-transparent !text-cream hover:!border-cream hover:!bg-cream/10 sm:!w-fit"
            icon={<WhatsAppIcon />}
          >
            {t('hero.cta.whatsapp')}
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
