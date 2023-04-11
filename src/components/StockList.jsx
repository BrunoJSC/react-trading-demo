import { useContext, useEffect, useState } from "react";
import finnHub from "../api/finnHub";

import {
  BsFillCaretDownFill,
  BsFillCaretRightFill,
  BsFillCaretUpFill,
} from "react-icons/bs";
import { WatchListContext } from "../context/watchListContext";
import { useNavigate } from "react-router-dom";

export function StockList() {
  const [stock, setStock] = useState([]);
  const { watchList } = useContext(WatchListContext);

  const navigate = useNavigate();

  function changeColor(change) {
    if (change > 0) {
      return "success";
    } else if (change < 0) {
      return "danger";
    } else {
      return "secondary";
    }
  }

  function renderIcon(change) {
    if (change > 0) {
      return <BsFillCaretUpFill />;
    } else if (change < 0) {
      return <BsFillCaretDownFill />;
    } else {
      return <BsFillCaretRightFill />;
    }
  }

  function handleStockSelect(symbol) {
    navigate(`/details/${symbol}`);
  }

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finnHub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );

        console.log(responses);
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        if (!isMounted) {
          setStock(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [watchList]);

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79, 89, 102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stockData) => {
            return (
              <tr
                style={{ cursor: "pointer" }}
                onClick={() => handleStockSelect(stockData.symbol)}
                className="table-row"
                key={stockData.symbol}
              >
                <th scope="row">{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td className={`text-${changeColor(stockData.data.d)}`}>
                  {stockData.data.d}
                </td>
                <td className={`text-${changeColor(stockData.data.dp)}`}>
                  {stockData.data.dp}
                  {renderIcon(stockData.data.dp)}
                </td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>{stockData.data.pc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
