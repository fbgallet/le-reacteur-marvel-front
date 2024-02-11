import ItemsList from "../components/ItemsList";

const CharactersListPage = ({ favorites, setFavorites, token }) => {
  return (
    <main>
      <ItemsList
        itemType="character"
        favorites={favorites}
        setFavorites={setFavorites}
        token={token}
      />
    </main>
  );
};

export default CharactersListPage;
