import axios from "axios";
import { useState } from "react";
import Cookie from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../App";

const Signup = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (event, setStateCallback) => {
    setStateCallback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!password || !email) return;
      // handle form submit
      const { data } = await axios.post(
        `${server[server.current]}/user/signup`,
        {
          email,
          password,
        }
      );
      console.log(data);
      Cookie.set("userToken", data.token, { secure: true });
      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="signup-page">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(evt) => handleChange(evt, setEmail)}
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          id="pawword"
          value={password}
          onChange={(evt) => handleChange(evt, setPassword)}
        />

        <button className="dark-button">Signup</button>

        <Link to={"/login"}>
          <p>Already an account ? Login here !</p>
        </Link>
      </form>
    </main>
  );
};

export default Signup;
