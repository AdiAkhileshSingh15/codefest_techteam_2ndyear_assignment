import React, { useEffect, useState } from "react"
import Tile from "../../components/Tile"
import { GetAllWorkouts } from "../../Actions/workoutActions"
import { toast } from "react-toastify"
const Main = () => {
  const [newTile, setNewTile] = useState(false)
  const [workouts, setWorkouts] = useState([])
  const AddTile = () => {
    // now we show the blank tile
    setNewTile(true)
    localStorage.setItem("Adding", "true")
    window.dispatchEvent(new Event("storage"))
  }
  window.addEventListener("storage", () => {
    if (
      localStorage.getItem("Adding") === "false" ||
      localStorage.getItem("Adding") === "done"
    ) {
      setNewTile(false)
    }
  })
  useEffect(() => {
    GetAllWorkouts()
      .then((res) => {
        console.log("trigger")
        setWorkouts(res)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }, [workouts, newTile])
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "80vw",
        margin: "auto",
      }}
    >
      {workouts.length &&
        workouts.map((res, key) => {
          return (
            <Tile
              Reps={res.reps}
              Load={res.load}
              Title={res.title}
              key={key}
              id={res._id}
            />
          )
        })}
      <div
        className="container"
        style={{
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          textAlign: "center",
        }}
        onClick={AddTile}
      >
        <i className="fa-solid fa-plus" style={{ color: "green" }} />
      </div>
      {newTile ? <Tile state="true" /> : <></>}
    </div>
  )
}

export default Main
