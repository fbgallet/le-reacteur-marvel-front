import axios from "axios";
import { server } from "../App";

const getUpdatedFavorites = (prev, id, itemType, isFavorite, token) => {
  const updateFavoritesInDb = (action) => {
    if (token)
      try {
        axios.post(`${server[server.current]}/user/favorite`, {
          token: token,
          type: itemType,
          id: id,
          action: action,
        });
      } catch (error) {
        console.log(error.response);
      }
  };

  const prevClone = { ...prev };
  if (isFavorite) {
    prevClone[itemType + "s"].push(id);
    updateFavoritesInDb("add");
  } else {
    const favIndex = prevClone[itemType + "s"].indexOf(id);
    prevClone[itemType + "s"].splice(favIndex, 1);
    updateFavoritesInDb("remove");
  }
  return prevClone;
};

export default getUpdatedFavorites;
