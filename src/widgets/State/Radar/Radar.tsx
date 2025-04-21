import { GroupProvider } from '~/features/State/context/GroupContext'
import RadarDisplay from '~/features/State/RadarDisplay/RadarDisplay'

const Radar = () => {
  return (
    <GroupProvider>
      <RadarDisplay />
      </GroupProvider>
  )
}

export default Radar
