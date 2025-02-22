import { Link } from "react-router-dom";
import { CityType } from "../../utils/types";
import styles from "./cityItem.module.css";

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

  return (
    <li>
      <Link
        to={`${id}?&lat=${position.lat}&lng=${position.lng}`}
        className={styles.cityItem}
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
