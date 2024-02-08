import marvelLogo from "../assets/img/Marvel Logo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleClickOnLogo = () => {
    navigate("/");
  };

  return (
    <header>
      <div className="logo">
        <img src={marvelLogo} alt="" onClick={handleClickOnLogo} />
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
