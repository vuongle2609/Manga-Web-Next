import { FC, useState } from "react";
import { Grid, Pagination } from "@nextui-org/react";
import { getRelatedArr } from "data/handleData";
import { handleAddParams } from "data/getData";
import MangaCardNormal from "components/nomalCard/MangaCardNormal";
import useSWR from "swr";

interface PropsType {
  styles: any;
  mangaData: any;
}

const fetcher: (any) => any = (...config) =>
  fetch(...config).then((res) => res.json());

const MangaRelated: FC<PropsType> = ({ styles, mangaData }) => {
  const [offset, setOffset] = useState<number>(0);
  const relatedArr = getRelatedArr(mangaData.relationships);
  const relatedLink = relatedArr.map((item: any) => item.id);

  let res: any;
  if (relatedLink.length !== 0) {
    res = useSWR(
      handleAddParams("/mangaapi", {
        ids: relatedLink,
        limit: 12,
        contentRating: ["safe", "suggestive", "erotica", "pornographic"],
        includes: ["cover_art", "author", "artist"],
        offset: offset,
      }),
      fetcher
    );
  } else {
    res = {
      data: false,
    };
  }

  const { data, error } = res;

  return (
    <div className={styles["manga-sub-content"]}>
      <Grid.Container
        css={{
          flexDirection: "row",
        }}
      >
        {data
          ? data.data?.map((item: any, index: number) => (
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
                <MangaCardNormal data={item} />
              </Grid>
            ))
          : "No related"}
        {error && "Couldn't load"}
      </Grid.Container>
      <div className={styles["manga-pagination"]}>
        {data && (
          <Pagination
            page={offset / 12 + 1}
            total={Math.ceil(data?.total / 12)}
            onChange={(num: number) => setOffset(12 * (num - 1))}
          ></Pagination>
        )}
      </div>
    </div>
  );
};

export default MangaRelated;
