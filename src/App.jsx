import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { StockOverviewPage } from "./pages/StockOverviewPage";
import { StockDetailsPage } from "./pages/StockDetailsPage";

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<StockOverviewPage />} />
        <Route path="/details/:symbol" element={<StockDetailsPage />} />
      </Route>
    )
  );

  return (
    <main className="container">
      <RouterProvider router={router} />
    </main>
  );
}
