import { FC, useState, useRef, useEffect } from "react";
import styles from "./GotoTop.module.scss";

const GotoTop: FC = () => {
  const [display, setDisplay] = useState(true);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const goTopBtn = button.current;
    window.onscroll = () => {
      setDisplay(window.scrollY <= 300);
    };

    const scrollWindow = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    goTopBtn.onclick = () => scrollWindow();
  }, []);

  return (
    <button
      ref={button}
      className={styles["goto-top"] + " " + (display && styles["hide"])}
    >
      <i className="fa-solid fa-angle-up"></i>
    </button>
  );
};

export default GotoTop;
