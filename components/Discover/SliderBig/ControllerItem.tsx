import { FC } from "react";
import { getCover } from "data/handleData";
import styles from "./SliderBig.module.scss";

const ControllerItem: FC<any> = ({ data, index, slider }) => {
  const title: any = Object.values(data.attributes.title)[0];
  const subTitleObject: any = data.attributes.altTitles.find(
    (item: any) =>
      (data.attributes.title.en ? item["ja-ro"] : item["en"]) || item["ja"]
  );
  const subTitle: any = Object.values(subTitleObject)[0];

  return (
    <div
      className={
        styles["controller-slider-item"] +
        " " +
        styles[`controller-slider-item-${index}`]
      }
      onClick={() => slider.slickGoTo(index)}
    >
      <div>
        <img
          src={getCover({
            id: data.id,
            data: data.relationships,
          })}
          alt={"cover " + title}
        />
      </div>
      <div>
        <span className={styles["controller-slider-item-clamp"]}>{title}</span>
        <span className={styles["controller-slider-item-sub"]}>{subTitle}</span>
      </div>
    </div>
  );
};

export default ControllerItem;
