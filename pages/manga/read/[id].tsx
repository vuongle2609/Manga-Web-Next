import { getMangaChapters } from "data/getData";
import { GetServerSideProps } from "next/types";
import { FC } from "react";
import styles from "styles/MangaRead.module.scss";
import ReadContent from "components/Manga/read/ReadContent/ReadContent";
import ReadNavigation from "components/Manga/read/ReadNavigation/ReadNavigation";
import { getImageUrl } from "data/handleData";

interface propsType {
  imageArray: string[];
  fullScreen: boolean;
}

const read: FC<propsType> = ({ imageArray, fullScreen }) => {
  return (
    <div className={styles["manga-read"]}>
      {/* <ReadNavigation /> */}
      <ReadContent imageArray={imageArray} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const chapterId: any = context.params.id;
  const dataSaver: any = context.query.datasave;

  const getChapterData = () => getMangaChapters(chapterId);

  // const getMangaData = () =>  getMangaChapterList({
  //   id: mangaId,
  //   order: {
  //     volume: "desc",
  //     chapter: "desc",
  //   },
  //   translatedLanguage: ,
  //   includes: ["user", "scanlation_group"],
  //   limit: 96,
  //   contentRating: ["safe", "suggestive", "erotica", "pornographic"],
  // });

  const [chapterData] = await Promise.all([
    getChapterData(),
    // max-height: 100vh;
    // getMangaData(),
  ]);

  const { chapter } = chapterData.data;
  const imageArr = getImageUrl(
    dataSaver ? chapter.dataSaver : chapter.data,
    chapter.hash,
    dataSaver
  );

  return {
    props: {
      imageArray: imageArr,
      // mangaData: mangaData,
      fullScreen: true,
    },
  };
};

export default read;
