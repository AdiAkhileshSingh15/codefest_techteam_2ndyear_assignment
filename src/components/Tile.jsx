import React, { useState } from "react"
import "../styles/tile.css"
import {
  CreateWorkout,
  DeleteWorkout,
  UpdateWorkout,
} from "../Actions/workoutActions"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Tile = (params) => {
  const navigate = useNavigate()
  const [Title, setTitle] = useState(params.Title || "")
  const [Reps, setReps] = useState(params.Reps || 0)
  const [Load, setLoad] = useState(params.Load || 0)
  const initState = params.state || false
  const [EditTitle, setEditTitle] = useState(initState)
  const [EditReps, setEditReps] = useState(initState)
  const [EditLoad, setEditLoad] = useState(initState)

  const DeleteWork = async () => {
    const id = params.id
    const { error, message, success } = await DeleteWorkout(id)
    if (error) {
      toast.error(message)
    }
    if (success) {
      toast.success(message)
    }
  }

  const updateData = (e) => {
    e.preventDefault()
    setEditLoad(false)
    setEditTitle(false)
    setEditReps(false)
    if (params.state === "true") {
      if (!Title || !Reps || !Load) {
        localStorage.setItem("Adding", "false")
        window.dispatchEvent(new Event("storage"))
        return
      }
      //to add function to add the new workout

      CreateWorkout(Title, Reps, Load)
      localStorage.setItem("Adding", "done")
      window.dispatchEvent(new Event("storage"))
      toast.success("Workout Created Successfully")
    } else {
      const id = params.id
      UpdateWorkout(id, {
        reps: Number(Reps),
        load: Number(Load),
      })
      toast.success("Workout Updated Successfully")

    }
  }
  return (
    <div className="container">
      {initState ? (
        <></>
      ) : (
        <i className="fa-solid fa-trash DeleteIcon" onClick={DeleteWork} />
      )}
      {EditLoad || EditReps || EditTitle ? (
        <i className="fa-solid fa-check CheckIcon" onClick={updateData} />
      ) : (
        <i className="fa-solid fa-arrow-right-long Arrow" onClick={()=>navigate(`workout/${params.id}`)}/>
      )}
      {EditTitle ? (
        <form onSubmit={updateData}>
          <input
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            className="TitleInput"
          />
        </form>
      ) : (
        <h3 className="Title">{Title}</h3>
      )}
      <div className="Field">
        <span style={{ fontWeight: "700" }} className="DataSpan">
          Reps:{" "}
        </span>
        {EditReps ? (
          <form onSubmit={updateData} className="TileInput">
            <input
              className="TileInput"
              type="number"
              value={Reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </form>
        ) : (
          <span onDoubleClick={() => setEditReps(true)} className="DataSpan">
            {Reps}
          </span>
        )}
      </div>
      <div className="Field">
        <span style={{ fontWeight: "700", fontSize: "1.3rem" }} className="DataSpan">Load: </span>
        {EditLoad ? (
          <form onSubmit={updateData} className="TileInput">
            <input
              className="TileInput"
              type="number"
              value={Load}
              onChange={(e) => setLoad(e.target.value)}
            />
          </form>
        ) : (
          <span onDoubleClick={() => setEditLoad(true)} className="DataSpan">
            {Load}
          </span>
        )}
        <span>Kg</span>
      </div>
    </div>
  )
}

export default Tile
