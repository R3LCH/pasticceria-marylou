import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '../layout/Section.tsx'
import { useGSAP } from '../../hooks/useGSAP.ts'
import { fadeInOnScroll, slideIn } from '../../utils/animations.ts'

const imageSrc = `${import.meta.env.BASE_URL}images/chi-siamo.jpg`

export function ChiSiamo() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const features = t('chiSiamo.features', { returnObjects: true }) as string[]

  useGSAP(() => {
    fadeInOnScroll('.chi-copy', { start: 'top 80%', distance: 24, duration: 0.9 })
    slideIn('.chi-photo', 'right', { start: 'top 80%', distance: 40, duration: 1, delay: 0.12 })
  }, { scope: root })

  return (
    <Section ref={root} id="chi-siamo" background="white">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-20">
        <div className="chi-copy order-2 md:order-1">
          <p className="text-14 uppercase tracking-[0.08em] text-muted">
            {t('chiSiamo.eyebrow')}
          </p>
          <h2 className="mt-4">{t('chiSiamo.title')}</h2>
          <p className="mt-6 max-w-prose text-18 leading-relaxed text-muted">
            {t('chiSiamo.description')}
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="rounded-full border border-espresso/15 px-4 py-1.5 text-14 tracking-wide text-espresso"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <figure className="chi-photo order-1 overflow-hidden rounded-12 shadow-subtle md:order-2">
          <img
            src={imageSrc}
            alt={t('chiSiamo.imageAlt')}
            width={720}
            height={540}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        </figure>
      </div>
    </Section>
  )
}
