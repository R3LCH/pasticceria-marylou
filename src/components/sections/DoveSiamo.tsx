import { useTranslation } from 'react-i18next'
import { Section } from '../layout/Section.tsx'
import { Button } from '../ui/Button.tsx'

const MAPS_HREF = 'https://maps.app.goo.gl/JzZekZSvMkiQJ5xK9'
const TRIPADVISOR_HREF =
  'https://www.tripadvisor.it/Restaurant_Review-g194909-d4520554-Reviews-Mary_Lou_pasticceria-Scalea_Province_of_Cosenza_Calabria.html'

// Public ratings as shown on each platform, checked 2026-09-30. Update by hand.
const RATINGS = [
  {
    platform: 'Google',
    rating: 4.7,
    count: 256,
    href: MAPS_HREF,
    // Simple Icons "google" (CC0).
    logo: 'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z',
  },
  {
    platform: 'Tripadvisor',
    rating: 4.6,
    count: 103,
    href: TRIPADVISOR_HREF,
    // Simple Icons "tripadvisor" (CC0).
    logo: 'M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z',
  },
] as const

const STAR_PATH =
  'M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z'

function StarRow({ className }: { className: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-3.5 shrink-0" fill="currentColor" aria-hidden="true">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  )
}

/** Five stars filled proportionally to `rating` (e.g. 4.6 → 92%). */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="relative inline-block" aria-hidden="true">
      <StarRow className="text-espresso/15" />
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(rating / 5) * 100}%` }}>
        <StarRow className="text-terracotta" />
      </span>
    </span>
  )
}

const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.5!2d15.794897!3d39.812782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133f1e3cd9530891%3A0x5e2d823eeb41f6bc!2sMary%20Lo%C3%B9!5e0!3m2!1sit!2sit!4v1638000000000!5m2!1sit!2sit'

type NearbyPlace = {
  place: string
  time: string
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5c0 3.2 4.5 8.5 4.5 8.5s4.5-5.3 4.5-8.5A4.5 4.5 0 0 0 8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="8" cy="6" r="1.4" fill="currentColor" />
    </svg>
  )
}

export function DoveSiamo() {
  const { t, i18n } = useTranslation()
  const mapTitle = `${t('doveSiamo.title')} — ${t('business.name')}`
  const nearby = t('doveSiamo.nearby', { returnObjects: true }) as NearbyPlace[]

  return (
    <Section id="dove-siamo" background="cream">
      <div className="overflow-hidden rounded-12 border border-espresso/10 bg-white shadow-subtle md:grid md:grid-cols-5">
        <div className="flex flex-col p-6 sm:p-8 md:col-span-2 md:p-10">
          <h2>{t('doveSiamo.title')}</h2>
          <p className="mt-5 text-18 leading-relaxed text-muted">{t('doveSiamo.lead')}</p>

          <address className="mt-6 flex items-start gap-3 not-italic">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-cream-100 text-terracotta">
              <MapPinIcon />
            </span>
            <span className="font-serif text-18 leading-snug text-espresso">
              {t('business.address')}
              <br />
              {t('business.city')}
            </span>
          </address>

          <p className="mt-8 text-14 uppercase tracking-[0.08em] text-muted">
            {t('doveSiamo.nearbyTitle')}
          </p>
          <ul className="mt-3 divide-y divide-espresso/10 border-y border-espresso/10">
            {nearby.map((item) => (
              <li key={item.place} className="flex items-baseline justify-between gap-4 py-3">
                <span className="text-16 text-espresso">{item.place}</span>
                <span className="shrink-0 text-14 tabular-nums text-muted">{item.time}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 md:mt-auto md:pt-8">
            <Button href={MAPS_HREF} className="!w-full !justify-center" icon={<MapPinIcon />}>
              {t('doveSiamo.cta')}
            </Button>
          </div>
        </div>

        <div className="md:col-span-3">
          <iframe
            title={mapTitle}
            src={MAPS_EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] h-full w-full border-0 md:aspect-auto md:min-h-[32rem]"
            allowFullScreen
          />
        </div>
      </div>

      <div className="mt-10">
        <p className="text-center text-14 uppercase tracking-[0.08em] text-muted">
          {t('ratings.label')}
        </p>
        <ul className="mx-auto mt-5 grid max-w-3xl gap-4 sm:grid-cols-2">
          {RATINGS.map((item) => {
            const rating = item.rating.toLocaleString(i18n.language, { minimumFractionDigits: 1 })
            return (
              <li key={item.platform}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('ratings.aria', { platform: item.platform, rating, count: item.count })}
                  className="group flex items-center gap-5 rounded-12 border border-espresso/10 bg-white px-6 py-5 shadow-subtle transition-colors duration-200 hover:border-espresso/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cream-100 text-espresso/80 transition-colors duration-200 group-hover:text-espresso">
                    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
                      <path d={item.logo} />
                    </svg>
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-14 text-muted">{item.platform}</span>
                    <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-serif text-24 leading-none text-espresso">{rating}</span>
                      <Stars rating={item.rating} />
                      <span className="text-14 text-muted">{t('ratings.count', { count: item.count })}</span>
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
