import React from 'react'

type Props = { width?: string; height?: string }

const Whistle = ({ width = '302', height = '302' }: Props) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox="0 0 302 302"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="35"
        y="229.857"
        width="210.411"
        height="203.617"
        rx="30"
        transform="rotate(-81.0648 35 229.857)"
        fill="#6369A7"
      />
      <path
        d="M190.86 62.3221L176.26 91.2153L154.835 95.6256L175.456 54.8187L190.86 62.3221Z"
        fill="url(#paint0_linear_535_28657)"
        stroke="#1D184C"
        strokeWidth="8"
      />
      <path
        d="M120.096 50.599L130.399 100.655L112.39 104.362L102.086 54.306L120.096 50.599Z"
        fill="url(#paint1_linear_535_28657)"
        stroke="#1D184C"
        strokeWidth="8"
      />
      <path
        d="M91.6744 111.64C86.0327 114.109 80.7236 117.123 75.7969 120.608L43.7499 92.9291L54.7579 79.7527L91.6744 111.64Z"
        fill="url(#paint2_linear_535_28657)"
        stroke="#1D184C"
        strokeWidth="8"
      />
      <path
        d="M265.296 99.375C266.766 99.0726 268.196 100.02 268.494 101.48L274.806 132.141L199.403 172.223L196.526 173.753L197.441 176.879C197.956 178.638 198.406 180.435 198.781 182.259C206.337 218.967 183.893 254.515 146.133 262.288C108.395 270.056 71.513 244.752 65.5436 206.159C60.2183 171.745 82.2595 139.178 115.586 130.307L121.268 157.91L148.011 152.405L142.306 124.691L265.296 99.375Z"
        fill="url(#paint3_linear_535_28657)"
        stroke="#1D184C"
        strokeWidth="8"
      />
      <path
        d="M279.327 134.269L201.28 175.755C201.825 177.616 202.302 179.519 202.7 181.452L202.881 182.362C210.318 220.865 186.597 258.043 146.939 266.206L145.236 257.935C180.541 250.668 201.501 217.512 194.429 183.154C194.079 181.452 193.658 179.773 193.177 178.128L191.244 171.527L269.782 129.78L264.492 104.077L147.555 128.148L153.259 155.861L117.811 163.158L112.217 135.982C83.5791 145.899 65.2107 174.948 69.935 205.479C75.5148 241.552 109.978 265.193 145.236 257.935L146.939 266.206L146.003 266.392C106.361 274.014 67.8615 247.312 61.5906 206.77C55.7743 169.183 80.7398 133.756 117.763 125.664L118.641 125.479L118.674 125.472L124.379 153.185L143.287 149.293L137.582 121.58L264.489 95.4571C268.122 94.7093 271.673 97.0508 272.413 100.682L279.327 134.269Z"
        fill="#1D184C"
      />
      <circle
        cx="134.238"
        cy="204.165"
        r="26.6083"
        transform="rotate(-11.6313 134.238 204.165)"
        stroke="url(#paint4_linear_535_28657)"
        strokeWidth="8"
      />
      <defs>
        <linearGradient
          id="paint0_linear_535_28657"
          x1="147.892"
          y1="112.277"
          x2="207.474"
          y2="97.6765"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DB2156" />
          <stop offset="1" stopColor="#F8AC1C" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_535_28657"
          x1="111.277"
          y1="123.181"
          x2="139.555"
          y2="116.961"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DB2156" />
          <stop offset="1" stopColor="#F8AC1C" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_535_28657"
          x1="46.8887"
          y1="145.097"
          x2="106.577"
          y2="130.878"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DB2156" />
          <stop offset="1" stopColor="#F8AC1C" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_535_28657"
          x1="76.1799"
          y1="316"
          x2="318.234"
          y2="253.918"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DAEFFB" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_535_28657"
          x1="101.577"
          y1="249.489"
          x2="168.695"
          y2="247.456"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DB2156" />
          <stop offset="1" stopColor="#F8AC1C" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Whistle
