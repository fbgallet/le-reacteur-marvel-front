import axios from "axios";
import { useState } from "react";
import Cookie from "js-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { server } from "../App";

const Login = ({ setToken, setFavorites }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event, setStateCallback) => {
    setStateCallback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!password || !email) return;
      // handle form submit
      const { data } = await axios.post(
        `${server[server.current]}/user/login`,
        {
          email,
          password,
        }
      );
      console.log(data);
      Cookie.set("userToken", data.user.token, {
        secure: true,
        sameSite: "strict",
      });
      setToken(data.user.token);
      setFavorites({
        characters: data.user.favorites.characters,
        comics: data.user.favorites.comics,
      });
      location.state ? navigate(location.state.from) : navigate("/");
    } catch (error) {
      console.log(error.response);
      alert("Invalid email or password.");
    }
  };

  return (
    <main className="login-page">
      <h2>Login</h2>
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
          placeholder="Mot de passe"
          type="password"
          name="password"
          id="pawword"
          value={password}
          onChange={(evt) => handleChange(evt, setPassword)}
        />

        <button className="dark-button">Login</button>

        <Link to={"/signup"}>
          <p>No account ? Signup here !</p>
        </Link>
      </form>
    </main>
  );
};

export default Login;
