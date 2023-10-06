import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {AuthContext} from './AuthContext';
import { useContext } from 'react';
const Create = () => {
    const [formData,setFormData] = useState({title : '',load:'',reps:''});
    const history=useHistory();
    const {token} =useContext(AuthContext);
    const handleSubmit = async(e) => {
        e.preventDefault();
        const newworkout={title:formData.title,load:Number(formData.load),reps:Number(formData.reps)};
        fetch('https://workoutapi-fjcr.onrender.com/api/workouts',{
            method: 'POST',
            body: JSON.stringify(newworkout),
            headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer " +token 
            } 
        })
        .then((res) => {
            if(res.ok)
            {
                return res.json();
            }
            else
            {
                throw new Error('unauthorized access');
            }
        })
        .then( (data) => {
            console.log('workout is added successfully');
            history.go(-1);
      })
      .catch((error) => {
        console.error('authorisation error');
      });
    };
    return ( 
        <div className="Create-page">
        <h2>Add a new workout</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="load">Load:</label>
            <input
              type="number"
              value={formData.load}
              onChange={(e) =>
                setFormData({ ...formData, load: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reps">Reps:</label>
            <input
              type="number"
              value={formData.reps}
              onChange={(e) =>
                setFormData({ ...formData, reps: e.target.value })
              }
              required
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
     );
}
 
export default Create;