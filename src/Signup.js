import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import './tailwind.css';

const Signup = () => {
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  // useEffect(() => {
  //   if (localStorage.getItem("authtoken")) {
  //     history.push("/user/login");
  //   }
  // }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = { email: email, password: password };
    console.log(user);

    try {
      const data = await fetch(
        "https://workoutapi-fjcr.onrender.com/api/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      console.log(data);

      if (data.ok) {
        const resdata = await data.json();
        const authtoken = resdata.token;
        localStorage.setItem("authtoken", authtoken);
        console.log(authtoken);
      } else {
        console.log("err1");
      }
    } catch (error) {
      console.log("err2 ", error);
    }
  };

  return (
    <>
      <form onSubmit={handleRegister} className="max-w-xs mx-auto mt-8">
  <h1>SignUp</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 rounded border focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 rounded border focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Signup;
