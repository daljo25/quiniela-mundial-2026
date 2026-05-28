'use client'

import Image from 'next/image'
import { useTheme } from './ThemeProvider'

export default function Logo({ size = 32 }: { size?: number }) {
  const { resolved } = useTheme()

  const src = resolved === 'dark' ? '/logo-dark.svg' : '/logo.svg'
  const alt = 'Quiniela daljo25'

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      priority
      style={{ width: size, height: size }}
    />
  )
}
