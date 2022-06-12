import { FC } from "react";
import styles from "./ReadContent.module.scss";

interface propsTypes {
  imageArray: string[];
}

const ReadContent: FC<propsTypes> = ({ imageArray }) => {
  return (
    <div className={styles["img-container"]}>
      {imageArray.map((item: any, index: number) => (
        <img src={item} key={index} />
      ))}
    </div>
  );
};

export default ReadContent;
