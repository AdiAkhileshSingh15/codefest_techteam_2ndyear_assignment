import { useEffect, useState } from "react";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ??
  "https://workoutapi-fjcr.onrender.com/api";

console.log(BACKEND_URL);
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFmMWVhZDA5NzdkNDQ1NGVjN2U3OGUiLCJpYXQiOjE2OTY1MzgyODUsImV4cCI6MTY5Njc5NzQ4NX0.AhP5Gks5KLA46jlGNlah-2Cd-5REDxnbaIuQld8ByZY";

// process.stdout.write("hellf : ");

export default function App() {
  const [workouts, setWorkouts] = useState([]);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");

  function FetchWorkouts() {
    if (token === null) {
      return;
    }
    fetch(BACKEND_URL + "/workouts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setWorkouts(data));
  }

  useEffect(() => FetchWorkouts(), [token, setToken]);

  console.log(workouts);
  return (
    <>
      <Login setToken={setToken} verb={"signup"} setDisplayEmail={setEmail} />
      <Login setToken={setToken} verb={"login"} setDisplayEmail={setEmail} />
      <h1> Welcome {email}</h1>

      <h1> ALL WORKOUTS</h1>
      <ul>
        {!!workouts.length &&
          workouts.map((workout) => (
            <Workout
              workout={workout}
              key={workout._id}
              setWorkouts={setWorkouts}
              token={token}
            />
          ))}
      </ul>
      <NewWorkout addWorkout={setWorkouts} token={token} />
    </>
  );
}

function Login({ setToken, verb, setDisplayEmail }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function NewLogIn() {
    let credentials = { email: email, password: password };
    fetch(BACKEND_URL + "/user/" + verb, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setToken(data.token);
        setDisplayEmail(data.email);
        console.log(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <>
      <input
        type="text"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></input>
      <input
        type="password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>
      <button onClick={NewLogIn}>{verb}</button>
    </>
  );
}

function NewWorkout({ addWorkout, token }) {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState(1);
  const [loads, setLoads] = useState(1);

  function add() {
    let newWorkout = { title: title, reps: reps, load: loads };
    fetch(BACKEND_URL + "/workouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkout), //serialization: converting object to string representation
    })
      .then((response) => {
        // console.log(response.status);
        return response.json();
      })
      .then((data) => {
        addWorkout((workouts) => [...workouts, data]);
        // console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
    // console.log(newWorkout);
    setTitle("");
    setReps(1);
    setLoads(1);
  }

  return (
    <>
      <button onClick={add}>ADD NEW WORKOUT</button>
      <input
        type="text"
        placeholder="Write here"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      ></input>
      <input
        type="number"
        placeholder="Write here2"
        value={reps}
        onChange={(event) => setReps(1 * event.target.value)}
      ></input>
      <select
        value={loads}
        onChange={(event) => setLoads(1 * event.target.value)}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((val) => (
          <option value={val}>{val}</option>
        ))}
      </select>
    </>
  );
}

function Workout({ workout, setWorkouts, token }) {
  function DeleteWorkout() {
    fetch(BACKEND_URL + "/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        setWorkouts((workouts) => {
          console.log(workouts);
          return workouts.filter((w) => w._id !== workout._id);
        });
        console.log(data);
      });
  }
  return (
    <div>
      <li>
        <span>{workout.title}</span>
        <span>{workout.reps}</span>
        <span>{workout.load}</span>
      </li>
      <button>UPDATE</button>
      <button onClick={DeleteWorkout}> DELETE</button>
    </div>
  );
}
