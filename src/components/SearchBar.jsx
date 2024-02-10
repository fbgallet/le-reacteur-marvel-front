import { useEffect } from "react";
import autocomplete from "autocompleter";

const SearchBar = ({
  searchString,
  setSearchString,
  namesList,
  setIsLoading,
}) => {
  const handleSearch = (e) => {
    setIsLoading(true);
    setSearchString(e.target.value);
  };

  useEffect(() => {
    const input = document.querySelector("#search-input");
    if (input && searchString)
      autocomplete({
        input: input,
        fetch: function (text, update) {
          text = text.toLowerCase();
          let suggestions = namesList
            .filter((n) => n.name.toLowerCase().includes(text))
            .map((n) => {
              return {
                label: n.name,
              };
            });
          if (suggestions.length > 30) {
            suggestions = suggestions.slice(0, 29);
            suggestions.push({ label: "..." });
          }
          console.log("suggestions :>> ", suggestions);
          update(suggestions.length ? suggestions : true);
        },
        onSelect: function (item) {
          setSearchString(item.label);
        },
        minLength: 2,
        className: "autocomplete-customizations",
        emptyMsg: "Aucun élément correspondant",
        debouncheWaitMs: 500,
        click: (e) => e.fetch(),
      });
  }, [searchString]);

  return (
    <div className="search-component">
      <input
        type="text"
        name="search-input"
        id="search-input"
        placeholder="cherchez un personnage"
        value={searchString || ""}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
