import React from 'react'

type Props = {
  width?: string
  height?: string
}

function LineColumns({ width = '51', height = '59' }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 51 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.5 24H51" stroke="#F8AC1C" />
      <path d="M0.5 35.5H51" stroke="#F8AC1C" />
      <path d="M0.5 47H51" stroke="#F8AC1C" />
      <path d="M0.5 58.5H51" stroke="#F8AC1C" />
      <path d="M0.5 12.5H51" stroke="#F8AC1C" />
      <path d="M0.5 1H51" stroke="#F8AC1C" />
    </svg>
  )
}

export default LineColumns