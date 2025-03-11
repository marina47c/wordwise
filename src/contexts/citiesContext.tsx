import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { CityType } from "../utils/types";

const BASE_API = "http://localhost:8000";

interface CityContextType {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType | null;
  getCity: (id: string) => void;
  createCity: (newCity: CityType) => void;
  deleteCity: (cityId: string) => void;
}

interface CitiesProviderProps {
  children?: ReactNode;
}

type CityState = {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType | null;
};

const initialState: CityState = {
  cities: [],
  isLoading: false,
  currentCity: null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reducer(state: CityState, action: any) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "cities/created":
    case "cities/deleted":
    default:
      throw new Error("Unknown action type");
  }
}

const CitiesContext = createContext<CityContextType>({
  cities: [],
  isLoading: false,
  currentCity: null,
  getCity: () => {},
  createCity: () => {},
  deleteCity: () => {},
});

function CitiesProvider({ children }: CitiesProviderProps) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState<CityType[]>([]);
  // const [currentCity, setCurrentCity] = useState<CityType | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getCity(id: string) {
    dispatch({ type: "loading" });
    try {
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
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_API}/cities`);
      const data = await res.json();
      dispatch({ type: "cities/loaded", payload: data });
    } catch (ex) {
      console.log(`Error while fetching data. ${ex}`);
    } 
  }

  async function createCity(newCity: CityType) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_API}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (ex) {
      console.log(`Error while posting data. ${ex}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(cityId: string) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_API}/cities/${cityId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      setCities((cities) => cities.filter((city) => city.id !== data.id));
    } catch (ex) {
      console.log(`Error while deleting. ${ex}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
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
