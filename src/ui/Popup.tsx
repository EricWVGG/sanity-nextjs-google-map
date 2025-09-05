"use client"

interface PopupProps {
  lat?: number
  lng?: number
  location?: Member<Sanity.MapLocationsQueryResult>
}
export const Popup = ({ location, ...rest }: PopupProps) => (
  <div
    style={{
      display: !!rest.lat && !!rest.lng ? "block" : "none",
      padding: "4px",
      background: "green",
      color: "white",
    }}
    {...rest}
  >
    <div>
      <strong>{location?.name}</strong>
    </div>
    <div>
      <em>{location?.streetAddress}</em>
    </div>
  </div>
)
