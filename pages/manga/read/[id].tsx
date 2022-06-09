import { getMangaChapters } from "data/getData";
import { GetServerSideProps } from "next/types";
import { FC, useState } from "react";
import styles from "styles/MangaRead.module.scss";

interface propsType {
  chapterData: any;
  fullScreen: boolean;
}

const read: FC<propsType> = ({ chapterData, fullScreen }) => {
  // console.log("🚀 ~ file: [id].tsx ~ line 10 ~ chapterData", chapterData);
  const [showNav, setShowNav] = useState<boolean>(false);
  return (
    <div className={styles["manga-read"]}>
      <div
        onClick={() => setShowNav((prev) => !prev)}
        className={
          styles["manga-read-navbutton"] + " " + (showNav && styles["hide"])
        }
      >
        <i className="fa-thin fa-bars"></i>
      </div>

        
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: any = context.params.id;

  const chapterData = await getMangaChapters(id);

  return {
    props: {
      chapterData: chapterData.data,
      fullScreen: true,
    },
  };
};

export default read;
