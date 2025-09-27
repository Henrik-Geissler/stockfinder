import { useState } from 'react'
import {
  Box,
  ButtonGroup,
  Button,
  Paper,
  Typography,
  CircularProgress,
  useTheme,
} from '@mui/material'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useHistoricalEod } from '../hooks/useHistoricalEod'

// Time period options
const TIME_PERIODS = [
  { label: 'Today', value: '1d' },
  { label: '1W', value: '1w' },
  { label: '1M', value: '1m' },
  { label: 'YTD', value: 'ytd' },
  { label: '1Y', value: '1y' },
  { label: '3Y', value: '3y' },
  { label: '5Y', value: '5y' },
  { label: 'Max', value: 'max' },
] as const

interface SecurityChartProps {
  symbol: string
}

export function SecurityChart({ symbol }: SecurityChartProps) {
  const theme = useTheme()
  const [selectedPeriod, setSelectedPeriod] =
    useState<(typeof TIME_PERIODS)[number]['value']>('1y')

  // Fetch historical price data from API
  const {
    data: historicalData,
    isLoading,
    error,
    isFetching,
  } = useHistoricalEod(symbol, selectedPeriod)

  // Calculate chart color based on price change from first to last data point
  const getChartColor = () => {
    if (!historicalData || historicalData.length < 2) {
      return theme.palette.primary.main // Default primary color
    }

    const firstPrice = historicalData[0][1] as number
    const lastPrice = historicalData[historicalData.length - 1][1] as number

    return lastPrice > firstPrice
      ? theme.palette.success.main
      : theme.palette.error.main
  }

  const chartOptions: Highcharts.Options = {
    title: {
      text: `${symbol} Stock Price`,
      style: {
        color: theme.palette.text.primary,
        fontSize: '18px',
      },
    },
    chart: {
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      },
    },
    xAxis: {
      type: 'datetime',
      labels: {
        style: {
          color: theme.custom.colors.textMuted,
        },
      },
      gridLineColor: theme.custom.colors.border,
    },
    yAxis: {
      title: {
        text: 'Price ($)',
        style: {
          color: theme.custom.colors.textMuted,
        },
      },
      labels: {
        style: {
          color: theme.custom.colors.textMuted,
        },
        formatter: function () {
          return '$' + Number(this.value).toFixed(2)
        },
      },
      gridLineColor: theme.custom.colors.border,
    },
    series: [
      {
        name: 'Price',
        type: 'line',
        data: historicalData || [],
        color: getChartColor(),
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
    ],
    legend: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: theme.custom.colors.tooltip,
      borderColor: theme.custom.colors.borderStrong,
      style: {
        color: theme.palette.text.primary,
      },
      formatter: function () {
        return (
          `<b>${symbol}</b><br/>` +
          `<b>Price:</b> $${this.y?.toFixed(2)}<br/>` +
          `<b>Date:</b> ${this.x ? new Date(this.x).toLocaleDateString() : 'N/A'}`
        )
      },
    },
    credits: {
      enabled: false,
    },
  }

  // Show loading screen only if we have no previous data
  if (isLoading && !historicalData) {
    return (
      <Paper sx={{ p: 3, mt: 3 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Loading chart data...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fetching historical prices for {symbol}
          </Typography>
        </Box>
      </Paper>
    )
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Error loading chart data
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {error.message}
        </Typography>
      </Paper>
    )
  }

  if (!historicalData || historicalData.length === 0) {
    return (
      <Paper sx={{ p: 3, mt: 3 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" gutterBottom>
            No chart data available
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No historical price data found for {symbol}
          </Typography>
        </Box>
      </Paper>
    )
  }

  return (
    <Paper
      sx={{
        p: 3,
        mt: 3,
        background: theme.custom.colors.surface,
        border: `1px solid ${theme.custom.colors.border}`,
        boxShadow: theme.custom.colors.shadow,
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <ButtonGroup variant="outlined" size="small">
          {TIME_PERIODS.map(period => (
            <Button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              variant={
                selectedPeriod === period.value ? 'contained' : 'outlined'
              }
              color={selectedPeriod === period.value ? 'primary' : 'inherit'}
            >
              {period.label}
            </Button>
          ))}
        </ButtonGroup>

        {/* Show loading indicator when fetching new data */}
        {isFetching && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={16} />
            <Typography variant="body2" color="text.secondary">
              Updating...
            </Typography>
          </Box>
        )}
      </Box>

      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Paper>
  )
}
