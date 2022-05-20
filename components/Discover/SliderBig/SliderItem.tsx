import { FC, useEffect, useRef } from "react";
import { Text } from "@nextui-org/react";
import { getCover } from "api/index";
import styles from "./SliderBig.module.scss";

const SliderItem: FC<any> = ({ data }) => {
  const description = useRef<any>(null);
  const imageCover = useRef<any>(null);

  useEffect(() => {
    if (description.current !== null) {
      description.current.innerHTML = data.attributes.description?.en;
    }

    imageCover.current.src = getCover({
      id: data.id,
      data: data.relationships,
      quality: true,
    });
  }, []);

  const title: any = Object.values(data.attributes.title)[0];

  return (
    <>
      <div className={styles["slider-item"]}>
        <div>
          <img
            height={"100%"}
            width={"auto"}
            ref={imageCover}
            alt={"Cover " + title}
          />
          <div>
            <Text b h1>
              {title}
            </Text>
            <Text ref={description}></Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderItem;
