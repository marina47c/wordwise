import { Link } from "react-router-dom";
import { CityType } from "../../utils/types";
import styles from "./cityItem.module.css";
import { useCities } from "../../contexts/citiesContext";

type CityItemProps = {
  city: CityType;
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem(props: CityItemProps) {
  const { city } = props;
  const { cityName, emoji, date, id, position } = city;

  const { currentCity } = useCities();
  const isActive: boolean = currentCity?.id === id;

  return (
    <li>
      <Link
        to={`${id}?&lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          isActive ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
