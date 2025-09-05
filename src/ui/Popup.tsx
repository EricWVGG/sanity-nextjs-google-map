"use client"

interface PopupProps {
  lat?: number
  lng?: number
  location?: ArrayElement<Sanity.MapLocationsQueryResult>
}
export const Popup = ({ location, ...rest }: PopupProps) => (
  <div
    style={{
      position: "absolute",
      display: !!location ? "block" : "none",
      padding: "4px",
      background: "green",
      color: "white",
      whiteSpace: "nowrap",
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
