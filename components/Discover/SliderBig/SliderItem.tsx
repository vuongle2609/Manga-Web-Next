import { FC, useEffect, useRef } from "react";
import { Text } from "@nextui-org/react";
import { getCover, getDescription } from "data/handleData";
import styles from "./SliderBig.module.scss";
import Link from "next/link";

const SliderItem: FC<any> = ({ data }) => {
  const description = useRef<any>(null);
  const imageCover = useRef<any>(null);

  useEffect(() => {
    if (description.current !== null) {
      description.current.innerHTML = getDescription(
        data.attributes.description?.en
      );
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
      <Link href={`/manga/${data.id}`}>
        <a>
          <div className={styles["slider-item"]}>
            <div>
              <img
                height={"100%"}
                width={"auto"}
                ref={imageCover}
                alt={"Cover " + title}
              />
              <div className={styles["slider-detail"]}>
                <Text b h1>
                  {title}
                </Text>

                <div>
                  <Text ref={description}></Text>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

export default SliderItem;
