import { ReactNode } from 'react';
import { CityType } from '../types';

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

export interface CityState {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType | null;
  error: string | null;
}
