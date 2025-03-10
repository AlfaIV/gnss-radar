import { Box } from '@mui/material'

import { FileProvider } from '~/features/State/context/StateContext'
import EphemerisDisplayTable from '~/features/State/EphemerisDisplayTable/EphemerisDisplayTable'
import EphemerisUploader from '~/features/State/EphemerisUploader/EphemerisUploader'

const EphemerisTable = () => {
  return (
    <Box>
      <FileProvider>
        <EphemerisDisplayTable />
        <EphemerisUploader />
      </FileProvider>
    </Box>
  )
}

export default EphemerisTable
