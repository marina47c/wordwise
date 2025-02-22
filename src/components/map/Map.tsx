import { useSearchParams } from "react-router-dom";
import styles from "./map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h1>
        position: {lat}, {lng}
      </h1>
    </div>
  );
}

export default Map;
