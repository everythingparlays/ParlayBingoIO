import React from 'react'

type Props = {
  width?: number
  height?: number
}

function FeatureDashedLine({ width = 201, height = 4 }: Props) {
  return (
    <svg
      width={width} 
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 2H201"
        stroke="url(#paint0_linear_535_28781)"
        stroke-width="3"
      />
      <defs>
        <linearGradient
          id="paint0_linear_535_28781"
          x1="0"
          y1="2.5"
          x2="201"
          y2="2.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="0.533654" stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default FeatureDashedLine
