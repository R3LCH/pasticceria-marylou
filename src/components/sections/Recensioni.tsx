import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '../layout/Section.tsx'
import { Button } from '../ui/Button.tsx'
import { useGSAP } from '../../hooks/useGSAP.ts'
import { fadeInOnScroll } from '../../utils/animations.ts'
import { googleRating, reviews, type Review } from '../../data/reviews.ts'

const reviewsHref = 'https://maps.app.goo.gl/JzZekZSvMkiQJ5xK9'

function Star({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
    </svg>
  )
}

function Stars({ count, className = '' }: { count: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`.trim()}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`size-4 ${index < count ? 'text-terracotta' : 'text-espresso/15'}`}
        />
      ))}
    </span>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const { t } = useTranslation()
  return (
    <li className="w-[20rem] shrink-0 snap-start sm:w-[24rem]">
      <figure className="flex h-full flex-col rounded-12 border border-espresso/10 bg-cream p-6 shadow-subtle">
        <span role="img" aria-label={t('recensioni.stars', { count: review.rating })}>
          <Stars count={review.rating} />
        </span>
        <blockquote
          lang={review.lang}
          className="mt-4 line-clamp-6 whitespace-pre-line text-16 leading-relaxed text-espresso"
        >
          {review.text}
        </blockquote>
        <figcaption className="mt-auto flex items-baseline justify-between gap-4 pt-6">
          <span className="font-serif text-18 text-espresso">{review.author}</span>
          <span className="text-14 text-muted">Google</span>
        </figcaption>
      </figure>
    </li>
  )
}

export function Recensioni() {
  const { t, i18n } = useTranslation()
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    fadeInOnScroll('.recensioni-heading', { start: 'top 80%', distance: 20, duration: 0.8 })
  }, { scope: root })

  const rating = googleRating.rating.toLocaleString(i18n.language)

  return (
    <Section ref={root} id="recensioni" background="white">
      <header className="recensioni-heading mx-auto max-w-2xl text-center">
        <h2>{t('recensioni.title')}</h2>
        <p className="mt-6 text-18 leading-relaxed text-muted">{t('recensioni.lead')}</p>
        <p className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-16 text-espresso">
          <Stars count={5} />
          <span>{t('recensioni.ratingLabel', { rating, count: googleRating.count })}</span>
        </p>
      </header>

      {/* Full-bleed: break out of Section's centered container. */}
      <div
        role="region"
        aria-label={t('recensioni.title')}
        tabIndex={0}
        className="reviews-marquee mx-[calc(50%-50vw)] mt-16 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto motion-reduce:scroll-px-6"
      >
        <div className="reviews-track flex w-max motion-reduce:px-6">
          <ul className="flex gap-6 pr-6">
            {reviews.map((review) => (
              <ReviewCard key={review.author} review={review} />
            ))}
          </ul>
          <ul aria-hidden="true" className="flex gap-6 pr-6 motion-reduce:hidden">
            {reviews.map((review) => (
              <ReviewCard key={review.author} review={review} />
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Button href={reviewsHref} variant="secondary">
          {t('recensioni.readMore')}
        </Button>
      </div>
    </Section>
  )
}
