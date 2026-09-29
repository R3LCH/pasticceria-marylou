import type { MouseEventHandler, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary'

type ButtonBaseProps = {
  children: ReactNode
  variant?: ButtonVariant
  icon?: ReactNode
  className?: string
}

type ButtonLinkProps = ButtonBaseProps & {
  href: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  type?: never
}

type ButtonActionProps = ButtonBaseProps & {
  href?: undefined
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
}

export type ButtonProps = ButtonLinkProps | ButtonActionProps

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'border-espresso bg-espresso text-cream hover:bg-night',
  secondary:
    'border-espresso/40 bg-transparent text-espresso hover:border-espresso hover:bg-espresso/[0.04]',
}

const sharedClass =
  'inline-flex w-fit items-center justify-center gap-3 rounded-md border px-5 py-2.5 text-sm font-medium tracking-wide transition-transform duration-200 ease-out hover:scale-[0.98] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta'

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', icon, className = '' } = props
  const classes = `${sharedClass} ${variantClass[variant]} ${className}`.trim()

  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <span
          aria-hidden="true"
          className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-current/20"
        >
          {icon}
        </span>
      ) : null}
    </>
  )

  if (props.href !== undefined) {
    const newTab = /^(https?:)/.test(props.href)
    return (
      <a
        href={props.href}
        className={classes}
        onClick={props.onClick}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={props.type ?? 'button'} className={classes} onClick={props.onClick}>
      {content}
    </button>
  )
}
