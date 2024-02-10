import SVGType from 'types/SVGType'

export default function Mail({ color }: SVGType) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.1249 6.25H6.87488C5.71494 6.25124 4.60286 6.71258 3.78266 7.53278C2.96245 8.35298 2.50112 9.46506 2.49988 10.625V29.375C2.50112 30.5349 2.96245 31.647 3.78266 32.4672C4.60286 33.2874 5.71494 33.7488 6.87488 33.75H33.1249C34.2848 33.7488 35.3969 33.2874 36.2171 32.4672C37.0373 31.647 37.4986 30.5349 37.4999 29.375V10.625C37.4986 9.46506 37.0373 8.35298 36.2171 7.53278C35.3969 6.71258 34.2848 6.25124 33.1249 6.25ZM32.0171 13.4867L20.7671 22.2367C20.5477 22.4073 20.2777 22.4998 19.9999 22.4998C19.722 22.4998 19.4521 22.4073 19.2327 22.2367L7.98269 13.4867C7.85051 13.3869 7.73949 13.2618 7.65608 13.1187C7.57266 12.9756 7.51852 12.8174 7.49679 12.6532C7.47506 12.489 7.48619 12.3221 7.52951 12.1622C7.57284 12.0024 7.64751 11.8527 7.74917 11.7219C7.85084 11.5912 7.97748 11.4819 8.12174 11.4005C8.26599 11.3191 8.42498 11.2672 8.58947 11.2478C8.75397 11.2284 8.92067 11.2419 9.07991 11.2874C9.23915 11.333 9.38775 11.4098 9.51707 11.5133L19.9999 19.6664L30.4827 11.5133C30.7448 11.3153 31.0743 11.2285 31.4 11.2716C31.7256 11.3147 32.0212 11.4842 32.2228 11.7435C32.4244 12.0028 32.5159 12.3311 32.4774 12.6573C32.4389 12.9835 32.2735 13.2815 32.0171 13.4867Z"
        fill={color}
      />
    </svg>
  )
}
