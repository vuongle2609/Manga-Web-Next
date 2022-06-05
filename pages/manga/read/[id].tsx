import { getMangaChapters } from "data/getData";
import { GetServerSideProps } from "next/types";
import { FC } from "react";

interface propsType {
  chapterData: any;
}

const read: FC<propsType> = ({ chapterData }) => {
  console.log("🚀 ~ file: [id].tsx ~ line 10 ~ chapterData", chapterData);

  return <div>read </div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: any = context.params.id;

  const chapterData = await getMangaChapters(id);

  return {
    props: {
      chapterData: chapterData.data,
    },
  };
};

export default read;
