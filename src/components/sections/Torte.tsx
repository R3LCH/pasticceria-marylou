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

function cakeSrc(seed: number) {
  return `${import.meta.env.BASE_URL}images/cake-${seed}.jpg`
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.2 2.4h2.1l1 2.4-1.3 1a8.6 8.6 0 0 0 4.2 4.2l1-1.3 2.4 1v2.1c0 .5-.4.9-.9.8A11.2 11.2 0 0 1 2.4 3.3c-.1-.5.3-.9.8-.9Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
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

      <ul className="torte-grid mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
        {cakes.map((cake) => {
          const alt = t(`torte.photos.${cake.seed}`)
          return (
            <li key={cake.seed}>
              <img
                src={cakeSrc(cake.seed)}
                alt={alt}
                width={600}
                height={800}
                loading="lazy"
                className="aspect-[3/4] w-full rounded-12 object-cover shadow-subtle"
              />
            </li>
          )
        })}
      </ul>

      <div className="torte-cta mt-12 flex flex-col items-center gap-4">
        <p className="text-16 text-muted">{t('torte.ctaLead')}</p>
        <Button
          href={t('business.phoneHref')}
          icon={<PhoneIcon />}
          className="!w-full !justify-center md:!w-fit"
        >
          {`${t('torte.cta')} \u00b7 ${t('business.phone')}`}
        </Button>
      </div>
    </Section>
  )
}
