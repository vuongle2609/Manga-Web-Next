import { FC, useRef, useEffect } from "react";
import { Text } from "@nextui-org/react";
import moment from "moment";
import styles from "./ChapterList.module.scss";
import language from "configs/language";
import { getChapterCredit } from "data/handleData";
import Link from "next/link";

interface propsType {
  data: any;
}

const ChapterItem: FC<propsType> = ({ data }) => {
  const { chapter, title, publishAt, translatedLanguage } = data.attributes;

  const lang = language.find((item: any) => item.md === translatedLanguage);

  const credit = getChapterCredit(data.relationships);

  const creditLength = credit.length;

  return (
    <Link href={`/read/${data.id}`}>
      <a>
        <div className={styles["chapter-container"]}>
          <div>
            <Text b>
              Chapter {chapter}
              {title && `:  ${title}`}
            </Text>
            <Text>{lang.english}</Text>
          </div>
          <div>
            <Text>{moment(publishAt).fromNow()}</Text>
            <div>
              {credit.map((item: any, index: number) => (
                <Text key={index}>
                  {(index !== 0 && creditLength !== 1 ? ", " : " ") +
                    (item.attributes.name || item.attributes.username)}
                </Text>
              ))}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ChapterItem;
