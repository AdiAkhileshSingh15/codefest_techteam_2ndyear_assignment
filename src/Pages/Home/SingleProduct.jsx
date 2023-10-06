import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GetSingleWorkout } from "../../Actions/workoutActions"
import { toast } from "react-toastify"

const SingleProduct = () => {
  const { id } = useParams()
  const [Singleworkout, setSingleWorkout] = useState({
    title: "",
    load: "",
    reps: "",
    "Created At": "",
    "Updated At": "",
  })
  useEffect(() => {
    GetSingleWorkout(id)
      .then((data) => {
        setSingleWorkout(data.data)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  })

  return (
    <div
      className="container"
      style={{
        minWidth: "fit-content",
        margin: "auto",
        marginTop: "10rem",
        padding: "2rem",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "200px 200px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: "800",
          }}
        >
          {Object.keys(Singleworkout).map((val, key) => {
            return <p key={key}>{val}</p>
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {Object.values(Singleworkout).map((val, key) => {
            return <p key={key}>{val}</p>
          })}
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
