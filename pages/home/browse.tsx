import { FC, useState, useRef, useEffect } from "react";
import SubNavBar from "components/SubNavBar/SubNavBar";
import styles from "styles/Browse.module.scss";
import { GetServerSideProps } from "next";
import { getManga, getTagsList } from "data/getData";
import {
  Button,
  Checkbox,
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
import { getQueryUrl, getQueryUrlObj, isNumeric } from "data/handleData";
import LoadingBar from "react-top-loading-bar";
import _ from "lodash";
import { SORT_SELECTION } from "configs/constant";
import FilterModal from "components/Browse/FilterModal/FilterModal";

const Browse: FC<any> = ({
  tags,
  fetchedData,
  page,
  query,
  tagQuery,
  keyword,
  statusQuery,
  orderSplit,
  year,
  // author,
  // artist,
}) => {
  const load = useRef(null);
  const [tagDrop, setTagDrop] = useState<boolean>(true);
  const router = useRouter();
  const [mangaData, setMangaData] = useState<any>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalFilter, setModalFilter] = useState<boolean>(false);

  useEffect(() => {
    setMangaData(fetchedData);
  }, [fetchedData]);

  useEffect(() => {
    load.current.complete();
  }, [fetchedData]);

  const handleChangeRouter: ({
    key: string,
    value: any,
    condition: boolean,
  }) => void = ({ key, value, condition }) => {
    if (condition) {
      setMangaData(false);
      load.current.continuousStart();
      if (window)
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      const newQuery = getQueryUrl(
        router.query,
        {
          key: key,
          value: value,
        },
        key
      );
      router.replace(`/home/browse${newQuery}`);
    }
  };

  // for filter modal
  const handleClickSave = ({
    tagsSelected,
    statusSelected,
    newKeyword,
    newYear,
  }) => {
    if (newYear === "" || newYear === null || (isNumeric(newYear) && Number(newYear) >= 1945)) {
      load.current.continuousStart();
      setModalFilter(false);
      const newQuery: string = getQueryUrlObj({
        tags: tagsSelected,
        status: statusSelected,
        keyword: newKeyword,
        year: newYear,
      });
      console.log(newQuery);
      router.replace(`/home/browse${newQuery}`);
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
      handleChangeRouter({
        key: "tags",
        value: newArr,
        condition: true,
      });
    } else {
      handleChangeRouter({
        key: "tags",
        value: [...tagQuery, tag],
        condition: true,
      });
    }
  };

  const sortByLabel = SORT_SELECTION.find(
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
                  {SORT_SELECTION.map((item: any, index: number) => (
                    <li
                      key={index}
                      onClick={() => {
                        setIsOpen(false);
                        handleChangeRouter({
                          key: "order",
                          value: {
                            type: item.type,
                            order: item.order,
                          },
                          condition: true,
                        });
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
              onClick={() => setModalFilter((prev) => !prev)}
              css={{
                "@sm": {
                  display: "none",
                },
              }}
              className={styles["button-filter"]}
            >
              <i className="fa-regular fa-bars-filter"></i>
              Filter
            </Button>
          </Row>

          <FilterModal
            modalFilter={modalFilter}
            setModalFilter={setModalFilter}
            tags={tags}
            query={query}
            tagQuery={tagQuery}
            keyword={keyword}
            statusQuery={statusQuery}
            orderSplit={orderSplit}
            year={year}
            handleClickSave={handleClickSave}
          />

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
              size={"md"}
              controls={false}
              onChange={(num: number) => {
                handleChangeRouter({
                  key: "page",
                  value: num,
                  condition: true,
                });
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
              onBlur={(e: any) =>
                handleChangeRouter({
                  key: "keyword",
                  value: e.target.value,
                  condition: query?.keyword !== e.target.value,
                })
              }
            />
          </div>

          {/* <div className={styles["browse-content"]}>
            <Input
              initialValue={author}
              placeholder="Author"
              underlined
              color="primary"
              contentRight={<i className="fa-regular fa-pen"></i>}
              onBlur={(e: any) =>
                handleChangeRouter({
                  key: "author",
                  value: e.target.value,
                  condition: query?.author !== e.target.value,
                })
              }
            />
          </div> */}

          {/* <div className={styles["browse-content"]}>
            <Input
              initialValue={artist}
              placeholder="Artist"
              underlined
              color="primary"
              contentRight={<i className="fa-regular fa-palette"></i>}
              onBlur={(e: any) =>
                handleChangeRouter({
                  key: "artist",
                  value: e.target.value,
                  condition: query?.artist !== e.target.value,
                })
              }
            />
          </div> */}

          <div className={styles["browse-content"]}>
            <Input
              initialValue={year}
              placeholder="Year"
              underlined
              color="primary"
              contentRight={<i className="fa-regular fa-calendar"></i>}
              onBlur={(e: any) => {
                handleChangeRouter({
                  key: "year",
                  value: e.target.value,
                  condition:
                    (e.target.value === "" &&
                      e.target.value !== year &&
                      year !== null) ||
                    (query?.year !== e.target.value &&
                      isNumeric(e.target.value) &&
                      Number(e.target.value) >= 1945),
                });
              }}
            />
          </div>

          <Checkbox.Group
            label={<Text b>Status</Text>}
            color="primary"
            onChange={(statusArr: string[]) =>
              handleChangeRouter({
                key: "status",
                value: statusArr,
                condition: true,
              })
            }
            defaultValue={
              statusQuery?.length !== 0
                ? statusQuery
                : ["ongoing", "cancelled", "hiatus", "completed"]
            }
            css={{ paddingBottom: "1rem" }}
          >
            <Checkbox value="ongoing">
              <Text size={16}>Ongoing</Text>
            </Checkbox>
            <Checkbox value="completed">
              <Text size={16}>Completed</Text>
            </Checkbox>
            <Checkbox value="hiatus">
              <Text size={16}>Hiatus</Text>
            </Checkbox>
            <Checkbox value="cancelled">
              <Text size={16}>Cancelled</Text>
            </Checkbox>
          </Checkbox.Group>

          <div
            className={
              styles["browse-content"] + " " + styles["browse-content-drop"]
            }
          >
            <div
              onClick={() => {
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
                          handleAddTags(item?.id);
                        }}
                        style={{
                          background: tagContains && "#fef0d6",
                        }}
                      >
                        <span>
                          <Text size={16}>{item?.attributes?.name?.en}</Text>
                        </span>
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
  const query = context.query;

  // get keyword from query
  const keyword = context.query.keyword || "";

  // default order
  let order: any = {
    followedCount: "desc",
  };

  // get order from query then convert to an array
  const orderSplit = context.query?.order?.split?.("-") || null;
  // change default order if query has order field
  if (context.query.order) {
    order = {};
    order[orderSplit[0]] = orderSplit[1];
  }

  // get tags from query then convert to an array
  const tags: any = context.query.tags;
  const tagQuery = tags?.split(",") !== undefined ? tags.split(",") : [];

  // get status from query then convert to an array
  const status: any = context.query.status;
  const statusQuery = status?.split(",") !== undefined ? status.split(",") : [];

  // get page number
  const page = Number(context.query.page) || 1;

  // // get author
  // const author = context.query.author;

  // // get artist
  // const artist = context.query.artist;

  // get year
  const year = context.query.year || null;

  // get list of tags for selection
  const tagData = await getTagsList();

  const mangaData = await getManga({
    limit: 90,
    offset: page === 1 ? 0 : (page - 1) * 90,
    contentRating: ["safe", "suggestive", "erotica", "pornographic"],
    includes: ["cover_art", "author", "artist"],
    order: order,
    includedTags: tagQuery,
    title: keyword,
    status: statusQuery,
    year: year,
    // authors: author ? [author] : null,
    // artists: artist ? [artist] : null,
  });

  return {
    props: {
      tags: tagData.data,
      fetchedData: await mangaData.data,
      page: page,
      statusQuery: statusQuery,
      query: query,
      tagQuery: tagQuery,
      keyword: keyword,
      year: year,
      orderSplit: orderSplit,
      // author: author || null,
      // artist: artist || null,
    },
  };
};

export default Browse;
