/** Didone wordmark: GIUSTO MANETTI / Battiloro · Firenze 1600. */
export function Mark({ size = 'md', className = '' }: { size?: 'md' | 'lg' | 'xl'; className?: string }) {
  const big = size === 'xl' ? 'text-5xl md:text-7xl' : size === 'lg' ? 'text-3xl md:text-4xl' : 'text-[1.15rem] md:text-[1.35rem]'
  const small = size === 'md' ? 'text-[0.5rem] mt-1' : 'text-[0.62rem] mt-2.5'
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <b className={`font-display font-normal uppercase tracking-[0.16em] ${big}`}>Giusto Manetti</b>
      <span className={`font-sans uppercase tracking-[0.42em] text-gold ${small}`}>Battiloro · Firenze 1600</span>
    </span>
  )
}
