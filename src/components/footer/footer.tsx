import styles from './footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        {" "}
        &copy; Copyright {new Date().getFullYear()} by Marina
      </p>
    </footer>
  );
}

export default Footer;
