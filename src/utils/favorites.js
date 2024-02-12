import axios from "axios";
import { server } from "../App";

const handleFavoritesInDb = async (token, id, itemType, action) => {
  if (token)
    try {
      const { data } = await axios.post(
        `${server[server.current]}/user/favorite`,
        {
          token: token,
          type: itemType,
          id: id,
          action: action,
        }
      );
      return data;
    } catch (error) {
      console.log(error.response);
    }
};

export const getFavoritesFromDd = async (token) => {
  const { favorites } = await handleFavoritesInDb(token);
  return favorites;
};

export const getUpdatedFavorites = (prev, id, itemType, isFavorite, token) => {
  const prevClone = { ...prev };
  if (isFavorite) {
    prevClone[itemType + "s"].unshift(id);
    handleFavoritesInDb(token, id, itemType, "add");
  } else {
    const favIndex = prevClone[itemType + "s"].indexOf(id);
    prevClone[itemType + "s"].splice(favIndex, 1);
    handleFavoritesInDb(token, id, itemType, "remove");
  }
  return prevClone;
};
