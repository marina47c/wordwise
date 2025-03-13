/* eslint-disable @typescript-eslint/no-explicit-any */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./form.module.css";
import Button from "../buttons/button/button";
import BackButton from "../buttons/backButton/backButton";
import { useUrlLocation } from "../../hooks/useUrlPosition";
import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import { CityType } from "../../utils/types/cityTypes";
import { useCities } from "../../contexts/citiesContext";
import { useNavigate } from "react-router-dom";
import { convertToEmoji } from "../../utils/helpers";

const URL: string = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const { createCity, isLoading } = useCities();

  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState("");

  const [isLoadingGeolocation, setIsLoadingGeolocation] =
    useState<boolean>(false);
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState<string>();
  const [geocodingError, setGeocodingError] = useState<string>();

  useEffect(
    function () {
      if (!lat && !lng) return;

      async function fetchCityData() {
        try {
          setIsLoadingGeolocation(true);
          setGeocodingError("");
          const res = await fetch(`${URL}?latitude=${lat}&longitude=${lng}`);
          const data = await res.json();

          if (!data.countryCode) {
            throw new Error(
              "It doesn't seem to be a city. Please click somewhere else."
            );
          }

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || "");
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err: any) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeolocation(false);
        }
      }

      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!cityName || !date) return;

    const newCity: CityType = {
      cityName,
      country,
      date,
      emoji: emoji || "",
      notes,
      position: {
        lat,
        lng,
      },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeolocation) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoading && styles.loading}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date: Date | null) => date && setDate(date)}
          dateFormat="dd/MM/yyyy"
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
