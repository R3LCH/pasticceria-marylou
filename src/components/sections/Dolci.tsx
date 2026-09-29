import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '../layout/Section.tsx'
import { useGSAP } from '../../hooks/useGSAP.ts'
import { fadeInOnScroll, staggerGrid } from '../../utils/animations.ts'

type DolciLabelKey =
  | 'dolci.items.cornetti'
  | 'dolci.items.pastries'
  | 'dolci.items.dolci'

type DolciSpan = {
  col: string
  row: string
  aspect: string
}

type DolciCard = {
  seed: number
  labelKey: DolciLabelKey
  span: DolciSpan
}

const cards: readonly DolciCard[] = [
  {
    seed: 1,
    labelKey: 'dolci.items.cornetti',
    span: {
      col: 'sm:col-span-2 lg:col-span-2',
      row: 'lg:row-span-2',
      aspect: 'aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[28rem]',
    },
  },
  {
    seed: 2,
    labelKey: 'dolci.items.pastries',
    span: {
      col: 'sm:col-span-1 lg:col-span-1',
      row: 'lg:row-span-1',
      aspect: 'aspect-[3/2]',
    },
  },
  {
    seed: 3,
    labelKey: 'dolci.items.dolci',
    span: {
      col: 'sm:col-span-1 lg:col-span-1',
      row: 'lg:row-span-1',
      aspect: 'aspect-[3/2]',
    },
  },
  {
    seed: 4,
    labelKey: 'dolci.items.pastries',
    span: {
      col: 'sm:col-span-1 lg:col-span-1',
      row: 'lg:row-span-1',
      aspect: 'aspect-[3/2]',
    },
  },
  {
    seed: 5,
    labelKey: 'dolci.items.cornetti',
    span: {
      col: 'sm:col-span-1 lg:col-span-1',
      row: 'lg:row-span-1',
      aspect: 'aspect-[3/2]',
    },
  },
  {
    seed: 6,
    labelKey: 'dolci.items.dolci',
    span: {
      col: 'sm:col-span-2 lg:col-span-1',
      row: 'lg:row-span-1',
      aspect: 'aspect-[3/2]',
    },
  },
  {
    seed: 7,
    labelKey: 'dolci.items.pastries',
    span: {
      col: 'sm:col-span-1 lg:col-span-2',
      row: 'lg:row-span-1',
      aspect: 'aspect-[3/2] lg:aspect-[2/1]',
    },
  },
  {
    seed: 8,
    labelKey: 'dolci.items.dolci',
    span: {
      col: 'sm:col-span-1 lg:col-span-1',
      row: 'lg:row-span-1',
      aspect: 'aspect-[3/2]',
    },
  },
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
      stagger: 0.08,
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

      <ul className="dolci-grid mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:auto-rows-[14rem] lg:gap-6">
        {cards.map((card) => {
          const label = t(card.labelKey)
          return (
            <li key={card.seed} className={`${card.span.col} ${card.span.row}`}>
              <figure
                className={`group relative h-full overflow-hidden rounded-12 border border-espresso/10 bg-white shadow-subtle transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(60,36,21,0.12)] ${card.span.aspect}`}
              >
                <img
                  src={imageSrc(card.seed)}
                  alt=""
                  width={600}
                  height={400}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/70 to-transparent px-4 pb-4 pt-10 font-serif text-18 text-cream">
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
