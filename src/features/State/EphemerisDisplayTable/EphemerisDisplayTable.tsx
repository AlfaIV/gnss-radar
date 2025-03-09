import { useState, memo } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import {
  Box,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import dayjs from 'dayjs'

import {
  StyledTableCell,
  StyledTableRow,
} from '~/shared/components/styled/table/StyledTable'
import useService from '~/entities/useService'
import {
  EphemerisResponseType,
} from '~/shared/typings/ephemeris/ephemeris'

const PAGE_SIZE = 10

const EphemerisDisplayTable = memo(() => {
  const [page, setPage] = useState(1)
  const { getEphemeris } = useService()
  const theme = useTheme()

  const { data, isLoading, isError, isFetching } = useQuery<
    EphemerisResponseType,
    Error,
    EphemerisResponseType
  >({
    queryKey: ['ephemeris', page],
    queryFn: ({ signal }) => getEphemeris({ page, size: PAGE_SIZE }, signal),
    staleTime: 5000,
  })

  const handlePreviousPage = () => setPage((old) => Math.max(old - 1, 1))
  const handleNextPage = () => {
    if (data?.data.total) {
      setPage((old) => old + 1)
    }
  }

  const totalPages = Math.ceil((data?.data.total || 0) / PAGE_SIZE)

  return (
    <Box
      sx={{
        width: 'auto',
        minWidth: 300,
        maxWidth: '100%',
        padding: 2,
        overflowX: 'auto',
      }}
    >
      <Typography
        variant='h6'
        sx={{ mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
      >
        Эфемериды
      </Typography>
      <Table
        sx={{
          minWidth: 600,
          [theme.breakpoints.down('sm')]: {
            minWidth: 'unset',
            width: '100%',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontSize: { xs: 14, sm: 16 },
                minWidth: 120,
                [theme.breakpoints.down('sm')]: { display: 'none' },
              }}
            >
              Название
            </TableCell>
            <TableCell
              sx={{
                fontSize: { xs: 14, sm: 16 },
                [theme.breakpoints.down('sm')]: { display: 'none' },
              }}
            >
              Дата
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading && (
            <StyledTableRow>
              <StyledTableCell
                sx={{
                  fontSize: { xs: 10, sm: 12 },
                  '&:before': {
                    [theme.breakpoints.down('sm')]: {
                      content: '"Название: "',
                      fontWeight: theme.typography.fontWeightBold,
                      marginRight: theme.spacing(1),
                    },
                  },
                }}
              >
                Загрузка списка эфемерид
              </StyledTableCell>
            </StyledTableRow>
          )}
          {isError && (
            <StyledTableRow>
              <StyledTableCell
                sx={{
                  color: 'red',
                  fontSize: { xs: 14, sm: 16 },
                  '&:before': {
                    [theme.breakpoints.down('sm')]: {
                      content: '"Название: "',
                      fontWeight: theme.typography.fontWeightBold,
                      marginRight: theme.spacing(1),
                    },
                  },
                }}
              >
                Произошла ошибка
              </StyledTableCell>
            </StyledTableRow>
          )}
          {data?.data.ephemeris.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell
                sx={{
                  padding: '6px',
                  fontSize: { xs: 14, sm: 16 },
                  '&:before': {
                    [theme.breakpoints.down('sm')]: {
                      content: '"Название: "',
                      fontWeight: theme.typography.fontWeightBold,
                      marginRight: theme.spacing(1),
                    },
                  },
                }}
              >
                {item.name}
              </StyledTableCell>

              <StyledTableCell
                sx={{
                    padding: '6px',
                  fontSize: { xs: 14, sm: 16 },
                  '&:before': {
                    [theme.breakpoints.down('sm')]: {
                      content: '"Дата: "',
                      fontWeight: theme.typography.fontWeightBold,
                      marginRight: theme.spacing(1),
                    },
                  },
                }}
              >
                {dayjs(item.datetime).format('DD.MM.YYYY, HH:mm:ss')}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>

        <TableFooter
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            padding: 2,
            gap: 1,
          }}
        >
          <Box
            sx={{
              fontSize: { xs: 12, sm: 14 },
              mb: { xs: 1, sm: 0 },
            }}
          >
            {`Страница ${page} из ${totalPages}`}
          </Box>

          <Box>
            <IconButton
              size='small'
              onClick={handlePreviousPage}
              disabled={page === 1 || isFetching}
            >
              <ChevronLeftIcon fontSize='inherit' />
            </IconButton>
            <IconButton
              size='small'
              onClick={handleNextPage}
              disabled={page >= totalPages || isFetching}
            >
              <ChevronRightIcon fontSize='inherit' />
            </IconButton>
          </Box>
        </TableFooter>
      </Table>
      {isLoading && <LinearProgress color='success' />}
    </Box>
  )
})

export default EphemerisDisplayTable
