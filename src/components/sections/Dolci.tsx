import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '../layout/Section.tsx'
import { useGSAP } from '../../hooks/useGSAP.ts'
import { fadeInOnScroll, staggerGrid } from '../../utils/animations.ts'

type DolciCard = {
  seed: number
  // Desktop collage placement (lg: 4-column grid, fixed row height).
  span: string
}

// lg: 4 columns × 3 rows = 12 cells, fully filled (one 2×2, one 2×1, six 1×1).
// Seed 2 (chantilly bignè) is the large tile; seeds 1 and 5 stay 1×1 (414px sources).
const cards: readonly DolciCard[] = [
  { seed: 2, span: 'lg:col-span-2 lg:row-span-2' },
  { seed: 1, span: '' },
  { seed: 3, span: '' },
  { seed: 5, span: '' },
  { seed: 6, span: '' },
  { seed: 7, span: '' },
  { seed: 8, span: '' },
  { seed: 4, span: 'lg:col-span-2' },
]

function imageSrc(seed: number) {
  return `${import.meta.env.BASE_URL}images/dolci-${seed}.jpg`
}

export function Dolci() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    fadeInOnScroll('.dolci-heading', { start: 'top 80%', distance: 20, duration: 0.8 })
    staggerGrid('.dolci-grid', {
      childSelector: ':scope > li',
      start: 'top 80%',
      stagger: 0.06,
      distance: 20,
      duration: 0.65,
    })
  }, { scope: root })

  return (
    <Section ref={root} id="i-nostri-dolci" background="cream">
      <header className="dolci-heading mx-auto max-w-2xl text-center">
        <h2>{t('dolci.title')}</h2>
        <p className="mt-6 text-18 leading-relaxed text-muted">{t('dolci.subtitle')}</p>
      </header>

      {/* Mobile/tablet: horizontal snap panorama. Desktop: compact 4-column collage. */}
      <ul className="dolci-grid -mx-4 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 lg:mx-auto lg:mt-14 lg:grid lg:max-w-5xl lg:grid-cols-4 lg:auto-rows-[11rem] lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
        {cards.map((card) => {
          const label = t(`dolci.photos.${card.seed}`)
          return (
            <li
              key={card.seed}
              className={`w-[72%] shrink-0 snap-center sm:w-[44%] lg:w-auto ${card.span}`}
            >
              <figure className="group relative aspect-[4/5] h-full overflow-hidden rounded-12 border border-espresso/10 bg-white shadow-subtle lg:aspect-auto">
                <img
                  src={imageSrc(card.seed)}
                  alt={label}
                  width={600}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/70 to-transparent px-4 pb-3 pt-10 font-serif text-16 text-cream">
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
