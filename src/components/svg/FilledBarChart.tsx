import SVGType from "types/SVGType";

export default function FilledBarChart({ color } : SVGType) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.34147 2.42505H14.2581C15.0373 2.42505 15.6748 3.06255 15.6748 3.84172V13.7584C15.6748 14.5375 15.0373 15.175 14.2581 15.175H4.34147C3.5623 15.175 2.9248 14.5375 2.9248 13.7584V3.84172C2.9248 3.06255 3.5623 2.42505 4.34147 2.42505ZM5.75814 12.3417H7.1748V7.38338H5.75814V12.3417ZM10.0081 12.3417H8.59147V5.25838H10.0081V12.3417ZM11.4248 12.3417H12.8415V9.50838H11.4248V12.3417Z" fill={color}/>
    </svg>
  )
}