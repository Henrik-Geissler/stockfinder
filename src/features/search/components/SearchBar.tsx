import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Paper,
  useTheme,
} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SearchDropdown } from './SearchDropdown'
import { useDebounce } from '../../../hooks/useDebounce'

interface SearchBarProps {
  placeholder?: string
  className?: string
}

export function SearchBar({
  placeholder = 'Search securities...',
  className = '',
}: SearchBarProps) {
  const theme = useTheme()
  const [query, setQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // Debounce the search query to avoid too many API calls
  const debouncedQuery = useDebounce(query, 300)

  // Initialize with current search params if available
  useEffect(() => {
    const currentQuery = searchParams.get('q')
    if (currentQuery) {
      setQuery(currentQuery)
    }
  }, [searchParams])

  // Focus the search input on mount
  useEffect(() => {
    const searchInput = searchContainerRef.current?.querySelector('input')
    if (searchInput) {
      searchInput.focus()
    }
  }, [])

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false)
      setIsFocused(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsDropdownOpen(false)
      setIsFocused(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsDropdownOpen(value.length >= 2)
  }

  const handleInputFocus = () => {
    setIsFocused(true)
    if (query.length >= 2) {
      setIsDropdownOpen(true)
    }
  }

  const handleDropdownClose = () => {
    setIsDropdownOpen(false)
    setIsFocused(false)
  }

  return (
    <Box
      className={className}
      ref={searchContainerRef}
      sx={{ position: 'relative', width: '100%' }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          background: theme.custom.colors.surface,
          border: `1px solid ${theme.custom.colors.borderStrong}`,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          sx={{
            '& .MuiOutlinedInput-root': {
              border: 'none',
              background: 'transparent',
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" sx={{ color: 'primary.main' }}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <SearchDropdown
        query={debouncedQuery}
        isOpen={isDropdownOpen && isFocused}
        onClose={handleDropdownClose}
      />
    </Box>
  )
}
