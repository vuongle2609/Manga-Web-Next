import { FC, useState } from "react";
import styles from "./GotoTop.module.scss";

const GotoTop: FC = () => {
  const [display, setDisplay] = useState(true);
  window.onscroll = () => {
    setDisplay(window.scrollY <= 300);
  };

  const scrollWindow = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={styles["goto-top"] + " " + (display && styles["hide"])}
      onClick={scrollWindow}
    >
      <i className="fa-solid fa-angle-up"></i>
    </button>
  );
};

export default GotoTop;
