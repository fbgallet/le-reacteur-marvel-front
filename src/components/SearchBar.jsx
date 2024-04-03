import { useEffect, useRef, useState } from "react";
import autocomplete from "autocompleter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({
  itemType,
  searchString,
  setSearchString,
  data,
  isLoading,
  setIsLoading,
}) => {
  // const namesList = useRef(data?.results);
  const suggestions = useRef([]);

  const handleSearch = (e) => {
    // console.log("handleSearch :>> ", e);
    setIsLoading(true);
    setSearchString(e.target.value);
  };

  useEffect(() => {
    if (isLoading) return;
    autocomplete({
      input: document.querySelector("#search-input"),
      fetch: myFunction,
      onSelect: function (item) {
        console.log("item.label :>> ", item.label);
        setSearchString(item.label);
        setIsLoading(true);
      },
      disableAutoSelect: true,
      minLength: 2,
      className: "autocomplete-customizations",
      emptyMsg: "No matching " + itemType,
      debouncheWaitMs: 100,
      click: (e) => e.fetch(),
    });
  }, [data]);

  // useEffect(() => {
  //   if (isLoading) return;
  //   const input = document.querySelector("#search-input");
  //   if (input && searchString && data) {
  //     // console.log("namesList :>> ", namesList.current);
  //     // setTimeout(()=>{
  //     suggestions.current = updatedSuggestions();
  //   }
  // });

  const myFunction = (text, update) => {
    suggestions.current = updatedSuggestions();
    console.log("suggestions :>> ", suggestions.current);
    update(suggestions.current);
  };

  const updatedSuggestions = () => {
    const input = document.querySelector("#search-input");
    let s = data.results
      .filter((n) => n.name.toLowerCase().includes(input.value.toLowerCase()))
      .map((n) => {
        return {
          label: n.name,
        };
      });
    if (s.length > 30) {
      s = s.slice(0, 29);
      s.push({ label: "..." });
    }
    return [...s];
  };

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
