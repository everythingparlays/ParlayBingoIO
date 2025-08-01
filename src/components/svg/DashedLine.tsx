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
        strokeWidth="3"
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
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.533654" stopColor="#848FBF" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default DashedLine