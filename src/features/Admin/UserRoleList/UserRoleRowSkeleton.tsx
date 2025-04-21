import { Skeleton, MenuItem } from '@mui/material'
import { memo } from 'react'

import {
  StyledTableRow,
  StyledTableCell,
} from '~/shared/components/styled/table/StyledTable'

const UserRoleRowSkeleton = memo(() => {
  return (
    <StyledTableRow>
      <StyledTableCell sx={{ width: '20%' }}>
        <Skeleton
          variant='text'
          height={32}
          sx={{ fontSize: '24px', borderRadius: 1 }}
        />
      </StyledTableCell>

      <StyledTableCell sx={{ width: '20%' }}>
        <Skeleton
          variant='text'
          height={32}
          sx={{ fontSize: '24px', borderRadius: 1 }}
        />
      </StyledTableCell>

      <StyledTableCell sx={{ width: '20%' }}>
        <Skeleton
          variant='text'
          height={32}
          sx={{ fontSize: '24px', borderRadius: 1 }}
        />
      </StyledTableCell>

      <StyledTableCell sx={{ width: '20%' }}>
        <Skeleton
          variant='text'
          height={32}
          sx={{ fontSize: '24px', borderRadius: 1 }}
        />
      </StyledTableCell>

      <StyledTableCell sx={{ width: '20%' }}>
        <Skeleton
          variant='rectangular'
          width={140}
          height={40}
          sx={{ borderRadius: 1 }}
        />
      </StyledTableCell>
    </StyledTableRow>
  )
})

export default UserRoleRowSkeleton
