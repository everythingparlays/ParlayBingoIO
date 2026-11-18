import React from 'react'

export interface ScreenCaptureProps {
  /** Native capture (PNG, ~378px wide): fallback for browsers without WebP. */
  src: string
  /** 660px-wide Lanczos resample of `src` (WebP): what every WebP browser gets. */
  src2x: string
  /** Native pixel size of the PNG (reserves the aspect ratio). */
  width: number
  height: number
  alt: string
  loading?: 'lazy' | 'eager'
}

/**
 * A phone-screen capture for PhoneFrame. The 660px WebP is served at every
 * pixel density: it is ~3x smaller than the 378px PNG, and the ~300px
 * phones need more than 378 device px of screen from about 1.25dppx up
 * (e.g. Windows at 125% scaling), so a density cutoff would only ever pick
 * the heavier, softer file. The PNG remains as the non-WebP fallback.
 */
export default function ScreenCapture({
  src,
  src2x,
  width,
  height,
  alt,
  loading = 'lazy',
}: ScreenCaptureProps) {
  return (
    <picture>
      <source type="image/webp" srcSet={src2x} />
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        loading={loading}
        decoding="async"
      />
    </picture>
  )
}
