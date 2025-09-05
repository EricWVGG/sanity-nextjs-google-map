import { sanityFetch, mapLocationsQuery } from "@/sanity"
import { Map } from "@/ui"

export default async function MapLocationsPage() {
  const { data } = await sanityFetch({
    query: mapLocationsQuery,
  })
  if (!data) throw new Error("error loading map locations from Sanity")
  return <Map locations={data} />
}
