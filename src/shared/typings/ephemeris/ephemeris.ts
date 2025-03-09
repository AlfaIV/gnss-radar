export type EphemerisResponseEntityType = {
  name: string
  datetime: string
}

export type EphemerisResponseType = {
  data: {
    ephemeris: EphemerisResponseEntityType[]
    total: number
    page: number
  }
}
