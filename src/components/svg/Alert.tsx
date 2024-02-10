import SVGType from "types/SVGType";

export default function Alert({ color } : SVGType) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.36719 16.3281C4.01562 16.3281 0.398438 12.7109 0.398438 8.35938C0.398438 4 4.00781 0.390625 8.35938 0.390625C12.7188 0.390625 16.3359 4 16.3359 8.35938C16.3359 12.7109 12.7266 16.3281 8.36719 16.3281ZM8.29688 5.58594C8.88281 5.58594 9.34375 5.11719 9.34375 4.52344C9.34375 3.92969 8.88281 3.46094 8.29688 3.46094C7.71094 3.46094 7.24219 3.92969 7.24219 4.52344C7.24219 5.11719 7.71094 5.58594 8.29688 5.58594ZM6.96094 12.8828H10.2344C10.5703 12.8828 10.8281 12.6406 10.8281 12.3047C10.8281 11.9922 10.5703 11.7344 10.2344 11.7344H9.24219V7.64844C9.24219 7.21094 9.02344 6.91406 8.60938 6.91406H7.09375C6.76562 6.91406 6.50781 7.17188 6.50781 7.48438C6.50781 7.82031 6.76562 8.0625 7.09375 8.0625H7.95312V11.7344H6.96094C6.625 11.7344 6.36719 11.9922 6.36719 12.3047C6.36719 12.6406 6.625 12.8828 6.96094 12.8828Z" fill={color}/>
    </svg>
  )
}