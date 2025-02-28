import { useCities } from "../../contexts/citiesContext";
import CityItem from "../cityItem/cityItem";
import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import styles from "./cityList.module.css";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
