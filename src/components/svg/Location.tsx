import SVGType from "types/SVGType";
import React from "react";

export default function Location({ color } : SVGType) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 5.33337C12 3.12671 10.2067 1.33337 8.00004 1.33337C5.79337 1.33337 4.00004 3.12671 4.00004 5.33337C4.00004 8.33337 8.00004 12.6667 8.00004 12.6667C8.00004 12.6667 12 8.33337 12 5.33337ZM6.66671 5.33337C6.66671 4.60004 7.26671 4.00004 8.00004 4.00004C8.73337 4.00004 9.33337 4.60004 9.33337 5.33337C9.33337 6.06671 8.74004 6.66671 8.00004 6.66671C7.26671 6.66671 6.66671 6.06671 6.66671 5.33337ZM3.33337 14.6667V13.3334H12.6667V14.6667H3.33337Z" fill={color}/>
    </svg>
  )
}
