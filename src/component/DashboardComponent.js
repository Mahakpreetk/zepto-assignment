import React, { useState, useRef, useEffect } from "react";
import sampleData from "../collection.json";
import "../App.css";

const CustomComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [highlightedItem, setHighlightedItem] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setFilteredSuggestions(
      sampleData.filter(
        (item) =>
          !selectedItems.includes(item.name) &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, selectedItems]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleSuggestionSelect = (selectedItem) => {
    setSelectedItems([...selectedItems, selectedItem]);
    setSearchTerm("");
  };

  const handleItemRemove = (removedItem) => {
    setSelectedItems(selectedItems.filter((item) => item !== removedItem));
  };

  const handleInputKeyDown = (event) => {
    if (
      event.key === "Backspace" &&
      searchTerm === "" &&
      selectedItems.length > 0
    ) {
      const lastItem = selectedItems[selectedItems.length - 1];
      setHighlightedItem(lastItem);
      event.preventDefault();
    }
    if (event.key === "Backspace" && highlightedItem) {
      handleItemRemove(highlightedItem);
      setHighlightedItem(null);
    }
  };

  return (
    <div className="custom-container">
      <div className="custom-input-container">
        {selectedItems.map((item, index) => (
          <div
            key={index}
            className={`custom-item ${
              highlightedItem === item ? "highlighted" : ""
            }`}
          >
            <img
              src={sampleData.find((data) => data.name === item)?.image}
              alt={item}
              className="custom-item-avatar"
            />
            {item}{" "}
            <span
              onClick={() => handleItemRemove(item)}
              className="custom-item-remove"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1617/1617543.png"
                alt="Remove"
                width="15"
                height="15"
              />
            </span>
          </div>
        ))}

        <div>
          <input
            type="text"
            ref={inputRef}
            value={searchTerm}
            onChange={handleSearchTermChange}
            onKeyDown={handleInputKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Search..."
          />

          {showSuggestions && searchTerm.length < 1 && (
            <div className="custom-suggestion-list">
              {filteredSuggestions.map((data, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionSelect(data.name)}
                  className="custom-suggestion"
                >
                  <img
                    src={data.image}
                    alt={data.name}
                    className="custom-suggestion-avatar"
                  />
                  <div>{data.name}</div>
                  <div className="custom-email">{data.email}</div>
                </div>
              ))}
            </div>
          )}
          {searchTerm.length > 0 && (
            <div className="custom-suggestion-list">
              {filteredSuggestions.map((data, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionSelect(data.name)}
                  className="custom-suggestion"
                >
                  <img
                    src={data.image}
                    alt={data.name}
                    className="custom-suggestion-avatar"
                  />
                  <div>{data.name}</div>
                  <div className="custom-email">{data.email}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomComponent;
