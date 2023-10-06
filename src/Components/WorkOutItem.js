import React, { useState, useEffect } from "react";
import { DeleteItem } from "../Swagger Api/Actions";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { UpdateItem } from "../Swagger Api/Actions";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  backgroundColor: '#ccccff',
};

const load_style = {
    marginLeft: '4px',
}

const reps_style = {
    marginTop: '8px',
    marginLeft: '4px',
}

const form_style = {
    height: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ccccff',
}

const btnStyle = {
    backgroundColor: ''
}

const listStyle = {
  listStyleType: "circle"
}


export default function Workout_item(props) {
  const [Title, setTitle] = useState(props.title);
  const [Reps, setReps] = useState(props.reps);
  const [Load, setLoad] = useState(props.load);
  const [isDeleted, setDelete] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let l = Load;
  let r = Reps;
  let { title, reps, load, _id } = props;
  const handleDelete = async (event) => {
    event.preventDefault();
    if (window.confirm("this workout will be removed")) {
      let val = await DeleteItem(_id);
      if(val){
      setDelete(true);
      }else{
        window.alert("Some error occured");
      }
    }

  };




  const changeLoad = (e) => {
    l = (e.target.value);
  }

  const changeReps = (e) => {
    r = (e.target.value);
  }

  const SubmitForm = async (e) => {
    e.preventDefault();
    console.log(l,r,_id)
    let val = await UpdateItem(l,r,_id);
    if(val){
      setLoad(l);
      setReps(r);
      handleClose();
    }else{
      window.alert("Unable to process your request now.")
    }
  }


  useEffect(() => {
    // setReps(1);
    // setLoad(100);
  }, [Reps, Load]);

  useEffect(() => {
    //setdevelje
  }, [isDeleted]);

  return (
   (isDeleted)? null : <div className="container d-flex flex-column align-content-center card">
      <h4>{title}</h4>
      <ul style={listStyle}>
        <li>reps:     {Reps}</li>
        <li>load:      {Load}</li>
       
      </ul>
      <div className="d-flex justify-content-around">
        <button
          className="btn btn-secondary btn-sm my-2"
          style={{ width: "40%" }}
          onClick={handleDelete}
        >
          Delete
        </button>
        {/* <button
          className="btn btn-secondary btn-sm my-2"
          style={{ width: "40%" }}
          onClick={handleUpdate}
        >
          Update
        </button> */}

      
      {/* <BasicModal /> */}

      <button className='btn btn-secondary btn-sm my-2' style={{width:"40%"}} onClick={handleOpen}>Update</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}
        <Box sx={style}>
        <form id="update_form" style={form_style}>
            <div>
            <label htmlFor="load">New Load:</label>
            <input type="number" id="load" style={load_style} onChange={changeLoad}></input>
            </div>
            
            <div>
            <label htmlFor="reps">New Reps:</label>
            <input type="number" id="reps" style={reps_style} onChange={changeReps}></input>
            </div>
            

            <button type='submit' className='btn btn-secondary' onClick={SubmitForm}>Apply Changes</button>
        </form>
        </Box>
      </Modal>


      </div>
    </div>
  );
}
