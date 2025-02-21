import { NavLink } from "react-router-dom";
import styles from "./appNav.module.css";

export default function appNav() {
  return (
    <div className={styles.nav}>
      <ul>
        <NavLink to="cities">Cities</NavLink>
      </ul>
      <ul>
        <NavLink to="countries">Countries</NavLink>
      </ul>
    </div>
  );
}
