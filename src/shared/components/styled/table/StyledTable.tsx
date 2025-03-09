import { styled, TableRow, TableCell } from '@mui/material'

export const StyledTableRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: 'none',
}))
