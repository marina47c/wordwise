import { ReactElement, MouseEventHandler } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  type?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactElement | string;
}

function Button(props: ButtonProps) {
  const { type = "primary", onClick, children } = props;

  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
