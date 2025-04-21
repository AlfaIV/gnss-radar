
export type SatellitesType = {
  name: string
  azimuth: number
  range: number
  elevation: number
  group: string
}

export type SatellitesResponseType = {
  data: { satellites: SatellitesType[] }
}

export interface GroupContextType {
    groups: string[]
    setAvailableGroups: (groups: string[]) => void
    selectedGroups: string[]
    setSelectedGroups: (groups: string[]) => void
}