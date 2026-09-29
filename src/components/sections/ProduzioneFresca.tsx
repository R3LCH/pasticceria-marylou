import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '../layout/Section.tsx'
import { useGSAP } from '../../hooks/useGSAP.ts'
import { fadeInOnScroll, staggerGrid } from '../../utils/animations.ts'

const products: readonly number[] = [1, 2, 3, 4, 5, 6]

function productSrc(seed: number) {
  return `${import.meta.env.BASE_URL}images/fresh-${seed}.jpg`
}

export function ProduzioneFresca() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    fadeInOnScroll('.fresh-heading', { start: 'top 80%', distance: 20, duration: 0.8 })
    staggerGrid('.fresh-grid', {
      childSelector: ':scope > li',
      start: 'top 80%',
      stagger: 0.08,
      distance: 20,
      duration: 0.65,
    })
  }, { scope: root })

  return (
    <Section ref={root} id="produzione-fresca" background="white">
      <header className="fresh-heading mx-auto max-w-2xl text-center">
        <h2>{t('produzioneFresca.title')}</h2>
        <p className="mt-6 text-18 leading-relaxed text-muted">
          {t('produzioneFresca.description')}
        </p>
      </header>

      <ul className="fresh-grid -mx-4 mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
        {products.map((seed) => {
          const label = t(`produzioneFresca.photos.${seed}`)
          return (
            <li
              key={seed}
              className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto"
            >
              <figure className="overflow-hidden rounded-12 bg-cream shadow-subtle">
                <img
                  src={productSrc(seed)}
                  alt={label}
                  width={700}
                  height={500}
                  loading="lazy"
                  className="aspect-[7/5] w-full object-cover"
                />
                <figcaption className="px-4 py-4 text-center font-serif text-18">
                  {label}
                </figcaption>
              </figure>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
