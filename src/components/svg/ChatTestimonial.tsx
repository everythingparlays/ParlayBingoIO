import React from 'react'

type Props = {
  className?: string
  width?: string
  height?: string
}

const ChatTestimonial = ({ className, width, height }: Props) => {
  return (
    <svg
      width={width || '47'}
      height={height || '46'}
      viewBox="0 0 47 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.81665 0.867188L46.1728 0.867187V45.0993L32.4351 35.4777H0.81665L0.81665 0.867188Z"
        fill="#F8AC1C"
      />
    </svg>
  )
}

export default ChatTestimonial