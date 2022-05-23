import { FC, useRef, useEffect } from "react";
import { GetServerSideProps } from "next";
import { Grid, Text } from "@nextui-org/react";
import styles from "styles/Manga.module.scss";
import { getDetail, getMangaDetail, getDescription } from "getData/index";

const Manga: FC<any> = ({ data }) => {
  //   console.log(data);
  const description = useRef<any>(null);
  const { title, subTitle, cover, credit } = getDetail(data);

  useEffect(() => {
    if (description.current !== null) {
      description.current.innerHTML = data.attributes.description?.en;
    }

    console.log(getDescription(data.attributes.description?.en));
  }, []);

  return (
    <>
      <div className={styles["manga-content"]}>
        <Grid.Container>
          <Grid lg={2} md={4} xs={4}>
            <div
              className={styles["manga-cover"]}
              style={{ backgroundImage: `url(${cover})` }}
            ></div>
          </Grid>
          <Grid lg={10} md={8} xs={8}>
            <div className={styles["manga-detail"]}>
              <div>
                <Text h1>{title}</Text>
                <Text>{subTitle}</Text>
              </div>
              <Text>{credit}</Text>
            </div>
          </Grid>
        </Grid.Container>
        <div className={styles["manga-sub-content"]}>
          <Text ref={description}></Text>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: any = context.params.id;
  const option = {
    includes: ["cover_art", "author", "artist"],
  };
  const data = await getMangaDetail({ id, option });

  return {
    props: {
      data: data.data.data,
    },
  };
};
export default Manga;
