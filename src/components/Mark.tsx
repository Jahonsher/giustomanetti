/** Wordmark: GIUSTO MANETTI / Battiloro · Firenze 1600 (same as the previous site). */
export function Mark({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const big = size === 'lg' ? 'text-3xl md:text-4xl' : size === 'sm' ? 'text-base' : 'text-[1.05rem] md:text-[1.2rem]'
  const small = size === 'lg' ? 'text-[0.7rem] mt-2' : 'text-[0.5rem] mt-1'
  return (
    <span className={`inline-flex flex-col items-start leading-none ${className}`}>
      <b className={`font-display font-normal uppercase tracking-[0.14em] text-bone ${big}`}>Giusto Manetti</b>
      <span className={`font-sans uppercase tracking-[0.34em] text-sand ${small}`}>Battiloro · Firenze 1600</span>
    </span>
  )
}
