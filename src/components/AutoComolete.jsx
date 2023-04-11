import { useContext, useEffect, useState } from "react";
import finnHub from "../api/finnHub";
import { WatchListContext } from "../context/watchListContext";

export function AutoComplete() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const { addStock, removeStock } = useContext(WatchListContext);

  const renderDropdown = () => {
    const dropdownClass = search ? "show" : null;
    return (
      <ul
        className={`dropdown-menu ${dropdownClass}`}
        style={{
          height: "500px",
          overflow: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
      >
        {results.map((result) => {
          return (
            <li
              key={result.symbol}
              className="dropdown-item"
              onClick={() => {
                addStock(result.symbol);
                setSearch("");  
              }}
            >
              {result.symbol} - {result.description}
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });

        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }

    return () => {
      isMounted = false;
    };
  }, [search]);
  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }}
          type="text"
          id="search"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  );
}
