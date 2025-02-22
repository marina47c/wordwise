import { Country } from "../../utils/types";
import styles from "./CountryItem.module.css";

type CountryItemProps = {
  country: Country;
}

function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
