import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Homepage from "./pages/homepage";
import Prices from "./pages/Pricing";
import Product from "./pages/product";
import PageNotFound from "./pages/pageNotFound";
import AppLayout from "./pages/appLayout";
import Login from "./pages/Login";
import CityList from "./components/cityList/cityList";

import City from "./components/city/city";
import Form from "./components/form/form";
import CountryList from "./components/countryList/countryList";
import { CitiesProvider } from "./contexts/citiesContext";

export default function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="pricing" element={<Prices />} />
          <Route path="product" element={<Product />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to={"cities"} />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}
