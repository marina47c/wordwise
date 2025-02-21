type Position = {
  lat: number;
  lng: number;
};

export type City = {
  cityName: string;
  country: string;
  date: Date;
  emoji: string;
  id: string;
  notes: string;
  position: Position;
};
