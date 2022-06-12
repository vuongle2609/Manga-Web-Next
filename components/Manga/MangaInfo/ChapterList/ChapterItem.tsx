import { FC } from "react";
import { Text } from "@nextui-org/react";
import moment from "moment";
import styles from "./ChapterList.module.scss";
import language from "configs/language";
import { getChapterCredit } from "data/handleData";
import Link from "next/link";

interface propsType {
  data: any;
  datasaver: boolean;
}

const ChapterItem: FC<propsType> = ({ data, datasaver }) => {
  const { chapter, title, publishAt, translatedLanguage, externalUrl } =
    data.attributes;

  const lang = language.find((item: any) => item.md === translatedLanguage);

  const credit = getChapterCredit(data.relationships);

  const creditLength = credit.length;

  return externalUrl ? (
    <Link href={externalUrl}>
      <a target="_blank" rel="noopener noreferrer">
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
  ) : (
    // <Link href={`/manga/read/${data.id}?m=${id}`}>
    <Link href={`/manga/read/${data.id}${datasaver ? "?datasave=true" : ""}`}>
      <a target="_blank" rel="noopener noreferrer">
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
