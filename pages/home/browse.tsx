import { FC, useState, useRef, useEffect } from "react";
import SubNavBar from "components/SubNavBar/SubNavBar";
import styles from "styles/Browse.module.scss";
import { GetServerSideProps } from "next";
import { getManga, getTagsList } from "data/getData";
import { Grid, Input, Pagination, Row, Spacer, Text } from "@nextui-org/react";
import MangaCardNormal from "components/nomalCard/MangaCardNormal";
import { useRouter } from "next/router";
import { getQueryUrl } from "data/handleData";
import LoadingTopBar from "components/LoadingBar/LoadingBar";

const Browse: FC<any> = ({ tags, mangaData, page }) => {
  // console.log("🚀 ~ file: browse.tsx ~ line 7 ~ tags", mangaData);
  const load = useRef(null);
  const [tagDrop, setTagDrop] = useState<boolean>(true);
  const router = useRouter();
  console.log(page);

  const sortSelection = [
    "Best Match",
    "Latest Upload",
    "Oldest Upload",
    "Title Ascending",
    "Title Descending",
    "Recently Added",
    "Oldest Added",
    "Most Follows",
    "Fewest Follows",
    "Year Ascending",
    "Year Descending",
  ];

  useEffect(() => {
    load.current.complete();
  }, [mangaData]);

  const setPage = (page: number) => {
    load.current.continuousStart();
    const newQuery = getQueryUrl(router.query, {
      key: "page",
      value: page,
    });
    router.replace(`/home/browse${newQuery}`);
  };
  console.log(
    Math.ceil((mangaData?.total > 9000 ? 9000 : mangaData?.total) / 90)
  );
  return (
    <SubNavBar>
      <LoadingTopBar ref={load} />
      <Grid.Container gap={1} justify="center">
        <Grid xs={10} direction="column">
          <div className={styles["browse-sort"]}>
            <Text>
              Sort by: <Text b>Best Match</Text>
              <i
                className="fa-light fa-arrow-down"
                style={{ marginLeft: "10px" }}
              ></i>
            </Text>
          </div>
          <Grid.Container className={styles["browse-manga"]}>
            {mangaData?.data?.map((item: any, index: number) => (
              <Grid lg={2} key={index}>
                <MangaCardNormal data={item} />
              </Grid>
            ))}
          </Grid.Container>
          <div className={styles["browse-pagination"]}>
            <Pagination
              page={page}
              total={Math.ceil(
                (mangaData?.total > 9000 ? 9000 : mangaData?.total) / 90
              )}
              onChange={setPage}
            ></Pagination>
          </div>
        </Grid>
        <Grid xs={2} direction="column">
          <div className={styles["browse-content"]}>
            <Text b>Filter</Text>
            <Spacer y={0.4} />
            <Input placeholder="Keywords" />
          </div>

          <div
            className={
              styles["browse-content"] + " " + styles["browse-content-drop"]
            }
          >
            <div onClick={() => setTagDrop((prev) => !prev)}>
              <Text b>Tags</Text>
              {tagDrop ? (
                <i className="fa-light fa-arrow-up"></i>
              ) : (
                <i className="fa-light fa-arrow-down"></i>
              )}
            </div>
            {tagDrop && (
              <>
                <Spacer y={0.4} />
                <ul className={styles["browse-list"]}>
                  {tags.map((item: any, index: number) => (
                    <li key={index}>{item?.attributes?.name?.en}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </Grid>
      </Grid.Container>
    </SubNavBar>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query.page) || 1;
  const tagData = await getTagsList();

  const mangaData = await getManga({
    limit: 90,
    offset: page === 1 ? 0 : (page - 1) * 90,
    contentRating: ["safe", "suggestive", "erotica"],
    includes: ["cover_art", "author", "artist"],
    order: {
      followedCount: "desc",
    },
  });

  return {
    props: {
      tags: tagData.data,
      mangaData: mangaData.data,
      page: page,
    },
  };
};

export default Browse;
