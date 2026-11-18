import React from 'react'

/**
 * "Fan profile in the crosshairs" sticker for the retargeting card, drawn in
 * the same language as components/svg stickers (tilted #6369A7 tile, crimson
 * -> gold fill, #1D184C outline). No existing sticker reads as targeting.
 * Rendered once on the page, so the fixed gradient/clip ids are unique.
 */
export default function TargetSticker({ size = 88 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 258 258"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="34"
        y="34"
        width="190"
        height="190"
        rx="30"
        transform="rotate(-8 129 129)"
        fill="#6369A7"
      />
      <circle cx="129" cy="133" r="88" fill="url(#biz-target-grad)" stroke="#1D184C" strokeWidth="8" />
      <circle cx="129" cy="133" r="62" fill="#fff" stroke="#1D184C" strokeWidth="8" />
      <circle cx="129" cy="133" r="40" fill="#1D184C" />
      <g clipPath="url(#biz-target-clip)">
        <circle cx="129" cy="123" r="12" fill="url(#biz-target-grad)" />
        <path
          d="M106 166C106 149 116 140 129 140C142 140 152 149 152 166Z"
          fill="url(#biz-target-grad)"
        />
      </g>
      <g stroke="#1D184C" strokeWidth="9" strokeLinecap="round">
        <path d="M129 26V58" />
        <path d="M129 208V240" />
        <path d="M22 133H54" />
        <path d="M204 133H236" />
      </g>
      <defs>
        <linearGradient
          id="biz-target-grad"
          x1="41"
          y1="221"
          x2="217"
          y2="45"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DB2156" />
          <stop offset="1" stopColor="#F8AC1C" />
        </linearGradient>
        <clipPath id="biz-target-clip">
          <circle cx="129" cy="133" r="40" />
        </clipPath>
      </defs>
    </svg>
  )
}
