import { useTranslation } from 'react-i18next'

const LOGO = `${import.meta.env.BASE_URL}images/logo.png`

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-espresso/10 bg-cream text-espresso">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-3 md:gap-12">
        <div>
          <p className="font-serif text-xl tracking-tight">{t('business.name')}</p>
          <address className="mt-4 text-sm not-italic leading-relaxed text-espresso/70">
            {t('business.address')}
            <br />
            {t('business.city')}
            <br />
            {t('business.country')}
          </address>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-espresso/50">
            {t('contatti.title')}
          </p>
          <ul className="mt-2 text-sm">
            <li>
              <a
                href={t('business.phoneHref')}
                className="inline-flex min-h-11 items-center text-espresso/80 transition-colors hover:text-terracotta active:text-night"
              >
                <span className="text-espresso/50">{t('contatti.phone.label')}</span>
                <span className="ml-2">{t('business.phone')}</span>
              </a>
            </li>
            <li>
              <a
                href={t('business.emailHref')}
                className="inline-flex min-h-11 items-center break-all text-espresso/80 transition-colors hover:text-terracotta active:text-night"
              >
                {t('business.email')}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-espresso/50">
            {t('footer.follow')}
          </p>
          <ul className="mt-2 text-sm">
            <li>
              <a
                href={t('business.instagramUrl')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-espresso/80 transition-colors hover:text-terracotta active:text-night"
              >
                {t('contatti.instagram.label')}
              </a>
            </li>
            <li>
              <a
                href={t('business.facebookUrl')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-espresso/80 transition-colors hover:text-terracotta active:text-night"
              >
                {t('contatti.facebook.label')}
              </a>
            </li>
            <li>
              <a
                href={t('business.mapsUrl')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-espresso/80 transition-colors hover:text-terracotta active:text-night"
              >
                {t('business.mapsLabel')}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="py-8 text-center">
        <img
          src={LOGO}
          alt={t('hero.logoAlt')}
          width={900}
          height={1110}
          loading="lazy"
          className="mx-auto h-24 w-auto opacity-90"
        />
      </div>

      <div className="border-t border-espresso/10">
        <p className="mx-auto max-w-5xl px-6 py-5 text-xs text-espresso/50">
          {t('footer.copyright', { year })}
        </p>
      </div>
    </footer>
  )
}
