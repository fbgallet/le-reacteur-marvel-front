import { useEffect } from "react";
import autocomplete from "autocompleter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({
  itemType,
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
        emptyMsg: "No matching " + itemType,
        debouncheWaitMs: 500,
        click: (e) => e.fetch(),
      });
  }, [searchString]);

  return (
    <div className="search-component">
      <div>
        <input
          type="text"
          name="search-input"
          id="search-input"
          autoComplete="off"
          placeholder={"Find a " + itemType}
          value={searchString || ""}
          onChange={handleSearch}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="search-icon"
          style={{ color: "#5A5A5A" }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
