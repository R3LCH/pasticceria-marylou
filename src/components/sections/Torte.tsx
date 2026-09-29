import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '../layout/Section.tsx'
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
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" />
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
          const alt = t(`torte.photos.${cake.seed}`)
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

      <div className="torte-cta mt-12 flex flex-col items-center gap-4">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 text-18 font-medium text-white shadow-subtle transition-transform duration-200 ease-out hover:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta md:w-fit"
        >
          <WhatsAppIcon />
          {t('torte.cta')}
        </a>
        <p className="text-16 text-muted">
          {t('torte.orCall')}{' '}
          <a
            href={t('business.phoneHref')}
            className="inline-flex min-h-11 items-center font-serif text-24 text-espresso underline decoration-espresso/30 underline-offset-4 hover:text-terracotta"
          >
            {t('business.phone')}
          </a>
        </p>
      </div>
    </Section>
  )
}
