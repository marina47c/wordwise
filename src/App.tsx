import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Prices from "./pages/Pricing";
import Product from "./pages/product";
import PageNotFound from "./pages/pageNotFound";
import AppLayout from "./pages/appLayout";
import Login from "./pages/Login";
import CityList from "./components/cityList/cityList";
import { CityType } from "./utils/types";
import City from "./components/city/city";
import Form from "./components/form/form";
import CountryList from "./components/countryList/countryList";

const BASE_API = "http://localhost:8000";

export default function App() {
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getCities();
  }, []);

  async function getCities() {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_API}/cities`);
      const data = await res.json();
      setCities(data);
    } catch (ex) {
      console.log(`Error while fetching data. ${ex}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="pricing" element={<Prices />} />
        <Route path="product" element={<Product />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
