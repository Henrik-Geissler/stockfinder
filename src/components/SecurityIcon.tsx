type SecurityIconProps = {
  symbol: string
  name?: string
  size?: number
}

export default function SecurityIcon({
  symbol,
  name,
  size = 30,
}: SecurityIconProps) {
  const iconSrc = `https://images.financialmodelingprep.com/symbol/${symbol}.png`
  const iconAlt = `${name ?? symbol} Logo`

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Hide the image if it fails to load
    e.currentTarget.style.visibility = 'hidden'
  }

  return (
    <img
      src={iconSrc}
      alt={iconAlt}
      width={size}
      height={size}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        display: 'block',
        borderRadius: `${size * 0.2}px`,
      }}
      onError={handleImageError}
    />
  )
}
