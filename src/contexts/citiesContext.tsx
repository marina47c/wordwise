import { createContext, useContext, useEffect, useReducer } from 'react';
import { CityType } from '../utils/types';
import { CitiesProviderProps, CityContextType, CityState } from '../utils/interfaces/ICityContext';

const BASE_API = 'http://localhost:8000';

const initialState: CityState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reducer(state: CityState, action: any) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type');
  }
}

const CitiesContext = createContext<CityContextType>({
  cities: [],
  isLoading: false,
  currentCity: null,
  error: null,
  getCity: () => {},
  createCity: () => {},
  deleteCity: () => {},
});

function CitiesProvider({ children }: CitiesProviderProps) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);

  async function getCity(id: string) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: 'loading' });
    try {
      const result = await fetch(`${BASE_API}/cities/${id}`);
      const data = await result.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch {
      dispatch({ type: 'rejected', payload: `Error while fetching data.` });
    }
  }

  async function getCities() {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_API}/cities`);
      const data = await res.json();
      dispatch({ type: 'cities/loaded', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading cities...',
      });
    }
  }

  async function createCity(newCity: CityType) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_API}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'city/created', payload: data });
    } catch {
      dispatch({ type: 'rejected', payload: `Error while creating the city.` });
    }
  }

  async function deleteCity(cityId: string) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_API}/cities/${cityId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      console.log(data);
      dispatch({ type: 'city/deleted', payload: data.id });
    } catch {
      dispatch({ type: 'rejected', payload: `Error while deleting the city.` });
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
        error,
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
    throw new Error('useCities must be used within a CitiesProvider');
  }

  return context;
}

export { CitiesProvider, useCities };
