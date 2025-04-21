import {
  Box,
  Table,
  TableBody,
  Card,
  CardContent,
  Skeleton,
} from '@mui/material'
import { memo, forwardRef } from 'react'

import {
  StyledTableRow,
  StyledTableCell,
} from '~/shared/components/styled/table/StyledTable'

const SignUpRequestSkeleton = memo(() => {
  return (
    <Card
      sx={{
        border: '2px solid black',
        borderRadius: 5,
        minWidth: '300px',
        maxWidth: '300px',
        wordWrap: 'break-word',
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Table size='small'>
          <TableBody>
            {Array.from({ length: 6 }).map((_, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell sx={{ width: '40%', verticalAlign: 'top' }}>
                  <Skeleton variant='text' width='40%' />
                </StyledTableCell>
                <StyledTableCell sx={{ width: '60%' }}>
                  <Skeleton
                    variant='text'
                    width={index % 2 === 0 ? '80%' : '60%'}
                    sx={{ borderRadius: 1 }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Box
          display='flex'
          width='100%'
          justifyContent='space-around'
          mt={2}
          gap={1}
        >
          <Skeleton variant='circular' width={40} height={40} />
          <Skeleton variant='circular' width={40} height={40} />
        </Box>
      </CardContent>
    </Card>
  )
})

export default SignUpRequestSkeleton
