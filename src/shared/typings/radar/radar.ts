export type SatellitesType = {
  name: string
  azimuth: number
  range: number
}

export type SatellitesResponseType = {
  data: {satettiles: SatellitesType[]}
}
