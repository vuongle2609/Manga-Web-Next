import { getRandomManga } from "data/getData";
import { GetServerSideProps } from "next/types";

const random = () => {
  return;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await getRandomManga();

  const id = data.data.data.id;

  return {
    redirect: {
      permanent: false,
      destination: `/manga/${id}`,
    },
    props: {},
  };
};

export default random;
