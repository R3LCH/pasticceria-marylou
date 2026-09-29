import { useTranslation } from 'react-i18next'
import { Section } from '../layout/Section.tsx'
import { Button } from '../ui/Button.tsx'

const MAPS_HREF = 'https://maps.app.goo.gl/JzZekZSvMkiQJ5xK9'

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
  const { t } = useTranslation()
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
    </Section>
  )
}
