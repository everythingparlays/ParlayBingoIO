import SVGType from "types/SVGType";
import React from "react";

export default function ExpandArrow({ color } : SVGType) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.94 5.72668L8 8.78002L11.06 5.72668L12 6.66668L8 10.6667L4 6.66668L4.94 5.72668Z" fill={color}/>
    </svg>
  )
}
