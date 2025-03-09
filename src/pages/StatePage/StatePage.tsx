import React from 'react'
import { Box } from '@mui/material'

import HeaderAndFooter from '~/widgets/Layout/HeaderAndFooter/HeaderAndFooter'
import Radar from '~/widgets/State/Radar/Radar'
import EphemerisTable from '~/widgets/State/EphemerisTable/EphemerisTable'

const StatePage = () => {
  return (
    <HeaderAndFooter>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <EphemerisTable />
        <Radar />
      </Box>
    </HeaderAndFooter>
  )
}

export default StatePage
