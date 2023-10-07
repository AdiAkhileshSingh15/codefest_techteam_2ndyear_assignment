import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState(0);
  const [load, setLoad] = useState(0);
  const [isPending, setisPending] = useState(false);
  const history = useHistory();
  // history object has been created that can be moved back and forth

//   const {authtoken} = req.authtoken;
const authtoken = localStorage.getItem("authtoken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title:title, reps:Number(reps), load:Number(load) };
console.log(workout);
    setisPending(true);
try{
    const data = await fetch("https://workoutapi-fjcr.onrender.com/api/workouts/", {
      method: "POST",
      headers: { "Content-type": "application/json",
      authorization: `Bearer ${authtoken}`},
      //This basically tells the server the type of data we are sending with the request
      body: JSON.stringify(workout),
      //json server will automatically add the id property
    });

    if (data.ok) {
      const resdata = await data.json();
      console.log(resdata);
      // localStorage.setItem(resdata);
    } else {
      console.log("err1");
    }
} catch(error){
  console.log("err2 ",error);
}
  };


  return (
    <>
    <div className="create">
      <h2>Add New Workout</h2>
      <form onSubmit={handleSubmit}>
        <label>Workout title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>No of Repetitions:</label>
        <input
          type="number"
          required
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
      <label>Amount of load:</label>
          <input
            type="number"
            required
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          />
        {!isPending && <button>Add Workout</button>}
        {isPending && <button disabled>Adding Workout...</button>}
      </form>
    </div>
    </>
  );
};

export default Create;
