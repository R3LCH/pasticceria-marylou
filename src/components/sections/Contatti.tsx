import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '../layout/Section.tsx'

type ContactCard = {
  id: 'phone' | 'whatsapp' | 'email' | 'instagram' | 'facebook'
  labelKey:
    | 'contatti.phone.label'
    | 'contatti.whatsapp.label'
    | 'contatti.email.label'
    | 'contatti.instagram.label'
    | 'contatti.facebook.label'
  valueKey:
    | 'business.phone'
    | 'contatti.whatsapp.value'
    | 'business.email'
    | 'business.instagram'
    | 'business.facebook'
  href: string
  external: boolean
}

const cards: readonly ContactCard[] = [
  {
    id: 'phone',
    labelKey: 'contatti.phone.label',
    valueKey: 'business.phone',
    href: 'tel:0985272108',
    external: false,
  },
  {
    id: 'whatsapp',
    labelKey: 'contatti.whatsapp.label',
    valueKey: 'contatti.whatsapp.value',
    href: 'https://wa.me/390985272108',
    external: true,
  },
  {
    id: 'email',
    labelKey: 'contatti.email.label',
    valueKey: 'business.email',
    href: 'mailto:marylouscalea@gmail.com',
    external: false,
  },
  {
    id: 'instagram',
    labelKey: 'contatti.instagram.label',
    valueKey: 'business.instagram',
    href: 'https://www.instagram.com/pasticceriamarylou/',
    external: true,
  },
  {
    id: 'facebook',
    labelKey: 'contatti.facebook.label',
    valueKey: 'business.facebook',
    href: 'https://www.facebook.com/pasticceriamarylouscalea/',
    external: true,
  },
]

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  className: 'h-6 w-6',
}

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8.5 4.5h2l1.2 3-1.5 1a12 12 0 0 0 5.3 5.3l1-1.5 3 1.2v2a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 6.7 2 2 0 0 1 6.5 4.5h2z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 4.5a7.5 7.5 0 0 0-6.5 11.2L4.5 19.5l3.9-1A7.5 7.5 0 1 0 12 4.5z" />
      <path d="M9.2 9.6c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4.2.5.6 1.6.6 1.7.1.2 0 .4-.1.5l-.3.4c-.1.1-.2.3 0 .5.2.4.8 1.3 1.7 1.8.7.3 1 .3 1.2.2.2-.1.6-.6.8-.8.1-.2.3-.1.5-.1h.5c.3.1.6.3.6.6.1.4-.2 1.6-1.1 2.1-.8.5-1.9.4-3.2-.2-1.6-.7-2.9-2.2-3.4-2.8-.6-.7-1.2-1.8-.9-2.7.1-.4.6-1.3 1.4-1.6z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg {...iconProps}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg {...iconProps}>
      <path d="M14 8.5h2V5.5h-2c-2.2 0-3.5 1.4-3.5 3.6V11H8.5v3H10.5v5h3v-5H16l.5-3h-3V9.3c0-.5.2-.8.5-.8z" />
    </svg>
  )
}

const icons: Record<ContactCard['id'], () => ReactNode> = {
  phone: PhoneIcon,
  whatsapp: WhatsAppIcon,
  email: EmailIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
}

export function Contatti() {
  const { t } = useTranslation()

  return (
    <Section id="contatti" background="white">
      <header className="mx-auto max-w-2xl text-center">
        <h2>{t('contatti.title')}</h2>
        <p className="mt-6 text-18 leading-relaxed text-muted">{t('contatti.lead')}</p>
      </header>

      {/* 6-column grid: first row 3 cards (span 2), second row 2 cards (span 3). */}
      <ul className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6 lg:gap-6">
        {cards.map((card, index) => {
          const Icon = icons[card.id]
          // lg: 3 cards (span 2) then 2 cards (span 3); sm: last card spans both columns.
          const span =
            index < 3 ? 'lg:col-span-2' : index === cards.length - 1 ? 'sm:col-span-2 lg:col-span-3' : 'lg:col-span-3'
          return (
            <li key={card.id} className={span}>
              <a
                href={card.href}
                {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex h-full flex-col items-center rounded-12 border border-espresso/10 bg-white px-6 py-8 text-center shadow-subtle transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(60,36,21,0.12)] active:translate-y-0 active:shadow-subtle"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-100 text-terracotta">
                  <Icon />
                </span>
                <span className="mt-5 text-14 uppercase tracking-[0.08em] text-muted">
                  {t(card.labelKey)}
                </span>
                <span className="mt-2 break-all font-serif text-18 text-espresso">
                  {t(card.valueKey)}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
