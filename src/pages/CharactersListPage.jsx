import ItemsList from "../components/ItemsList";

const CharactersListPage = ({ favorites, setFavorites }) => {
  return (
    <ItemsList
      itemType="character"
      favorites={favorites}
      setFavorites={setFavorites}
    />
  );
};

export default CharactersListPage;
