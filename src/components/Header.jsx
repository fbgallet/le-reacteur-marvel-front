import marvelLogo from "../assets/img/Marvel Logo.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ token, setToken, setFavorites }) => {
  console.log("token :>> ", token);

  const navigate = useNavigate();

  const handleClickOnLogo = () => {
    navigate("/");
  };

  const handleLogout = () => {
    Cookies.remove("userToken");
    setToken("");
    setFavorites({ characters: [], comics: [] });
    navigate("/");
  };

  return (
    <header>
      <div className="logo">
        <img src={marvelLogo} alt="" onClick={handleClickOnLogo} />
      </div>
      <div className="user-buttons">
        {token ? (
          <div onClick={handleLogout}>Logout</div>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <span>|</span>
            <Link to="login">Login</Link>
          </>
        )}
      </div>
      <nav>
        <Link to="/Characters">Characters</Link>
        <Link to="/Comics">Comics</Link>
        <Link to="/Favorites">Favorites</Link>
      </nav>
    </header>
  );
};

export default Header;
