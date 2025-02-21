import { City } from "../../utils/types";
import CityItem from "../cityItem/cityItem";
import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import styles from "./cityList.module.css";

interface CityListProps {
  cities: City[];
  isLoading: boolean;
}

function CityList(props: CityListProps) {
  const { cities, isLoading } = props;

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city: City) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
