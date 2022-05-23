import { FC } from "react";
import { Text } from "@nextui-org/react";
import { getCover } from "getData/index";
import Link from "next/link";
import styles from "./MangaCardNomal.module.scss";

const MangaCardNormal: FC<any> = ({ data }) => {
  const title: any = Object.values(data.attributes.title)[0];

  return (
    <Link href={`/manga/${data.id}`}>
      <a className={styles["manga-card-normal"]}>
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
      </a>
    </Link>
  );
};

export default MangaCardNormal;
