import { useTranslation } from 'react-i18next'
import { Section } from '../layout/Section.tsx'

export function Orari() {
  const { t } = useTranslation()

  return (
    <Section id="orari" background="white">
      <div className="mx-auto max-w-xl text-center">
        <h2>{t('orari.title')}</h2>
        <p className="mt-6 text-18 leading-relaxed text-muted">{t('orari.tbd')}</p>
        <a
          href={t('business.mapsUrl')}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-11 items-center font-medium text-terracotta underline decoration-terracotta/40 underline-offset-4 transition-colors hover:text-espresso hover:decoration-espresso"
        >
          {t('orari.maps')}
        </a>
        <p className="mt-8 text-14 leading-relaxed text-muted">{t('orari.note')}</p>
      </div>
    </Section>
  )
}
