import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CityType } from "../utils/types";

const BASE_API = "http://localhost:8000";

interface CityContextType {
  cities: CityType[];
  isLoading: boolean;
}

interface CitiesProviderProps {
  children?: ReactNode;
}

const CitiesContext = createContext<CityContextType>({
  cities: [],
  isLoading: false,
});

function CitiesProvider({ children }: CitiesProviderProps) {
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
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }

  return context;
}

export { CitiesProvider, useCities };
