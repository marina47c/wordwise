import styles from "./AppLayout.module.css";
import SideBar from "../components/sideBar/SideBar";
import Map from "../components/map/Map";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}
