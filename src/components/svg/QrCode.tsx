import React from 'react'

type Props = {
  width?: string
  height?: string
}

const QrCode = (props: Props) => {
  return (
    <svg
      width={props.width || '273'}
      height={props.height || '273'}
      viewBox="0 0 273 273"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g filter="url(#filter0_d_2064_7625)">
        <rect x="8" y="4" width="257" height="257" rx="10" fill="white" />
        <rect
          x="8"
          y="4"
          width="257"
          height="257"
          rx="10"
          fill="url(#pattern0_2064_7625)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2064_7625"
          x="0"
          y="0"
          width="273"
          height="273"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2064_7625"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2064_7625"
            result="shape"
          />
        </filter>
        <pattern
          id="pattern0_2064_7625"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_2064_7625" transform="scale(0.00337838)" />
        </pattern>
        <image
          id="image0_2064_7625"
          width="296"
          height="296"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  )
}

export default QrCode
