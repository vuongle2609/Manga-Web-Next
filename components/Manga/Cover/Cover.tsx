import { FC } from "react";
import styles from "./Cover.module.scss";
import useStore from "store";

interface propsType {
  coverUrl: string;
  maxCoverUrl: string;
}

const Cover: FC<propsType> = ({ coverUrl, maxCoverUrl }) => {
  const [setCoverModal] = useStore((state: any) => [state.setCoverModal]);

  return (
    <div
      onClick={() => setCoverModal(maxCoverUrl)}
      className={styles["manga-cover"]}
      style={{ backgroundImage: `url(${coverUrl})` }}
    >
      <div className={styles["manga-cover-layer"]}>
        <i className="fa-solid fa-arrow-up-right-and-arrow-down-left-from-center"></i>
      </div>
    </div>
  );
};

export default Cover;
