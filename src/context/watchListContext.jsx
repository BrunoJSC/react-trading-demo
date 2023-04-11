import { createContext, useState } from "react";

export const WatchListContext = createContext();

export function WatchListProvider({children}) {
  const [watchList, setWatchList] = useState([
    "goog",
    "aapl",
    "msft",
    "fb",
    "amzn",
    "nflx",
    "tsla",
    "snap",
    "shop",
    "sq",
    "okta",
    "pypl",
    "nke",
    "adbe",
    "amd",
    "amc",
    "baba",
    "bb",
  ]);

  function addStock(stock) {
    if(watchList.includes(stock)) return;
    setWatchList([...watchList, stock]);
  }

  function removeStock(stock) {
    setWatchList(watchList.filter((item) => item !== stock));
  }

  return (
    <WatchListContext.Provider value={{ watchList, addStock, removeStock }}>
      {children}
    </WatchListContext.Provider>
  );
}