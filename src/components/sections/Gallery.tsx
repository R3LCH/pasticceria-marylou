import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '../layout/Section.tsx'
import { useGSAP } from '../../hooks/useGSAP.ts'
import { fadeInOnScroll, staggerGrid } from '../../utils/animations.ts'

type GalleryCategory = 'dolci' | 'torte' | 'colazione' | 'pasticceria'

type GalleryFilter = 'all' | GalleryCategory

type GalleryImage = {
  id: string
  category: GalleryCategory
  n: number
  width: number
  height: number
  tall: boolean
}

const categories: readonly GalleryCategory[] = [
  'dolci',
  'torte',
  'colazione',
  'pasticceria',
]

const images: readonly GalleryImage[] = [
  { id: 'dolci-1', category: 'dolci', n: 1, width: 800, height: 600, tall: false },
  { id: 'dolci-2', category: 'dolci', n: 2, width: 800, height: 1000, tall: true },
  { id: 'dolci-3', category: 'dolci', n: 3, width: 800, height: 600, tall: false },
  { id: 'dolci-4', category: 'dolci', n: 4, width: 800, height: 600, tall: false },
  { id: 'torte-1', category: 'torte', n: 1, width: 800, height: 1000, tall: true },
  { id: 'torte-2', category: 'torte', n: 2, width: 800, height: 600, tall: false },
  { id: 'torte-3', category: 'torte', n: 3, width: 800, height: 600, tall: false },
  { id: 'torte-4', category: 'torte', n: 4, width: 800, height: 1000, tall: true },
  { id: 'colazione-1', category: 'colazione', n: 1, width: 800, height: 600, tall: false },
  { id: 'colazione-2', category: 'colazione', n: 2, width: 800, height: 600, tall: false },
  { id: 'colazione-3', category: 'colazione', n: 3, width: 800, height: 1000, tall: true },
  { id: 'colazione-4', category: 'colazione', n: 4, width: 800, height: 600, tall: false },
  { id: 'pasticceria-1', category: 'pasticceria', n: 1, width: 800, height: 600, tall: false },
  { id: 'pasticceria-2', category: 'pasticceria', n: 2, width: 800, height: 1000, tall: true },
  { id: 'pasticceria-3', category: 'pasticceria', n: 3, width: 800, height: 600, tall: false },
  { id: 'pasticceria-4', category: 'pasticceria', n: 4, width: 800, height: 600, tall: false },
]

function imageSrc(image: GalleryImage) {
  return `https://picsum.photos/seed/marylou-gallery-${image.category}-${image.n}/${image.width}/${image.height}`
}

export function Gallery() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const tabsId = useId()
  const dialogTitleId = useId()
  const [filter, setFilter] = useState<GalleryFilter>('all')
  const [activeId, setActiveId] = useState<string | null>(null)

  useGSAP(() => {
    fadeInOnScroll('.gallery-heading', { start: 'top 80%', distance: 20, duration: 0.8 })
  }, { scope: root })

  useGSAP(() => {
    staggerGrid('.gallery-grid', {
      childSelector: ':scope > li',
      start: 'top 80%',
      stagger: 0.08,
      distance: 16,
      duration: 0.6,
    })
  }, { scope: root, dependencies: [filter] })

  const visible = useMemo(
    () => images.filter((image) => filter === 'all' || image.category === filter),
    [filter],
  )
  const activeIndex = visible.findIndex((image) => image.id === activeId)
  const active = activeIndex >= 0 ? visible[activeIndex] : null

  useEffect(() => {
    if (!active) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveId(null)
        return
      }
      if (event.key === 'ArrowLeft') {
        const previous = (activeIndex - 1 + visible.length) % visible.length
        setActiveId(visible[previous].id)
      }
      if (event.key === 'ArrowRight') {
        const next = (activeIndex + 1) % visible.length
        setActiveId(visible[next].id)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [active, activeIndex, visible])

  function showNeighbor(direction: -1 | 1) {
    if (!active) return
    const next = (activeIndex + direction + visible.length) % visible.length
    setActiveId(visible[next].id)
  }

  const filters: readonly GalleryFilter[] = ['all', ...categories]

  return (
    <Section ref={root} id="gallery" background="cream">
      <header className="gallery-heading mx-auto max-w-2xl text-center">
        <h2>{t('gallery.title')}</h2>
        <p className="mt-6 text-18 leading-relaxed text-muted">{t('gallery.lead')}</p>
      </header>

      <div
        role="tablist"
        aria-label={t('gallery.filters')}
        className="-mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0"
      >
        {filters.map((key) => {
          const selected = filter === key
          return (
            <button
              key={key}
              id={`${tabsId}-${key}`}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(key)}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-14 tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta ${
                selected
                  ? 'border-espresso bg-espresso text-cream'
                  : 'border-espresso/20 bg-white text-espresso hover:border-espresso/50'
              }`}
            >
              {t(`gallery.categories.${key}`)}
            </button>
          )
        })}
      </div>

      <ul className="gallery-grid mt-10 columns-2 gap-3 sm:gap-4 lg:columns-3 lg:gap-5">
        {visible.map((image) => {
          const label = t('gallery.photo', {
            category: t(`gallery.categories.${image.category}`),
            n: image.n,
          })
          return (
            <li key={image.id} className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5">
              <button
                type="button"
                onClick={() => setActiveId(image.id)}
                className="group block w-full overflow-hidden rounded-12 border border-espresso/10 bg-white shadow-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
              >
                <img
                  src={imageSrc(image)}
                  alt={label}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  className={`w-full object-cover transition duration-300 ease-out group-hover:scale-[1.03] ${
                    image.tall ? 'aspect-[4/5]' : 'aspect-[4/3]'
                  }`}
                />
              </button>
            </li>
          )
        })}
      </ul>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveId(null)}
        >
          <p id={dialogTitleId} className="absolute h-px w-px overflow-hidden whitespace-nowrap [clip:rect(0,0,0,0)]">
            {t('gallery.photo', {
              category: t(`gallery.categories.${active.category}`),
              n: active.n,
            })}
          </p>
          <div
            className="relative flex max-h-full w-full max-w-5xl items-center justify-center pt-14"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveId(null)}
              aria-label={t('gallery.close')}
              className="absolute right-0 top-0 z-10 inline-flex min-h-11 items-center rounded-full border border-cream/40 bg-night/50 px-4 text-14 text-cream transition-colors hover:border-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:right-3 sm:top-3"
            >
              {t('gallery.close')}
            </button>
            <button
              type="button"
              onClick={() => showNeighbor(-1)}
              aria-label={t('gallery.previous')}
              className="absolute left-0 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-night/50 text-24 text-cream transition-colors hover:border-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:left-3"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <img
              src={imageSrc(active)}
              alt={t('gallery.photo', {
                category: t(`gallery.categories.${active.category}`),
                n: active.n,
              })}
              width={active.width}
              height={active.height}
              className="max-h-[calc(100dvh-7rem)] w-auto max-w-full rounded-12 object-contain"
            />
            <button
              type="button"
              onClick={() => showNeighbor(1)}
              aria-label={t('gallery.next')}
              className="absolute right-0 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-night/50 text-24 text-cream transition-colors hover:border-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:right-3"
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
      ) : null}
    </Section>
  )
}
