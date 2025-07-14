import React from 'react'

type Props = {width?: number, height?: number}

function NewToPlaySquare({width = 478, height = 294}: Props) {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox="0 0 478 294"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="477.515"
        y="291.528"
        width="476.274"
        height="291.111"
        rx="40"
        transform="rotate(179.779 477.515 291.528)"
        fill="#1D184C"
      />
    </svg>
  )
}

export default NewToPlaySquare