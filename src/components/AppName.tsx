import { fonts } from '@/consts'

interface Props {
  className?: string
}

export const AppName = ({ className = '' }: Props) => (
  <h2 className={`text-4xl font-bold text-slate-200 ${fonts.poppins} ${className}`}>LISTIFY</h2>
)
