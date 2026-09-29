import { useEffect, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../ui/LanguageSwitcher.tsx'

const links = [
  { key: 'nav.chiSiamo', href: '#chi-siamo' },
  { key: 'nav.dolci', href: '#i-nostri-dolci' },
  { key: 'nav.torte', href: '#torte' },
  { key: 'nav.doveSiamo', href: '#dove-siamo' },
  { key: 'nav.contatti', href: '#contatti' },
] as const

export function Header() {
  const { t } = useTranslation()
  const menuId = useId()
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="pointer-events-none sticky top-0 z-40">
      <div className="px-4">
        <div
          className={`pointer-events-auto mx-auto mt-6 hidden w-max max-w-[calc(100%-2rem)] items-center gap-8 rounded-full border border-espresso/10 bg-cream/75 px-5 py-2.5 backdrop-blur-md transition-shadow duration-200 md:flex ${
            stuck ? 'shadow-[0_2px_8px_rgba(60,36,21,0.05)]' : ''
          }`}
        >
          <a
            href="#top"
            className="inline-flex min-h-11 items-center font-serif text-base tracking-tight text-espresso"
          >
            {t('business.name')}
          </a>
          <nav aria-label={t('nav.aria')} className="flex items-center gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm text-espresso/75 transition-colors duration-200 hover:text-espresso"
              >
                {t(link.key)}
              </a>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>

        <div
          className={`pointer-events-auto mx-auto mt-4 flex w-full max-w-lg items-center justify-between rounded-full border border-espresso/10 bg-cream/80 px-4 py-2.5 backdrop-blur-md md:hidden ${
            stuck ? 'shadow-[0_2px_8px_rgba(60,36,21,0.05)]' : ''
          }`}
        >
          <a
            href="#top"
            className="inline-flex min-h-11 items-center font-serif text-sm tracking-tight text-espresso"
          >
            {t('business.name')}
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
            className="-mr-1 inline-flex size-11 items-center justify-center rounded-full border border-espresso/15 text-espresso"
          >
            <span className="sr-only">{open ? t('nav.close') : t('nav.menu')}</span>
            <MenuGlyph open={open} />
          </button>
        </div>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className={`${open ? 'flex' : 'hidden'} pointer-events-auto fixed inset-0 z-50 flex-col bg-cream px-6 pb-10 pt-6 md:hidden`}
      >
        <div className="flex items-center justify-between">
          <p className="font-serif text-lg tracking-tight text-espresso">
            {t('business.name')}
          </p>
          <button
            type="button"
            onClick={close}
            className="inline-flex size-11 items-center justify-center rounded-full border border-espresso/15 text-espresso"
          >
            <span className="sr-only">{t('nav.close')}</span>
            <MenuGlyph open />
          </button>
        </div>
        <nav aria-label={t('nav.aria')} className="mt-10 flex flex-col">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="flex min-h-11 items-center font-serif text-3xl tracking-tight text-espresso"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>
        <LanguageSwitcher className="mt-auto self-start" />
      </div>
    </header>
  )
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {open ? (
        <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.4" />
      ) : (
        <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" stroke="currentColor" strokeWidth="1.4" />
      )}
    </svg>
  )
}
