import SVGType from "types/SVGType";
import React from "react";

export default function Calendar({ color } : SVGType) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.5 2H9V1H8V2H4V1H3V2H2.5C1.945 2 1.505 2.45 1.505 3L1.5 10C1.5 10.55 1.945 11 2.5 11H9.5C10.05 11 10.5 10.55 10.5 10V3C10.5 2.45 10.05 2 9.5 2ZM4.5 5.5H3.5V6.5H4.5V5.5ZM6.5 5.5H5.5V6.5H6.5V5.5ZM7.5 5.5H8.5V6.5H7.5V5.5ZM2.5 10H9.5V4.5H2.5V10Z" fill={color}/>
    </svg>
  )
}