import { defineQuery } from "next-sanity"

export const mapLocationsQuery = defineQuery(`
  *[_type == 'mapLocation']
`)
