import React from 'react'
import styles from './Placeholder.module.css'

export interface PlaceholderProps {
  /** Marker text. Default "[PLACEHOLDER]". */
  label?: string
  /** What is pending, e.g. "UND sponsor logos pending". */
  children?: React.ReactNode
  /** Small inline chip instead of a dashed block. */
  inline?: boolean
  className?: string
}

/**
 * Visible marker for any content OBS has not supplied yet (required by the
 * brief, so pending items can't ship unnoticed). Search the DOM for
 * [data-placeholder] to list every open item on the page.
 */
export default function Placeholder({
  label = '[PLACEHOLDER]',
  children,
  inline = false,
  className,
}: PlaceholderProps) {
  const Tag = inline ? 'span' : 'div'
  return (
    <Tag
      data-placeholder=""
      className={[styles['placeholder'], inline ? styles['inline'] : styles['block'], className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles['label']}>{label}</span>
      {children && (
        <>
          {' '}
          <span className={styles['text']}>{children}</span>
        </>
      )}
    </Tag>
  )
}

export interface DraftNoteProps {
  className?: string
}

/**
 * Small italic chip reading "Draft — pending OBS approval", for FAQ answers
 * and other copy written by us that OBS still has to sign off.
 */
export function DraftNote({ className }: DraftNoteProps) {
  return (
    <span data-draft="" className={[styles['draft'], className].filter(Boolean).join(' ')}>
      Draft — pending OBS approval
    </span>
  )
}
