import { forwardRef, type ReactNode } from 'react'

export type SectionBackground = 'cream' | 'white'

export type SectionProps = {
  children: ReactNode
  className?: string
  id?: string
  background?: SectionBackground
}

const backgroundClass: Record<SectionBackground, string> = {
  cream: 'bg-cream text-espresso',
  white: 'bg-white text-espresso',
}

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { children, className = '', id, background = 'cream' },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      className={`section-padding ${backgroundClass[background]} ${className}`.trim()}
    >
      <div className="container-width">{children}</div>
    </section>
  )
})
