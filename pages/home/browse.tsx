import { FC, useState, useRef, useEffect } from "react";
import SubNavBar from "components/SubNavBar/SubNavBar";
import styles from "styles/Browse.module.scss";
import { GetServerSideProps } from "next";
import { getManga, getTagsList } from "data/getData";
import {
  Grid,
  Input,
  Pagination,
  Popover,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import MangaCardNormal from "components/nomalCard/MangaCardNormal";
import { useRouter } from "next/router";
import { getQueryUrl } from "data/handleData";
import LoadingBar from "react-top-loading-bar";

const Browse: FC<any> = ({ tags, mangaData, page }) => {
  const load = useRef(null);
  const [tagDrop, setTagDrop] = useState<boolean>(true);

  const router = useRouter();

  const sortSelection = [
    {
      text: "Best Match",
      type: "relevance",
      order: "desc",
    },
    {
      text: "Latest Upload",
      type: "latestUploadedChapter",
      order: "desc",
    },
    {
      text: "Oldest Upload",
      type: "latestUploadedChapter",
      order: "asc",
    },
    {
      text: "Title Ascending",
      type: "title",
      order: "asc",
    },
    {
      text: "Title Descending",
      type: "title",
      order: "desc",
    },
    {
      text: "Recently Added",
      type: "createdAt",
      order: "desc",
    },
    {
      text: "Oldest Added",
      type: "createdAt",
      order: "asc",
    },
    {
      text: "Most Follows",
      type: "followedCount",
      order: "desc",
    },
    {
      text: "Fewest Follows",
      type: "followedCount",
      order: "asc",
    },
    {
      text: "Year Ascending",
      type: "year",
      order: "asc",
    },
    {
      text: "Year Descending",
      type: "year",
      order: "desc",
    },
  ];

  useEffect(() => {
    load.current.complete();
  }, [mangaData]);

  const setPage = (page: number) => {
    load.current.continuousStart();
    console.log(router.query)
    const newQuery = getQueryUrl(
      router.query,
      {
        key: "page",
        value: page,
      },
      "page"
    );
    router.push(`/home/browse${newQuery}`);
  };

  const setSort = (type: string, order: string) => {
    load.current.continuousStart();
    const newQuery = getQueryUrl(
      router.query,
      {
        key: "order",
        value: {
          type,
          order,
        },
      },
      "order"
    );
    router.push(`/home/browse${newQuery}`);
  };

  return (
    <SubNavBar>
      <LoadingBar ref={load} color="#fca815" />
      <Grid.Container gap={1} justify="center">
        <Grid xs={10} direction="column">
          <Popover placement="bottom-left">
            <Popover.Trigger>
              <div className={styles["browse-sort"]}>
                <Text>
                  Sort by: <Text b>Best Match</Text>
                  <i
                    className="fa-light fa-arrow-down"
                    style={{ marginLeft: "10px" }}
                  ></i>
                </Text>
              </div>
            </Popover.Trigger>
            <Popover.Content>
              <ul className={styles["browse-sort-list"]}>
                {sortSelection.map((item: any, index: number) => (
                  <li
                    key={index}
                    onClick={() => setSort(item.type, item.order)}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </Popover.Content>
          </Popover>

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
            <Input
              placeholder="Keywords"
              underlined
              color="primary"
              contentRight={<i className="fa-regular fa-magnifying-glass"></i>}
            />
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

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  let order: any = {
    followedCount: "desc",
  };

  if (context.query.order) {
    const orderSplit = context.query.order.split(":");
    order = {};
    order[orderSplit[0]] = orderSplit[1];
  }

  console.log(
    "🚀 ~ file: browse.tsx ~ line 213 ~ constgetServerSideProps:GetServerSideProps= ~ context.query",
    context.query
  );

  const page = Number(context.query.page) || 1;
  const tagData = await getTagsList();

  const mangaData = await getManga({
    limit: 90,
    offset: page === 1 ? 0 : (page - 1) * 90,
    contentRating: ["safe", "suggestive", "erotica"],
    includes: ["cover_art", "author", "artist"],
    order: order,
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
