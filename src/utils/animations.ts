import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type RevealDirection = 'left' | 'right' | 'up' | 'down'

export interface ScrollRevealOptions {
  /** ScrollTrigger start position. Default: element top hits 85% of the viewport. */
  start?: string
  /** ScrollTrigger end position. Only used when `scrub` is set. */
  end?: string
  /** Tie progress to scroll. A number is the smoothing lag in seconds. */
  scrub?: boolean | number
  /** Play once, then kill the trigger. */
  once?: boolean
  /** toggleActions string. Ignored while scrubbing. Default: play on enter. */
  toggleActions?: string
  duration?: number
  delay?: number
  ease?: string
  /** Distance in px the element travels before settling. */
  distance?: number
  /** Skip motion when the visitor prefers reduced motion. Default: true. */
  respectReducedMotion?: boolean
}

export interface StaggerOptions extends ScrollRevealOptions {
  /** Delay between each child, in seconds. */
  stagger?: number
  /** CSS selector resolved inside `container`. Default: direct children. */
  childSelector?: string
  direction?: RevealDirection
}

export interface ParallaxOptions {
  /** Travel in px. The element moves up by this much across the scroll range. */
  distance?: number
  start?: string
  end?: string
  scrub?: boolean | number
  ease?: string
  respectReducedMotion?: boolean
}

const EASE = 'power2.out'

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Starting x/y for a slide, plus a hidden state. `left`/`up` enter from negative. */
function revealFrom(
  direction: RevealDirection,
  distance: number,
): gsap.TweenVars {
  const horizontal = direction === 'left' || direction === 'right'
  const fromNegative = direction === 'left' || direction === 'up'
  return {
    [horizontal ? 'x' : 'y']: fromNegative ? -distance : distance,
    autoAlpha: 0,
  }
}

/**
 * Fade a single element in when it enters the viewport.
 *
 * @example
 * const tween = fadeInOnScroll(sectionRef.current)
 * // inside useGSAP: fadeInOnScroll('.hero-copy', { duration: 1.1 })
 */
export function fadeInOnScroll(
  target: gsap.TweenTarget,
  options: ScrollRevealOptions = {},
): gsap.core.Tween {
  const {
    start = 'top 85%',
    once = true,
    toggleActions = 'play none none none',
    duration = 0.9,
    delay = 0,
    ease = EASE,
    distance = 24,
    respectReducedMotion = true,
    scrub,
    end,
  } = options

  if (respectReducedMotion && prefersReducedMotion()) {
    return gsap.set(target, { autoAlpha: 1, y: 0 })
  }

  return gsap.from(target, {
    autoAlpha: 0,
    y: distance,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger: target as gsap.DOMTarget,
      start,
      end,
      once,
      scrub,
      toggleActions: scrub ? undefined : toggleActions,
    },
  })
}

/**
 * Slide an element in from one side as it scrolls into view.
 *
 * @example
 * slideIn(cardRef.current, 'left')
 * slideIn('.about-photo', 'right', { distance: 80, duration: 1.2 })
 */
export function slideIn(
  target: gsap.TweenTarget,
  direction: RevealDirection = 'left',
  options: ScrollRevealOptions = {},
): gsap.core.Tween {
  const {
    start = 'top 85%',
    once = true,
    toggleActions = 'play none none none',
    duration = 1,
    delay = 0,
    ease = EASE,
    distance = 64,
    respectReducedMotion = true,
    scrub,
    end,
  } = options

  if (respectReducedMotion && prefersReducedMotion()) {
    return gsap.set(target, { autoAlpha: 1, x: 0, y: 0 })
  }

  return gsap.from(target, {
    ...revealFrom(direction, distance),
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger: target as gsap.DOMTarget,
      start,
      end,
      once,
      scrub,
      toggleActions: scrub ? undefined : toggleActions,
    },
  })
}

/**
 * Reveal a grid (or any group) one child at a time.
 *
 * @example
 * staggerGrid(gridRef.current, { childSelector: ':scope > article', stagger: 0.12 })
 */
export function staggerGrid(
  container: gsap.DOMTarget,
  options: StaggerOptions = {},
): gsap.core.Tween {
  const {
    start = 'top 80%',
    once = true,
    toggleActions = 'play none none none',
    duration = 0.7,
    delay = 0,
    ease = EASE,
    distance = 28,
    stagger = 0.1,
    childSelector = ':scope > *',
    direction = 'up',
    respectReducedMotion = true,
    scrub,
    end,
  } = options

  const root = gsap.utils.toArray<Element>(container)[0]
  const children = root
    ? gsap.utils.toArray<Element>(childSelector, root)
    : gsap.utils.toArray<Element>(container)

  if (respectReducedMotion && prefersReducedMotion()) {
    return gsap.set(children, { autoAlpha: 1, x: 0, y: 0 })
  }

  return gsap.from(children, {
    ...revealFrom(direction, distance),
    duration,
    delay,
    ease,
    stagger,
    scrollTrigger: {
      trigger: root ?? container,
      start,
      end,
      once,
      scrub,
      toggleActions: scrub ? undefined : toggleActions,
    },
  })
}

/**
 * Gently shift an element against the scroll, for hero photos and backgrounds.
 * Scrub is on by default so the motion stays tied to the scrollbar.
 *
 * @example
 * parallax(photoRef.current, { distance: 80 })
 * parallax('.hero-bg', { distance: 120, start: 'top top', end: 'bottom top' })
 */
export function parallax(
  target: gsap.TweenTarget,
  options: ParallaxOptions = {},
): gsap.core.Tween {
  const {
    distance = 80,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 0.6,
    ease = 'none',
    respectReducedMotion = true,
  } = options

  if (respectReducedMotion && prefersReducedMotion()) {
    return gsap.set(target, { y: 0 })
  }

  return gsap.fromTo(
    target,
    { y: distance / 2 },
    {
      y: -distance / 2,
      ease,
      scrollTrigger: {
        trigger: target as gsap.DOMTarget,
        start,
        end,
        scrub,
      },
    },
  )
}

export { gsap, ScrollTrigger }
