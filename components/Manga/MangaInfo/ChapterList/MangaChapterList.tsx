import { FC, useEffect } from "react";
import ChapterItem from "./ChapterItem";
import { Text, Pagination } from "@nextui-org/react";
import styles from "./ChapterList.module.scss";

interface propsType {
  chapterData: any;
}

const MangaChapterList: FC<propsType> = ({ chapterData }) => {
  let prevVol: string;

  return (
    <>
      {chapterData.map((item: any) => {
        if (prevVol !== item.attributes.volume) {
          prevVol = item.attributes.volume;
          return (
            <>
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
            </>
          );
        } else {
          prevVol = item.attributes.volume;
          return <ChapterItem data={item} />;
        }
      })}
      // push to history
      {/* <Pagination
        page={offset / 12 + 1}
        total={Math.ceil(data?.total / 12)}
        onChange={(num: number) => setOffset(12 * (num - 1))}
      ></Pagination> */}
    </>
  );
};

export default MangaChapterList;
