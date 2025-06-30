import React from 'react'

type Props = {width?: number, height?: number}

function Leaders({width, height}: Props) {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="8.68164"
        y="50.2062"
        width="58.5136"
        height="60.7311"
        rx="10"
        transform="rotate(-46.1623 8.68164 50.2062)"
        fill="#6369A7"
      />
      <path
        d="M16.9701 64.3499L19.4551 71.7179L27.4253 71.6941L20.9909 76.2715L23.4758 83.6395L17.0141 79.1005L10.5797 83.678L13.0206 76.2953L6.55893 71.7564L14.5292 71.7326L16.9701 64.3499Z"
        fill="#1D184C"
      />
      <path
        d="M69.4161 17.5489L70.0367 22.8732L75.4147 23.9985L70.4202 26.1638L71.0408 31.4881L67.3335 27.502L62.339 29.6673L65.0422 25.0385L61.3349 21.0524L66.7129 22.1777L69.4161 17.5489Z"
        fill="#1D184C"
      />
      <rect
        x="33"
        y="58.0001"
        width="17"
        height="24"
        fill="#303083"
        stroke="#F8AC1C"
        stroke-width="5"
      />
      <rect
        x="67"
        y="51.0001"
        width="17"
        height="31"
        fill="#303083"
        stroke="#F8AC1C"
        stroke-width="5"
      />
      <rect
        x="50"
        y="38.0001"
        width="17"
        height="44"
        fill="url(#paint0_linear_554_39704)"
        stroke="#F8AC1C"
        stroke-width="5"
      />
      <rect
        x="24.5"
        y="15.5001"
        width="33"
        height="33"
        rx="16.5"
        fill="#D9EEFB"
      />
      <rect
        x="24.5"
        y="15.5001"
        width="33"
        height="33"
        rx="16.5"
        stroke="#1D184C"
        stroke-width="3"
      />
      <path
        d="M40.848 26.7201H36.816V23.2401H44.568V41.0001H40.848V26.7201Z"
        fill="#1D184C"
      />
      <defs>
        <linearGradient
          id="paint0_linear_554_39704"
          x1="38.5"
          y1="93.0001"
          x2="60.9086"
          y2="97.5339"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#DB2156" />
          <stop offset="1" stop-color="#F8AC1C" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Leaders