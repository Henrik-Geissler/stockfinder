import { Typography, Skeleton, TypographyProps } from '@mui/material'

interface SkeletonTextProps extends Omit<TypographyProps, 'children'> {
  content?: string
  isLoading?: boolean
  width?: string | number
  height?: string | number
}

export function SkeletonText({
  content,
  isLoading = false,
  ...typographyProps
}: SkeletonTextProps) {

  if (isLoading) {
    return (
      <Typography
        {...typographyProps}
        style={{ ...typographyProps.style, visibility: 'hidden' }}
      >
        <Skeleton variant="rectangular" />
      </Typography>
    )
  }

  if (!content) {
    return (
      <Typography
        {...typographyProps}
        style={{ ...typographyProps.style, visibility: 'hidden' }}
      >
        Placeholder
      </Typography>
    )
  }

  return <Typography {...typographyProps}>{content}</Typography>
}
