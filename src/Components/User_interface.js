import React, { Component, useEffect, useState } from "react";
import axios, { all } from "axios";
import WorkOut from "./WorkOutItem";
import { fetchWorkouts, loginUser } from "../Swagger Api/Actions";
import Workout_item from "./WorkOutItem";
import Search_bar from "./search_workout";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Plus from "../images/plus.png"
import { AddItem } from "../Swagger Api/Actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#ccccff",
};

const load_style = {
  marginLeft: "4px",
};

const reps_style = {
  marginTop: "8px",
  marginLeft: "4px",
};

const form_style = {
  height: 250,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#ccccff",
};

const btnStyle = {
  backgroundColor: "",
};

const title_style = {
  marginLeft: "4px",
  marginTop: "8px",
};

const plus_style = {
  width: "3vh",
  height: "3vh",
  display: "block",
  marginLeft: "0",
  marginTop: "0"
  // backgroundColor: "white"
}

const addButtonStyle = {
  // width: "auto",
  position: "fixed",
  bottom: "4vh",
  right: "4vw",
  width: "6vh",
  height: "6vh",
  borderRadius: "50%",
  alignItems: "center",
  border: "0.5vh solid black",
  boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)"
}

export default function User_interface(props) {
  const [Workouts, setWorkouts] = useState([]);
  const [show, setShow] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [newTitle, setNewTitle] = useState("");
  const [newLoad, setNewLoad] = useState(0);
  const [newReps, setNewReps] = useState(0);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    const allWorkouts = fetchWorkouts()
      .then((workouts) => {
        // console.log('Fetched Workouts:');
        // console.log(workouts.data[0].title);
        setWorkouts(workouts.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
    console.log(Workouts);
  }, []);

  const handleNewForm = () => {
    setShow(true);
  };
  // const openForm = () => {
  //     setShow(true);
  // }
  // const closeForm = () => {
  //     setShow(false);
  // }

  useEffect(() => {
    //dfjaldsf
  }, [show]);

  const NewItem = async (e) => {
    e.preventDefault();
    handleClose();
    let val = await AddItem(newTitle,newLoad,newReps);
    if(val){
      setShowNew(true);
      window.location.reload();
  }else{
    window.alert("Unable to add item");
  }
  }

  useEffect(()=>{
    // dfad
  },[showNew]);

  return (
    <>
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Hello User</h2>
        <div className="d-flex justify-content-between">
          <h3>Workouts Summary:</h3>
          <Search_bar />
        </div>
        <div className="row">
          {/* console.log(type(allWorkouts)); */}
          {Workouts.map((element) => {
            return (
              <div className="col-4 md-3 myWorkouts my-5" key={element._id}>
                <Workout_item
                  title={element.title ? element.title : ""}
                  reps={element.reps ? element.reps : ""}
                  load={element.load}
                  _id={element._id}
                />
              </div>
            );
          })}
          <button
            className="btn btn-light btn-sm md-3 d-flex justify-content-center"
            style={addButtonStyle}
            onClick={handleOpen}
          >
            {/* Add a new workout */}
            <img src={Plus} alt="Add a new workout" style={plus_style}/>
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form id="update_form" style={form_style}>
                <div>
                  <label htmlFor="load">Title:</label>
                  <input type="text" id="load" style={title_style} onChange={(e) => setNewTitle(e.target.value)}></input>
                </div>

                <div>
                  <label htmlFor="load">Load:</label>
                  <input type="number" id="load" style={load_style} onChange={(e) => setNewLoad(e.target.value)}></input>
                </div>

                <div>
                  <label htmlFor="reps">Reps:</label>
                  <input type="number" id="reps" style={reps_style} onChange={(e) => setNewReps(e.target.value)}></input>
                </div>

                <button type="submit" className="btn btn-secondary btn-dark" onClick={NewItem}>
                  Create Workout
                </button>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
    </>
    
  );
}
