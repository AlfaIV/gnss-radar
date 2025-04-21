export type SatellitesType = {
  name: string
  azimuth: number
  range: number
  elevation: number
}

export type SatellitesResponseType = {
  data: { satellites: SatellitesType[] }
}
