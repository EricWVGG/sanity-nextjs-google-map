"use client"

interface PinProps {
  lat: number
  lng: number
  onClickAction?: () => void
}
export const Pin = ({ onClickAction, ...rest }: PinProps) => (
  <div
    style={{
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "30px",
      height: "30px",
      borderRadius: "100%",
      transform: "translateX(-50%) translateY(-50%)",
      background: "magenta",
      color: "white",
      cursor: "pointer",
    }}
    onClick={onClickAction}
    {...rest}
  >
    x
  </div>
)
