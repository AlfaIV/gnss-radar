import { styled, TableRow, TableCell } from '@mui/material'

export const StyledTableRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': {
    border: 'none',
  },
}))

export const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: 'none',
}))
