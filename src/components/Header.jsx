import marvelLogo from "../assets/img/Marvel Logo.png";
import marvelSmallLogo from "../assets/img/marvel-favicon.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({
  token,
  setToken,
  setFavorites,
  activeSection,
  setActiveSection,
}) => {
  console.log("token :>> ", token);

  const navigate = useNavigate();
  const handleClickOnLogo = () => {
    setActiveSection("Home");
    navigate("/");
  };

  const handleLogout = () => {
    Cookies.remove("userToken");
    setActiveSection("Home");
    setToken("");
    setFavorites({ characters: [], comics: [] });
    navigate("/");
  };

  return (
    <header>
      <div className="container">
        <div>
          <div className="logo">
            <img src={marvelLogo} alt="" onClick={handleClickOnLogo} />
            <img
              src={marvelSmallLogo}
              alt=""
              className="small-screen"
              onClick={handleClickOnLogo}
            />
          </div>
          <nav>
            <Link
              to="/Characters"
              className={activeSection === "Characters" ? "active-section" : ""}
              onClick={() => setActiveSection("Characters")}
            >
              CHARACTERS
            </Link>
            <Link
              to="/Comics"
              className={activeSection === "Comics" ? "active-section" : ""}
              onClick={() => setActiveSection("Comics")}
            >
              COMICS
            </Link>
            <Link
              to="/Favorites"
              className={activeSection === "Favorites" ? "active-section" : ""}
              onClick={() => setActiveSection("Favorites")}
            >
              FAVORITES
            </Link>
          </nav>
        </div>
        <div className="user-buttons">
          {token ? (
            <div onClick={handleLogout}>Logout</div>
          ) : (
            <>
              <Link
                to="/signup"
                className={activeSection === "Signup" ? "active-section" : ""}
                onClick={() => setActiveSection("Signup")}
              >
                Signup
              </Link>
              <span>|</span>
              <Link
                to="login"
                className={activeSection === "Login" ? "active-section" : ""}
                onClick={() => setActiveSection("Login")}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
