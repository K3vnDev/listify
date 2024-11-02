import Image from 'next/image'

interface Props {
  className?: string
}

export const AppLogo = ({ className = '' }: Props) => (
  <Image
    src='/app-logo.png'
    className={`size-8 text-white text-xs ${className}`}
    alt='App logo'
    draggable={false}
    width={32}
    height={32}
  />
)
