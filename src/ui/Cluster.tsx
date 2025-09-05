"use client"

interface ClusterProps {
  lat: number
  lng: number
  pointCount: number
  totalPoints: number
  onClickAction: () => void
}

const MIN_CLUSTER_SIZE = 25
const MAX_CLUSTER_SIZE = 100

export const Cluster = ({ pointCount, totalPoints, onClickAction, ...rest }: ClusterProps) => {
  const diameter = MIN_CLUSTER_SIZE + (pointCount / totalPoints) * (MAX_CLUSTER_SIZE - MIN_CLUSTER_SIZE)
  return (
    <div
      onClick={onClickAction}
      style={{
        width: diameter.toString() + "px",
        height: diameter.toString() + "px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "translateX(-50%) translateY(-50%)",
        borderRadius: "100%",
        border: "3px solid black",
        background: "orange",
        color: "black",
        fontSize: "14px",
        letterSpacing: "1px",
        fontWeight: "bold",
      }}
      {...rest}
    >
      x{pointCount}
    </div>
  )
}
