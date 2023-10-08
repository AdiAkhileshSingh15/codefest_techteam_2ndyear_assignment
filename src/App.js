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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  function OnLogOut() {
    setEmail("");
    setWorkouts([]);
    setIsLoggedIn(false);
  }
  return (
    <>
      <nav className="navbar">
        <h1 className="header">WORKOUT &nbsp;&nbsp;&nbsp; BUDDY</h1>
        {isLoggedIn && (
          <button onClick={OnLogOut} className="logoutb">
            LOGOUT
          </button>
        )}
      </nav>

      <div className="container">
        {!isLoggedIn && (
          <div className="login-signup">
            <Login
              setToken={setToken}
              setDisplayEmail={setEmail}
              setIsLoggedIn={setIsLoggedIn}
            />
          </div>
        )}
        <br />
        {isLoggedIn && (
          <div className="display">
            <Display
              email={email}
              token={token}
              setWorkouts={setWorkouts}
              workouts={workouts}
            />
          </div>
        )}
      </div>
    </>
  );
}

function Login({ setToken, setDisplayEmail, setIsLoggedIn }) {
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
        setIsLoggedIn(true);
        console.log(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <>
      <div className="centered-container">
        <div>
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
        <div className="</em>">
          <button onClick={() => NewLogIn("signup")} className="updateb">
            SIGN UP
          </button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => NewLogIn("login")} className="deleteb">
            LOGIN
          </button>
        </div>
      </div>
    </>
  );
}

function Display({ email, token, workouts, setWorkouts }) {
  const [reps, setReps] = useState(1);
  const [loads, setLoads] = useState(1);
  return (
    <>
      <div className="display">
        <h1>
          <em> Welcome </em>
          {email}
        </h1>
        <br></br>
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
                  reps={reps}
                  loads={loads}
                />
              ))}
          </ul>
        )}
        <NewWorkout
          addWorkout={setWorkouts}
          token={token}
          reps={reps}
          loads={loads}
          setReps={setReps}
          setLoads={setLoads}
        />
      </div>
    </>
  );
}

function NewWorkout({ addWorkout, token, reps, loads, setReps, setLoads }) {
  const [title, setTitle] = useState("");

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
      <h2>You can add / updates workouts here</h2>
      <div className="add" style={{ display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: "10px", fontSize: "18px" }}>TITLE: </label>
        <input
          type="text"
          placeholder="Write here"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>
        <label
          style={{ marginRight: "10px", marginLeft: "18px", fontSize: "20px" }}
        >
          REPS:{" "}
        </label>
        <input
          type="number"
          placeholder="Write here"
          value={reps}
          onChange={(event) => setReps(1 * event.target.value)}
        ></input>
        <label
          style={{ marginRight: "10px", marginLeft: "18px", fontSize: "20px" }}
        >
          LOADS:{" "}
        </label>
        <input
          type="number"
          placeholder="Write here"
          value={loads}
          onChange={(event) => setLoads(1 * event.target.value)}
        ></input>
      </div>

      <div className="centered-container">
        <button onClick={add} className="updateb">
          ADD NEW WORKOUT
        </button>
      </div>
    </>
  );
}

function Workout({ workout, setWorkouts, token }) {
  const [reps, setReps] = useState(1);
  const [loads, setLoad] = useState(1);
  const [toupdate, setToUpdate] = useState(false);

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

  function onPressUpdate() {
    setToUpdate(true);
  }
  function UpdateWorkout() {
    let updates = { reps: reps, load: loads };
    fetch(BACKEND_URL + "/workouts/" + workout._id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        setWorkouts((workouts) => {
          console.log(workouts);
          return workouts.map((w) =>
            w._id !== workout._id ? w : { ...w, reps: reps, load: loads }
          );
        });
        console.log(data);
      });
    setToUpdate(false);
  }

  return (
    <li className="workout-item">
      <div className="workout-details">
        <span>
          <em>Title</em> : {workout.title}
        </span>
        <span>
          <em>Reps</em> :{" "}
          {toupdate ? (
            <input
              type="number"
              placeholder="Write here"
              value={reps}
              onChange={(event) => setReps(1 * event.target.value)}
            ></input>
          ) : (
            workout.reps
          )}
        </span>
        <span>
          <em>Loads</em> :{" "}
          {toupdate ? (
            <input
              type="number"
              placeholder="Write here"
              value={loads}
              onChange={(event) => setLoad(1 * event.target.value)}
            ></input>
          ) : (
            workout.load
          )}
        </span>
      </div>
      <div className="workout-buttons">
        {toupdate && (
          <button className="submitb" onClick={UpdateWorkout}>
            SUBMIT
          </button>
        )}
        {!toupdate && (
          <button className="updateb" onClick={onPressUpdate}>
            UPDATE
          </button>
        )}
        <button onClick={DeleteWorkout} className="deleteb">
          DELETE
        </button>
      </div>
    </li>
  );
}
