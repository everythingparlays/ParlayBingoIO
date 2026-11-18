import React, { useRef, useState } from 'react'
import { trackBusinessFaq } from 'services/analytics'
import BusinessSection from '../../components/BusinessSection'
import SectionHeading from '../../components/SectionHeading'
import CtaRow from '../../components/CtaRow'
import Card from '../../components/Card'
import Reveal from '../../components/Reveal'
import Placeholder, { DraftNote } from '../../components/Placeholder'
import { CTA_VARIANTS } from '../../sectionsConfig'
import {
  FAQ_ACCENT,
  FAQ_ITEMS,
  FAQ_MORE_PROMPT,
  FAQ_PENDING,
  FAQ_TITLE,
} from './content'
import styles from './Faq.module.css'

const SECTION_ID = 'faq'

const questionId = (i: number) => `${SECTION_ID}-q-${i + 1}`
const answerId = (i: number) => `${SECTION_ID}-a-${i + 1}`

function Chevron() {
  return (
    <svg
      className={styles['chevron-svg']}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 5.25L7 9.25L11 5.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * US-08 FAQ: an accordion of eight questions (several may be open at once).
 * Each question is a real <button> inside an <h3>; Enter/Space toggle it
 * natively, and ArrowUp/ArrowDown/Home/End move focus between questions.
 * Panels open by animating grid-template-rows 0fr -> 1fr (no JS measuring);
 * a closed panel is visibility: hidden, so its content is out of the tab
 * order and the accessibility tree exactly as with the `hidden` attribute.
 */
export default function Faq() {
  const [open, setOpen] = useState<readonly boolean[]>(() =>
    FAQ_ITEMS.map(() => false)
  )
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  const toggle = (index: number) => {
    // tracked outside the updater so StrictMode's double-invoke can't double-fire it
    trackBusinessFaq(FAQ_ITEMS[index].question, !open[index])
    setOpen((prev) => prev.map((isOpen, i) => (i === index ? !isOpen : isOpen)))
  }

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const last = FAQ_ITEMS.length - 1
    let next: number
    switch (event.key) {
      case 'ArrowDown':
        next = index === last ? 0 : index + 1
        break
      case 'ArrowUp':
        next = index === 0 ? last : index - 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = last
        break
      default:
        return
    }
    event.preventDefault()
    buttons.current[next]?.focus()
  }

  return (
    <BusinessSection id={SECTION_ID} tone="indigo">
      <div className={styles['layout']}>
        <SectionHeading
          id={`${SECTION_ID}-heading`}
          title={FAQ_TITLE}
          accent={FAQ_ACCENT}
        />

        <div className={styles['main']}>
          <Reveal as="ul" className={styles['list']}>
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = open[i]
              return (
                <Card
                  key={item.question}
                  as="li"
                  tone="surface"
                  radius="md"
                  interactive
                  className={[styles['item'], isOpen ? styles['open'] : '']
                    .filter(Boolean)
                    .join(' ')}
                >
                  <h3 className={styles['question']}>
                    <button
                      ref={(el) => {
                        buttons.current[i] = el
                      }}
                      type="button"
                      id={questionId(i)}
                      className={`${styles['trigger']} biz-focus`}
                      aria-expanded={isOpen}
                      aria-controls={answerId(i)}
                      onClick={() => toggle(i)}
                      onKeyDown={(event) => onKeyDown(event, i)}
                    >
                      <span className={styles['question-text']}>
                        {item.question}
                      </span>
                      <span className={styles['chevron']} aria-hidden="true">
                        <Chevron />
                      </span>
                    </button>
                  </h3>
                  <div className={styles['panel']}>
                    <div
                      id={answerId(i)}
                      role="region"
                      aria-labelledby={questionId(i)}
                      className={styles['region']}
                    >
                      <div className={styles['answer']}>
                        {item.answer ? (
                          <>
                            <p className={styles['answer-text']}>
                              {item.answer}
                            </p>
                            <DraftNote className={styles['draft']} />
                          </>
                        ) : (
                          <Placeholder>{FAQ_PENDING}</Placeholder>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </Reveal>

          <div className={styles['more']}>
            <p className={styles['more-prompt']}>{FAQ_MORE_PROMPT}</p>
            <CtaRow
              label={CTA_VARIANTS.faq}
              location={SECTION_ID}
              align="left"
            />
          </div>
        </div>
      </div>
    </BusinessSection>
  )
}
