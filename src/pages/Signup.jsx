import axios from "axios";
import { useState } from "react";
import Cookie from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../App";

const Signup = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (event, setStateCallback) => {
    setStateCallback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!password || !email) {
        setErrorMsg("Email and password are needed !");
        return;
      }
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
      console.log(error.response);
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <main className="signup-page">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2>Create an account to save your favorites !</h2>
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
          <p>{errorMsg ? errorMsg : <>&nbsp;</>}</p>
          <button>Signup</button>

          <Link to={"/login"}>
            <p>Already an account ? Login here !</p>
          </Link>
        </form>
      </div>
    </main>
  );
};

export default Signup;
