import { ReactNode } from "react";
import { CityType } from "./cityTypes";

export interface CitiesProviderProps {
  children?: ReactNode;
}

export interface CityContextType {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType | null;
  error: string | null;
  getCity: (id: string) => void;
  createCity: (newCity: CityType) => void;
  deleteCity: (cityId: string) => void;
}

export type CityState = {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType | null;
  error: string | null;
};
