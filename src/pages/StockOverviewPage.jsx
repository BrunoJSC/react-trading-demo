import { AutoComplete } from "../components/AutoComolete";
import { StockList } from "../components/StockList";

export function StockOverviewPage() {
  return (
    <div>
      <h1>Stock Overview</h1>
      <AutoComplete />
      <StockList />
    </div>
  );
}