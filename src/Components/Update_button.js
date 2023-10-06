import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


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
export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      
      <button className='btn btn-secondary btn-sm my-2' style={{width:"40%"}} onClick={handleOpen}>Update</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
        <form id="update_form" style={form_style}>
            <div>
            <label htmlFor="load">New Load:</label>
            <input type="text" id="load" style={load_style}></input>
            </div>
            
            <div>
            <label htmlFor="reps">New Reps:</label>
            <input type="text" id="reps" style={reps_style}></input>
            </div>
            

            <button type='submit' className='btn btn-secondary'>Apply Changes</button>
        </form>
        </Box>
      </Modal>
    </>
  );
}