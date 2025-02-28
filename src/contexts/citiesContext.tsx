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
  currentCity: CityType | null;
  getCity: (id: string) => void;
}

interface CitiesProviderProps {
  children?: ReactNode;
}

const CitiesContext = createContext<CityContextType>({
  cities: [],
  isLoading: false,
  currentCity: null,
  getCity: () => {},
});

function CitiesProvider({ children }: CitiesProviderProps) {
  const [cities, setCities] = useState<CityType[]>([]);
  const [currentCity, setCurrentCity] = useState<CityType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getCity(id: string) {
    try {
      setIsLoading(true);
      const result = await fetch(`${BASE_API}/cities/${id}`);
      const data = await result.json();
      setCurrentCity(data);
    } catch (ex) {
      console.log(`Error while fetching data. ${ex}`);
    } finally {
      setIsLoading(false);
    }
  }

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

  useEffect(() => {
    getCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
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
