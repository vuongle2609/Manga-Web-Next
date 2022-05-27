import { FC } from "react";
import styles from "./Cover.module.scss";

interface propsType {
  coverUrl: string;
}

const Cover: FC<propsType> = ({ coverUrl }) => {
  return (
    <div
      className={styles["manga-cover"]}
      style={{ backgroundImage: `url(${coverUrl})` }}
    ></div>
  );
};

export default Cover;
