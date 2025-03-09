export type SatellitesType = {
  name: string
  azimuth: number
  range: number
}

export type SatellitesResponseType = {
  satettiles: SatellitesType[]
}
