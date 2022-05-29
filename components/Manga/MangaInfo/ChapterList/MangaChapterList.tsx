import { FC, useEffect } from "react";
import ChapterItem from "./ChapterItem";
import { Text, Pagination } from "@nextui-org/react";
import styles from "./ChapterList.module.scss";
import { useRouter } from "next/router";

interface propsType {
  chapterData: any;
  translatedLang: string[];
}

const MangaChapterList: FC<propsType> = ({ chapterData, translatedLang }) => {
  const router = useRouter();

  let prevVol: string;

  return (
    <>
      {chapterData.data.map((item: any, index: number) => {
        if (prevVol !== item.attributes.volume) {
          prevVol = item.attributes.volume;
          return (
            <div key={index}>
              <Text
                b
                size={20}
                css={{
                  color: "Orange",
                  marginBottom: "$1",
                }}
              >
                {item.attributes.volume === null
                  ? "No volume"
                  : "Volume " + item.attributes.volume}
              </Text>
              <div className={styles["volume-divider"]}></div>
              <ChapterItem data={item} />
            </div>
          );
        } else {
          prevVol = item.attributes.volume;
          return <ChapterItem data={item} key={index} />;
        }
      })}
      <div className={styles["volume-fullwidth"]}>
        <Pagination
          page={router.query.page ? Number(router.query.page) : 1}
          total={Math.ceil(chapterData.total / 50)}
          onChange={(num: number) =>
            router.replace(`/manga/${router.query.id}?page=${num}`)
          }
        ></Pagination>
      </div>
    </>
  );
};

export default MangaChapterList;
