import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useCities } from "../../contexts/citiesContext";
import { CityType } from "../../utils/types";
import { useEffect, useState } from "react";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../buttons/button/button";

interface ChangeCenterProps {
  mapPosition: LatLngExpression;
}

function Map() {
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [searchParams] = useSearchParams();

  const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 10]);
  // const [searchParams, setSearchParams] = useSearchParams();
  const mapLat: number = Number(searchParams.get("lat"));
  const mapLng: number = Number(searchParams.get("lng"));

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "loading..." : "Use your position"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city: CityType) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter mapPosition={mapPosition} />
        <DetectMapClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ mapPosition }: ChangeCenterProps) {
  const map = useMap();
  map.setView(mapPosition);
  return null;
}

function DetectMapClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e: LeafletMouseEvent) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}

export default Map;
