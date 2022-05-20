import { FC } from "react";
import { Text, Image } from "@nextui-org/react";
import { getCover } from "api/index";
import Link from "next/link";
import styles from "./MangaCardNomal.module.scss";

const MangaCardNormal: FC<any> = ({ data }) => {
  const title: any = Object.values(data.attributes.title)[0];

  return (
    <Link href="/">
      <span className={styles["manga-card-normal"]}>
        <div>
          <img
            src={`${getCover({
              id: data.id,
              data: data.relationships,
            })}`}
            alt={title + " cover"}
            className={styles["image-cover-default"]}
          />
        </div>
        <Text size={18}>{title}</Text>
      </span>
    </Link>
  );
};

export default MangaCardNormal;
