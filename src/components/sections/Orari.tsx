import { useTranslation } from 'react-i18next'
import { Section } from '../layout/Section.tsx'

const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export function Orari() {
  const { t } = useTranslation()

  return (
    <Section id="orari" background="white">
      <div className="mx-auto max-w-2xl text-center">
        <h2>{t('orari.title')}</h2>
        <p className="mt-6 text-18 leading-relaxed text-muted">{t('orari.lead')}</p>

        <div className="mt-10 space-y-3 text-left">
          {daysOrder.map((day) => {
            const hours = t(`orari.hours.${day}`)
            const isClosed = hours === t('orari.closed') || hours === 'Closed'

            return (
              <div
                key={day}
                className="flex items-start justify-between gap-4 border-b border-cream-dark/20 pb-3 last:border-0"
              >
                <span className="font-medium text-espresso">{t(`orari.${day}`)}</span>
                <span className={`text-right ${isClosed ? 'font-medium text-muted' : 'text-charcoal'}`}>
                  {hours}
                </span>
              </div>
            )
          })}
        </div>

        <p className="mt-10 text-14 leading-relaxed text-muted">{t('orari.note')}</p>

        <a
          href={t('business.mapsUrl')}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-11 items-center font-medium text-terracotta underline decoration-terracotta/40 underline-offset-4 transition-colors hover:text-espresso hover:decoration-espresso"
        >
          {t('business.mapsLabel')}
        </a>
      </div>
    </Section>
  )
}
