// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./form.module.css";
import Button from "../buttons/button/button";
import { useNavigate } from "react-router-dom";
import BackButton from "../buttons/backButton/backButton";
import { useUrlLocation } from "../../hooks/useUrlPosition";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const URL: string = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlLocation();

  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState("");

  const [isLoadingGeolocation, setIsLoadingGeolocation] =
    useState<boolean>(false);
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState("");

  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setIsLoadingGeolocation(true);
          const res = await fetch(`${URL}?latitude=${lat}&longitude=${lng}`);
          const data = await res.json();
          console.log(data);
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || "");
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoadingGeolocation(false);
        }
      }

      fetchCityData();
    },
    [lat, lng]
  );

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date.toString()}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
