import { useEffect, useState } from "react";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ??
  "https://workoutapi-fjcr.onrender.com/api";

console.log(BACKEND_URL);

// process.stdout.write("hellf : ");

export default function App() {
  const [workouts, setWorkouts] = useState([]);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [displayworkouts, setDisplayWorkouts] = useState(false);

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
      <Login
        setToken={setToken}
        setDisplayEmail={setEmail}
        setDisplayWorkouts={setDisplayWorkouts}
        setWorkouts={setWorkouts}
      />
      <br></br>
      {displayworkouts && (
        <Display
          email={email}
          token={token}
          setWorkouts={setWorkouts}
          workouts={workouts}
        ></Display>
      )}
    </>
  );
}

function Login({ setToken, setDisplayEmail, setDisplayWorkouts, setWorkouts }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function NewLogIn(verb) {
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
        setDisplayWorkouts(true);
        console.log(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
  function OnLogOut() {
    setDisplayEmail("");
    setWorkouts([]);
    setDisplayWorkouts(false);
  }

  return (
    <>
      <div className="padded" style={{ marginTop: "50px" }}>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="newWorkout"
        ></input>
        <br></br>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="newWorkout"
        ></input>
      </div>
      <div class="centered-container">
        <button onClick={() => NewLogIn("signup")} className="updateb">
          SIGN UP
        </button>
        <button onClick={() => NewLogIn("login")} className="deleteb">
          LOGIN
        </button>
        <button onClick={OnLogOut}>LOGOUT</button>
      </div>
    </>
  );
}

function Display({ email, token, workouts, setWorkouts }) {
  return (
    <>
      <h1> Welcome {email}</h1>
      <h2> Your list has {workouts.length} workouts </h2>
      {!!workouts.length && (
        <ul className="workouts">
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
      )}
      <NewWorkout addWorkout={setWorkouts} token={token} />
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
      <h2>You can add workouts here</h2>
      <div className="padded">
        <input
          type="text"
          placeholder="Write here"
          value={title}
          className="newWorkout"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>
        <input
          type="number"
          placeholder="Write here"
          value={reps}
          className="newWorkout"
          onChange={(event) => setReps(1 * event.target.value)}
        ></input>
        <select
          className="values"
          value={loads}
          onChange={(event) => setLoads(1 * event.target.value)}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((val) => (
            <option value={val}>{val}</option>
          ))}
        </select>
      </div>
      <div className="centered-container">
        <button onClick={add}>ADD NEW WORKOUT</button>
      </div>
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
    <li className="listitem">
      <span>Title : {workout.title}</span>&nbsp;&nbsp;&nbsp;
      <span>Reps: {workout.reps}</span>&nbsp;&nbsp;&nbsp;
      <span>Loads: {workout.load}</span>
      <button className="updateb">UPDATE</button>
      <button onClick={DeleteWorkout} className="deleteb">
        {" "}
        DELETE
      </button>
    </li>
  );
}
