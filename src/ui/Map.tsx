"use client"

import GoogleMapReact from "google-map-react"
import { useState, useMemo, useRef } from "react"
import { useWindowSize } from "usehooks-ts"
import { Pin } from "./Pin"
import dynamic from "next/dynamic"
import { Popup } from "./Popup"
import useSupercluster from "use-supercluster"
import { type PointFeature } from "supercluster"
import { Cluster } from "./Cluster"

const MAP_DEFAULT_LAT = 40.7230692
const MAP_DEFAULT_LNG = -73.9798029
const MAP_DEFAULT_ZOOM = 14
const MAP_CLUSTER_RADIUS = 120
const MAP_MAX_ZOOM = 20
const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY

const UnhydratedMap = ({ locations }: { locations: Sanity.MapLocationsQueryResult }) => {
  const { width } = useWindowSize()

  const [activeLocation, setActiveLocation] = useState<Member<Sanity.MapLocationsQueryResult> | null>(null)

  const [bounds, setBounds] = useState<[number, number, number, number]>([0, 0, 0, 0])
  const [zoom, setZoom] = useState(MAP_DEFAULT_ZOOM)
  const mapRef = useRef<any>(null)

  const points = useMemo(
    () =>
      locations
        .filter((location) => !!location.latitude && !!location.longitude)
        .map(
          (location) =>
            ({
              type: "Feature",
              properties: { cluster: false, locationData: location },
              geometry: {
                type: "Point",
                coordinates: [location.longitude, location.latitude],
              },
            } as PointFeature<MarkerProperties>)
        ),
    [locations]
  )

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: {
      radius: MAP_CLUSTER_RADIUS,
      maxZoom: MAP_MAX_ZOOM,
    },
  })

  const zoomOnCluster = (clusterId: number | string, lat: number, lng: number) => {
    if (typeof supercluster === "undefined") return
    const newZoom = Math.min(MAP_MAX_ZOOM, supercluster.getClusterExpansionZoom(typeof clusterId === "number" ? clusterId : Number(clusterId)))
    mapRef.current?.setZoom(newZoom)
    mapRef.current?.panTo({ lat, lng })
  }

  return (
    <main
      style={{
        // see NOTE 1
        height: width < 744 ? "80dvh" : "63dvw",
        width: "100%",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_KEY! }}
        defaultZoom={MAP_DEFAULT_ZOOM}
        options={{
          // see NOTE 2
          clickableIcons: false,
        }}
        defaultCenter={{
          lat: MAP_DEFAULT_LAT,
          lng: MAP_DEFAULT_LNG,
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom)
          setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat])
        }}
      >
        {clusters.map((mapItem) => {
          const [longitude, latitude] = mapItem.geometry.coordinates
          const { cluster: isCluster, point_count: pointCount, locationData } = mapItem.properties
          return isCluster && pointCount ? (
            <Cluster key={`cluster-${mapItem.id}`} lat={latitude} lng={longitude} pointCount={pointCount} totalPoints={points.length} onClickAction={() => zoomOnCluster(mapItem.id!, latitude, longitude)} />
          ) : (
            <Pin key={locationData._id} lat={latitude} lng={longitude} onClickAction={() => setActiveLocation(locationData)} />
          )
        })}

        {/* insert: cluster components */}

        <Popup location={activeLocation || undefined} lat={activeLocation?.latitude} lng={activeLocation?.longitude} />
      </GoogleMapReact>

      {/* see NOTE 3 */}
      <style type="text/css">{`.gm-style div > img {position: absolute;}`}</style>
    </main>
  )
}

interface MarkerProperties {
  cluster: boolean
  cluster_id?: number
  point_count?: number
  point_count_abbreviated?: number
  locationData: Member<Sanity.MapLocationsQueryResult>
}

export const Map = dynamic(() => Promise.resolve(UnhydratedMap), { ssr: false })
