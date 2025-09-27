import { Box, Typography } from '@mui/material'

interface DataPointProps {
  label: string
  children: React.ReactNode
}

export function DataPoint({ label, children }: DataPointProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="body2" fontWeight="bold">
        {label}:
      </Typography>
      <Typography variant="body2">{children}</Typography>
    </Box>
  )
}
