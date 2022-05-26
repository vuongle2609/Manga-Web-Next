import { Grid, Pagination } from "@nextui-org/react";
import moment from "moment";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { handleAddParams } from "data/getData";

interface PropsType {
  styles: any;
  mangaData: any;
}

const fetcher: (any) => any = (...config) =>
  fetch(...config).then((res) => res.json());

const MangaArt: FC<PropsType> = ({ styles, mangaData }) => {
  const [page, setPage] = useState<number>(1);

  const { data, error } = useSWR(
    handleAddParams("/mangacover", {
      order: {
        createdAt: "asc",
        updatedAt: "asc",
        volume: "asc",
      },
      manga: [mangaData.id],
      limit: 1,
      offset: page,
    }),
    fetcher
  );

  console.log(data);

  return (
    <div className={styles["manga-sub-content"]}>
      <Grid.Container
        css={{
          flexDirection: "row",
          "@xsMax": {
            flexDirection: "column",
          },
          "@smMax": {
            flexDirection: "row",
          },
          "@mdMax": {
            flexDirection: "row",
          },
          "@lgMax": {
            flexDirection: "row",
          },
        }}
      >
        <Grid
          xl={2}
          lg={2}
          md={3}
          sm={3}
          xs={12}
          css={{
            display: "flex",
            flexDirection: "column",

            "@xsMax": {
              flexDirection: "row",
              flexWrap: "wrap",
            },
            "@smMax": {
              flexDirection: "row",
              flexWrap: "wrap",
            },
            "@mdMax": {
              paddingRight: "$8",
            },
            "@lgMax": {
              paddingRight: "$8",
            },
          }}
        >
          <Pagination total={10} onChange={setPage}></Pagination>
        </Grid>
        <div className={styles["divider"]}></div>
        <Grid
          xl={10}
          lg={10}
          md={9}
          sm={9}
          xs={12}
          css={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "$1",
          }}
        ></Grid>
      </Grid.Container>
    </div>
  );
};

export default MangaArt;
