import { City, Country } from "../../utils/types";
import CountryItem from "../countryItem/countryItem";
import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import styles from "./countryList.module.css";

interface CuntryListProps {
  cities: City[];
  isLoading: boolean;
}

function CountryList(props: CuntryListProps) {
  const { cities, isLoading } = props;

  const countries: Country[] = cities.reduce((array: Country[], city: City) => {
    const countries: string[] = array.map((country) => country.country);
    
    return countries.includes(city.country)
      ? array
      : [...array, { country: city.country, emoji: city.emoji }];
  }, []);

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cuntryList}>
      {countries.map((country: Country, index: number) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}

export default CountryList;
