import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '../layout/Section.tsx'
import { Button } from '../ui/Button.tsx'
import { useGSAP } from '../../hooks/useGSAP.ts'
import { fadeInOnScroll, staggerGrid } from '../../utils/animations.ts'

type Cake = {
  seed: number
}

const cakes: readonly Cake[] = [
  { seed: 1 },
  { seed: 2 },
  { seed: 3 },
  { seed: 4 },
  { seed: 5 },
  { seed: 6 },
]

const whatsappNumber = '390985272108'

function cakeSrc(seed: number) {
  return `${import.meta.env.BASE_URL}images/cake-${seed}.jpg`
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5A6.5 6.5 0 0 0 2.2 11.7L1.5 14.5l2.9-.7A6.5 6.5 0 1 0 8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M6.1 6.2c.1.9.7 1.8 1.6 2.5.8.6 1.6.8 2 .6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Torte() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    fadeInOnScroll('.torte-heading', { start: 'top 80%', distance: 20, duration: 0.8 })
    staggerGrid('.torte-grid', {
      childSelector: ':scope > li',
      start: 'top 80%',
      stagger: 0.08,
      distance: 20,
      duration: 0.65,
    })
    fadeInOnScroll('.torte-cta', { start: 'top 90%', distance: 16, duration: 0.7 })
  }, { scope: root })
  const occasions = t('torte.occasions', { returnObjects: true }) as string[]
  const message = t('torte.whatsappMessage')
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <Section ref={root} id="torte" background="white">
      <header className="torte-heading mx-auto max-w-2xl text-center">
        <h2>{t('torte.title')}</h2>
        <p className="mt-6 text-18 leading-relaxed text-muted">{t('torte.description')}</p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {occasions.map((occasion) => (
            <li
              key={occasion}
              className="rounded-full border border-espresso/15 px-4 py-1.5 text-14 tracking-wide text-espresso"
            >
              {occasion}
            </li>
          ))}
        </ul>
      </header>

      <ul className="torte-grid mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {cakes.map((cake) => {
          const alt = t('torte.imageAlt', { index: cake.seed })
          return (
            <li key={cake.seed}>
              <img
                src={cakeSrc(cake.seed)}
                alt={alt}
                width={700}
                height={700}
                loading="lazy"
                className="aspect-square w-full rounded-12 object-cover shadow-subtle"
              />
            </li>
          )
        })}
      </ul>

      <div className="torte-cta mt-12 flex justify-center">
        <Button href={href} className="!w-full !justify-center md:!w-fit" icon={<WhatsAppIcon />}>
          {t('torte.cta')}
        </Button>
      </div>
    </Section>
  )
}
