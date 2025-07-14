import React from 'react'

type Props = {
  width: string
  height: string
}



const Stars = ({width, height}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 91 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_535_39418)">
        <path
          d="M7.17979 0L8.87275 5.34673H14.3596L9.92131 8.65327L11.6181 14L7.17979 10.6935L2.74151 14L4.43828 8.65327L0 5.34673H5.48303L7.17979 0Z"
          fill="#F8AC1C"
        />
        <path
          d="M26.2445 0L27.9374 5.34673H33.4243L28.986 8.65327L30.6828 14L26.2445 10.6935L21.8062 14L23.503 8.65327L19.0647 5.34673H24.5477L26.2445 0Z"
          fill="#F8AC1C"
        />
        <path
          d="M45.3094 0L47.0024 5.34673H52.4892L48.0509 8.65327L49.7477 14L45.3094 10.6935L40.8712 14L42.5679 8.65327L38.1296 5.34673H43.6127L45.3094 0Z"
          fill="#F8AC1C"
        />
        <path
          d="M64.7555 0L66.4484 5.34673H71.9353L67.497 8.65327L69.1938 14L64.7555 10.6935L60.3172 14L62.014 8.65327L57.5757 5.34673H63.0587L64.7555 0Z"
          fill="#F8AC1C"
        />
        <path
          d="M83.8202 0L85.5131 5.34673H91L86.5617 8.65327L88.2585 14L83.8202 10.6935L79.3819 14L81.0787 8.65327L76.6404 5.34673H82.1234L83.8202 0Z"
          fill="#F8AC1C"
        />
      </g>
      <defs>
        <clipPath id="clip0_535_39418">
          <rect width="91" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Stars
