type Position = {
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
  position: Position;
};

export type Country = {
  country: string;
  emoji: string;
}
