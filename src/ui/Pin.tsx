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
      width: "20px",
      height: "20px",
      background: "magenta",
      color: "black",
      cursor: "pointer",
      fontSize: "40px",
      borderRadius: "50% 50% 50% 0",
      border: "3px solid #000",
      transformOrigin: "bottom left",
      transform: "rotate(-45deg) translateX(100%)",
    }}
    onClick={onClickAction}
    {...rest}
  >
    <div
      style={{
        position: "absolute",
        content: "",
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        top: "50%",
        left: "50%",
        marginLeft: "-3.5px",
        marginTop: "-3.5px",
        backgroundColor: "#000",
      }}
    />
  </div>
)
