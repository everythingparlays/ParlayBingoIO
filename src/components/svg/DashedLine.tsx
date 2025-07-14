import React from 'react'

type DashedLineProps = {
  width?: number
  height?: number
}

const DashedLine = ({ width = 78, height = 4 }: DashedLineProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 78 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 2H78"
        stroke="url(#paint0_linear_2035_10749)"
        stroke-width="3"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2035_10749"
          x1="0"
          y1="2.5"
          x2="78"
          y2="2.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="0.533654" stop-color="#848FBF" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default DashedLine