import { Box } from '@mui/material'
import EphemerisDisplayTable from '~/features/State/EphemerisDisplayTable/EphemerisDisplayTable'
import EphemerisUploader from '~/features/State/EphemerisUploader/EphemerisUploader'

const EphemerisTable = () => {
  return <Box>
  <EphemerisDisplayTable />
  <EphemerisUploader /></Box>
}

export default EphemerisTable
