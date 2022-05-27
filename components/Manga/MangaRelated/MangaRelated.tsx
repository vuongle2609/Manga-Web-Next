import { FC } from "react";
import { Grid, Text } from "@nextui-org/react";
import { getRelated } from "data/handleData";
import MangaCardNormal from "components/nomalCard/MangaCardNormal";

interface PropsType {
  styles: any;
  mangaData: any;
}

const MangaRelated: FC<PropsType> = ({ styles, mangaData }) => {
  const data = getRelated(mangaData.relationships);
  console.log("🚀 ~ file: MangaRelated.tsx ~ line 11 ~ data", data);

  return (
    <div className={styles["manga-sub-content"]}>
      <Grid.Container
        css={{
          flexDirection: "row",
        }}
      >
        {data.length !== 0 ? (
          data.map((item: any, index: number) => (
            <Grid
              xl={2}
              lg={2}
              md={2.4}
              sm={3}
              xs={6}
              css={{
                display: "flex",
                flexDirection: "column",
                padding: "$3 $3",
              }}
              key={index}
            >
              {/* <MangaCardNormal /> */}
            </Grid>
          ))
        ) : (
          <Text>Not update yet!</Text>
        )}
      </Grid.Container>
    </div>
  );
};

export default MangaRelated;
