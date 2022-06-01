import { Grid, Pagination, Text, Loading } from "@nextui-org/react";
import { FC, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { handleAddParams } from "data/getData";
import Cover from "../Cover/Cover";
import { getSingleCover } from "data/handleData";
import LoadingTopBar from "components/LoadingBar/LoadingBar";

interface PropsType {
  styles: any;
  mangaData: any;
}

const fetcher: (any: any) => any = (...config) =>
  fetch(...config).then((res) => res.json());

const MangaArt: FC<PropsType> = ({ styles, mangaData }) => {
  const load = useRef(null);
  const [offset, setOffset] = useState<number>(0);

  const { data, error } = useSWR(
    handleAddParams("/mangacover", {
      order: {
        volume: "asc",
      },
      manga: [mangaData.id],
      limit: 12,
      offset: offset,
    }),
    fetcher
  );

  useEffect(() => {
    load.current.complete();
  }, [data]);

  const dataArr = data?.data?.sort((a: any, b: any) => {
    return Number(a.attributes.volume) - Number(b.attributes.volume);
  });

  return (
    <div className={styles["manga-sub-content"]}>
      <Grid.Container
        css={{
          flexDirection: "row",
        }}
      >
        <LoadingTopBar ref={load} />
        {data ? (
          dataArr?.map((item: any, index: number) => (
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
              <Cover
                coverUrl={getSingleCover({
                  id: mangaData.id,
                  quality: true,
                  fileName: item.attributes.fileName,
                })}
                maxCoverUrl={getSingleCover({
                  id: mangaData.id,
                  max: true,
                  fileName: item.attributes.fileName,
                })}
              />
              <Text size={16} css={{ marginTop: "$1" }} b>
                Volume {item.attributes.volume}
              </Text>
            </Grid>
          ))
        ) : dataArr?.length === 0 ? (
          <div
            className={
              styles["manga-fullwidth"] + " " + styles["manga-plusheight"]
            }
          >
            <Text>There&apos;s no art</Text>
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
            <Text>Couldn&apos;t load</Text>
          </div>
        )}
      </Grid.Container>
      <div className={styles["manga-fullwidth"]}>
        {data ? (
          <Pagination
            page={offset / 12 + 1}
            total={Math.ceil(data?.total / 12)}
            onChange={(num: number) => {
              load.current.continuousStart();
              setOffset(12 * (num - 1));
            }}
          ></Pagination>
        ) : (
          false
        )}
      </div>
    </div>
  );
};

export default MangaArt;
