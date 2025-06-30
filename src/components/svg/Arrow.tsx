import React from 'react'

type Props = {
  className?: string
}

function Arrow({ className }: Props) {
  return (
    <svg
      width="39"
      height="40"
      viewBox="0 0 39 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.33301 20L17.333 10M7.33301 20L17.333 30M7.33301 20L30.6663 20"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default Arrow