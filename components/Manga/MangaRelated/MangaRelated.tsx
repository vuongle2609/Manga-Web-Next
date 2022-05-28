import { FC, useState } from "react";
import { Grid, Loading, Pagination, Text } from "@nextui-org/react";
import { getRelatedArr } from "data/handleData";
import { handleAddParams } from "data/getData";
import MangaCardNormal from "components/nomalCard/MangaCardNormal";
import useSWR from "swr";

interface PropsType {
  styles: any;
  mangaData: any;
}

const fetcher: (any: any) => any = (...config) =>
  fetch(...config).then((res) => res.json());

const MangaRelated: FC<PropsType> = ({ styles, mangaData }) => {
  const [offset, setOffset] = useState<number>(0);
  const relatedArr = getRelatedArr(mangaData.relationships);
  const relatedLink = relatedArr.map((item: any) => item.id);

  let res: any;
  const dataFetched: any = useSWR(
    handleAddParams("/mangaapi", {
      ids: relatedLink,
      limit: 12,
      contentRating: ["safe", "suggestive", "erotica", "pornographic"],
      includes: ["cover_art", "author", "artist"],
      offset: offset,
    }),
    fetcher
  );
  if (relatedLink.length !== 0) {
    res = dataFetched;
  } else {
    res = {
      data: false,
    };
  }

  const { data, error } = res;

  console.log(data);

  return (
    <div className={styles["manga-sub-content"]}>
      <Grid.Container
        css={{
          flexDirection: "row",
        }}
      >
        {data ? (
          data?.data?.map((item: any, index: number) => (
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
        ) : relatedLink.length === 0 ? (
          <div
            className={
              styles["manga-fullwidth"] + " " + styles["manga-plusheight"]
            }
          >
            <Text>There&apos;s no related</Text>
          </div>
        ) : (
          <div
            className={
              styles["manga-fullwidth"] + " " + styles["manga-plusheight"]
            }
          >
            <Loading color="warning" type="points" />
          </div>
        )}
        {error && (
          <div
            className={
              styles["manga-fullwidth"] + " " + styles["manga-plusheight"]
            }
          >
            <Text>Couldn&apos;t load your content</Text>
          </div>
        )}
      </Grid.Container>
      <div className={styles["manga-fullwidth"]}>
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
