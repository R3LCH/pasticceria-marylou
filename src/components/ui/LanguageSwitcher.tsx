import { useTranslation } from 'react-i18next'
import { supportedLanguages, type AppLanguage } from '../../i18n/config.ts'

const labels: Record<AppLanguage, string> = {
  it: 'IT',
  en: 'EN',
}

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const active = (i18n.resolvedLanguage ?? i18n.language).slice(0, 2) as AppLanguage

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className={`inline-flex items-center rounded-full border border-espresso/15 bg-cream/70 p-0.5 ${className}`.trim()}
    >
      {supportedLanguages.map((code) => {
        const isActive = active === code
        return (
          <button
            key={code}
            type="button"
            aria-pressed={isActive}
            aria-label={t('language.switchTo', { language: t(`language.${code}`) })}
            onClick={() => {
              void i18n.changeLanguage(code)
            }}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-xs font-medium tracking-[0.06em] transition-colors duration-200 ${
              isActive
                ? 'bg-espresso text-cream'
                : 'bg-transparent text-espresso/70 hover:text-espresso'
            }`}
          >
            {labels[code]}
          </button>
        )
      })}
    </div>
  )
}
