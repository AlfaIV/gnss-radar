
export type SatellitesType = {
  name: string
  azimuth: number
  range: number
  elevation: number
  group: string
}

export type SatellitesInterval = {
  startDatetime: string
  endDatetime: string
}

export type SatellitesIntervalsType = {
  name: string
  group: string
  intervals: SatellitesInterval[]
}

export type SatellitesIntervalsResponseType = {
  data: { satellites: SatellitesIntervalsType[] }
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