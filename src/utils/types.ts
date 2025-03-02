export type PositionType = {
  lat: number;
  lng: number;
};

export type CityType = {
  cityName: string;
  country: string;
  date: Date;
  emoji: string;
  id: string;
  notes: string;
  position: PositionType;
};

export type Country = {
  country: string;
  emoji: string;
};
