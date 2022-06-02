import { FC, useState, useRef, useEffect, useCallback } from "react";
import SubNavBar from "components/SubNavBar/SubNavBar";
import styles from "styles/Browse.module.scss";
import { GetServerSideProps } from "next";
import { getManga, getTagsList } from "data/getData";
import {
  Button,
  Grid,
  Input,
  Loading,
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
import _ from "lodash";

const Browse: FC<any> = ({
  tags,
  fetchedData,
  page,
  query,
  tagQuery,
  keyword,
  orderSplit,
}) => {
  const load = useRef(null);
  const [tagDrop, setTagDrop] = useState<boolean>(true);
  const router = useRouter();
  const [mangaData, setMangaData] = useState<any>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    setMangaData(fetchedData);
  }, [fetchedData]);

  useEffect(() => {
    load.current.complete();
  }, [fetchedData]);

  const setTags = (newTag: string[]) => {
    load.current.continuousStart();
    if (window)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    const newQuery = getQueryUrl(
      router.query,
      {
        key: "tags",
        value: newTag,
      },
      "tags"
    );
    router.push(`/home/browse${newQuery}`);
  };

  const setPage = (num: number) => {
    load.current.continuousStart();
    if (window)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    const newQuery = getQueryUrl(
      router.query,
      {
        key: "page",
        value: num,
      },
      "page"
    );
    router.push(`/home/browse${newQuery}`);
  };

  const setSort = (type: string, order: string) => {
    load.current.continuousStart();
    if (window)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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

  const setKeyword = (keyword: string) => {
    if (query?.keyword !== keyword) {
      load.current.continuousStart();
      if (window)
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      const newQuery = getQueryUrl(
        router.query,
        {
          key: "keyword",
          value: keyword,
        },
        "keyword"
      );
      router.push(`/home/browse${newQuery}`);
    }
  };

  const handleAddTags = (tag: string) => {
    if (window)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    if (tagQuery.includes(tag)) {
      const newArr = tagQuery.filter((item: any) => item !== tag);
      setTags(newArr);
    } else {
      setTags([...tagQuery, tag]);
    }
  };

  const sortByLabel = sortSelection.find(
    (item: any) =>
      item.type === orderSplit?.[0] && item.order === orderSplit?.[1]
  );

  return (
    <SubNavBar>
      <LoadingBar ref={load} color="#fca815" />
      <Grid.Container gap={1} justify="center">
        <Grid sm={10} xs={12} direction="column">
          <Row align="center" justify="space-between" css={{ mb: "$3" }}>
            <Popover
              placement="bottom-left"
              isOpen={isOpen}
              onOpenChange={setIsOpen}
            >
              <Popover.Trigger>
                <div className={styles["browse-sort"]}>
                  <Text>
                    Sort by:{" "}
                    <Text b>{sortByLabel?.text || "Most Follows"}</Text>
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
                      onClick={() => {
                        setIsOpen(false);
                        setMangaData(false);
                        setSort(item.type, item.order);
                      }}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </Popover.Content>
            </Popover>

            <Button
              light
              color="warning"
              auto
              css={{
                "@sm": {
                  display: "none",
                },
              }}
            >
              Filter
            </Button>
          </Row>

          <Grid.Container className={styles["browse-manga"]}>
            {mangaData ? (
              mangaData.data.length !== 0 ? (
                mangaData?.data?.map((item: any, index: number) => (
                  <div key={index} className={styles["grid-item"]}>
                    <MangaCardNormal data={item} />
                  </div>
                ))
              ) : (
                <div className={styles["browse-status"]}>
                  <i className="fa-light fa-face-sad-tear"></i>
                  <Text b size={20}>
                    No result
                  </Text>
                </div>
              )
            ) : (
              <div className={styles["browse-status"]}>
                <Loading />
              </div>
            )}
          </Grid.Container>
          <div className={styles["browse-pagination"]}>
            <Pagination
              page={page}
              total={Math.ceil(
                (mangaData?.total > 9000 ? 9000 : mangaData?.total) / 90
              )}
              onChange={(num: number) => {
                setMangaData(false);
                if (window)
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                setPage(num);
              }}
            ></Pagination>
          </div>
        </Grid>
        <Grid sm={2} xs={0} direction="column">
          <div className={styles["browse-content"]}>
            <Text b>Filter</Text>
            <Spacer y={0.4} />
            <Input
              initialValue={keyword}
              placeholder="Keywords"
              underlined
              color="primary"
              contentRight={<i className="fa-regular fa-magnifying-glass"></i>}
              onBlur={(e: any) => setKeyword(e.target.value)}
            />
          </div>

          <div
            className={
              styles["browse-content"] + " " + styles["browse-content-drop"]
            }
          >
            <div
              onClick={() => {
                setMangaData(false);
                setTagDrop((prev) => !prev);
              }}
            >
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
                  {tags.map((item: any, index: number) => {
                    const tagContains = tagQuery?.includes(item?.id);
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          setMangaData(false);
                          handleAddTags(item?.id);
                        }}
                        style={{
                          background: tagContains && "#fef0d6",
                        }}
                      >
                        <span>{item?.attributes?.name?.en}</span>
                        {tagContains && <i className="fa-light fa-check"></i>}
                      </li>
                    );
                  })}
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

  const tags: any = context.query.tags;
  const tagQuery = tags?.split(",") !== undefined ? tags.split(",") : [];

  const keyword = context.query.keyword || "";

  const query = context.query;

  const orderSplit = context.query?.order?.split?.("-");
  if (context.query.order) {
    order = {};
    order[orderSplit[0]] = orderSplit[1];
  }

  const page = Number(context.query.page) || 1;
  const tagData = await getTagsList();

  const mangaData = await getManga({
    limit: 90,
    offset: page === 1 ? 0 : (page - 1) * 90,
    contentRating: ["safe", "suggestive", "erotica"],
    includes: ["cover_art", "author", "artist"],
    order: order,
    includedTags: tagQuery,
    title: keyword,
  });

  return {
    props: {
      tags: tagData.data,
      fetchedData: await mangaData.data,
      page: page,
      query: query,
      tagQuery: tagQuery,
      keyword: keyword,
      orderSplit: orderSplit,
    },
  };
};

export default Browse;
