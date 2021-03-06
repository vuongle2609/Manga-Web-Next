import { FC, useEffect, useRef, useState } from "react";
import ChapterItem from "./ChapterItem";
import { Text, Pagination, Spacer } from "@nextui-org/react";
import styles from "./ChapterList.module.scss";
import { useRouter } from "next/router";
import Dropdown from "components/Dropdown/Dropdown";
import language from "configs/language";
import { getQueryUrl } from "data/handleData";
import LoadingBar from "react-top-loading-bar";

interface propsType {
  chapterData: any;
  translatedLang: string[];
  langSelected: string[];
}

const MangaChapterList: FC<propsType> = ({
  chapterData,
  translatedLang,
  langSelected,
}) => {
  const [datasave, setDatasave] = useState<boolean>(false);
  const load = useRef(null);
  const router = useRouter();

  let prevVol: string;

  useEffect(() => {
    if (load.current) load.current.complete();
  }, [chapterData]);

  const translatedLangModified: any[] = translatedLang.map((textLang) => {
    const langObj = language.find((item: any) => item.md === textLang);
    if (langObj?.english && langObj?.md) {
      return {
        text: langObj.english,
        value: langObj.md,
      };
    }
  });

  const handleChangeLangQuery: (dataArr: any[]) => void = (dataArr) => {
    const newQuery = getQueryUrl(
      router.query,
      {
        key: "language",
        value: dataArr,
      },
      "language"
    );

    router.replace(`/manga/${router.query.id}${newQuery}`);
  };

  const handleChangeSortChapterQuery: (dataValue: string) => void = (
    dataValue
  ) => {
    const newQuery = getQueryUrl(
      router.query,
      {
        key: "sortChapter",
        value: dataValue,
      },
      "sortChapter"
    );

    router.replace(`/manga/${router.query.id}${newQuery}`);
  };

  const handleChangeSortVolumeQuery: (dataValue: string) => void = (
    dataValue
  ) => {
    const newQuery = getQueryUrl(
      router.query,
      {
        key: "sortVolume",
        value: dataValue,
      },
      "sortVolume"
    );

    router.replace(`/manga/${router.query.id}${newQuery}`);
  };

  const handleQuality = (dataType: string) => {
    setDatasave(dataType === "datasaver");
  };

  const sortList = [
    {
      text: "Descending",
      value: "desc",
    },
    {
      text: "Ascending",
      value: "asc",
    },
  ];

  const qualityList = [
    {
      text: "High",
      value: "data",
    },
    {
      text: "Datasave",
      value: "datasaver",
    },
  ];

  return chapterData.data.length !== 0 ? (
    <>
      <LoadingBar color="#fca815" ref={load} />
      <div className={styles["dropdown-container"]}>
        <Dropdown
          onChange={handleQuality}
          listValue={qualityList}
          LabelDisplay={"Select quality"}
          id={"quality"}
        />
        <Spacer />
        <Dropdown
          onChange={handleChangeLangQuery}
          listValue={translatedLangModified}
          value={langSelected}
          LabelDisplay={"Select language"}
          checkbox
          id={"lang"}
        />
        <Spacer />
        <Dropdown
          onChange={handleChangeSortChapterQuery}
          listValue={sortList}
          LabelDisplay={"Sort chapter by"}
          selectDefault="desc"
          id={"chap"}
        />
        <Spacer />
        <Dropdown
          onChange={handleChangeSortVolumeQuery}
          listValue={sortList}
          LabelDisplay={"Sort volume by"}
          selectDefault="desc"
          id={"vol"}
        />
      </div>
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
              <ChapterItem data={item} datasaver={datasave} />
            </div>
          );
        } else {
          prevVol = item.attributes.volume;
          return <ChapterItem data={item} key={index} datasaver={datasave} />;
        }
      })}
      <div className={styles["volume-fullwidth"]}>
        <Pagination
          page={router.query.page ? Number(router.query.page) : 1}
          total={Math.ceil(chapterData.total / 50)}
          onChange={(num: number) => {
            load.current.continuousStart();
            const newQuery = getQueryUrl(
              router.query,
              {
                key: "page",
                value: num,
              },
              "page"
            );

            return router.replace(`/manga/${router.query.id}${newQuery}`);
          }}
        ></Pagination>
      </div>
    </>
  ) : (
    <div
      className={styles["volume-fullwidth"] + " " + styles["volume-plusheight"]}
    >
      <Text size={20}>No chapters</Text>
    </div>
  );
};

export default MangaChapterList;
