import { useTranslation } from 'react-i18next'
import { Section } from '../layout/Section.tsx'
import { Button } from '../ui/Button.tsx'

const MAPS_HREF = 'https://maps.app.goo.gl/JzZekZSvMkiQJ5xK9'

const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.5!2d15.794897!3d39.812782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133f1e3cd9530891%3A0x5e2d823eeb41f6bc!2sMary%20Lo%C3%B9!5e0!3m2!1sit!2sit!4v1638000000000!5m2!1sit!2sit'

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

  return (
    <Section id="dove-siamo" background="white">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-20">
        <div className="order-1 overflow-hidden rounded-12 shadow-subtle md:order-2">
          <iframe
            title={mapTitle}
            src={MAPS_EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] w-full border-0"
            allowFullScreen
          />
        </div>

        <div className="order-2 md:order-1">
          <h2>{t('doveSiamo.title')}</h2>
          <address className="mt-6 text-18 not-italic leading-relaxed text-muted">
            {t('business.address')}
            <br />
            {t('business.city')}
            <br />
            {t('business.country')}
          </address>
          <div className="mt-8">
            <Button href={MAPS_HREF} className="!w-full !justify-center md:!w-fit" icon={<MapPinIcon />}>
              {t('doveSiamo.cta')}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
