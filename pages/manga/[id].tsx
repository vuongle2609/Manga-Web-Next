import { FC, useRef, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Grid, Text, Popover } from "@nextui-org/react";
import styles from "styles/Manga.module.scss";
import {
  getDetail,
  getMangaDetail,
  getDescription,
  getOtherNames,
  getCreditDetail,
} from "getData/index";
import copy from "copy-text-to-clipboard";
import moment from "moment";

const Manga: FC<any> = ({ data }) => {
  console.log(data);
  const [isOpen, setIsOpen] = useState(false);
  const description = useRef<any>(null);
  const otherName = useRef<any>(null);
  const { title, subTitle, cover, credit } = getDetail(data);

  const { artistDetail, authorDetail } = getCreditDetail(data.relationships);

  useEffect(() => {
    if (description.current !== null) {
      description.current.innerHTML = getDescription(
        data.attributes.description.en
      );
    }

    if (data.attributes.altTitles.length !== 0 && otherName.current !== null) {
      otherName.current.innerHTML = getOtherNames(data.attributes.altTitles);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 800);
    }
  }, [isOpen]);

  return (
    <>
      <div className={styles["manga-content"]}>
        <Grid.Container>
          <Grid xl={2} lg={2} md={3} sm={3} xs={5}>
            <div
              className={styles["manga-cover"]}
              style={{ backgroundImage: `url(${cover})` }}
            ></div>
          </Grid>
          <Grid xl={10} lg={10} md={9} sm={9} xs={7}>
            <div className={styles["manga-detail"]}>
              <div>
                <Popover
                  placement={"bottom"}
                  isOpen={isOpen}
                  onOpenChange={setIsOpen}
                >
                  <Popover.Trigger>
                    <Text
                      h1
                      onClick={() => {
                        copy(title);
                      }}
                    >
                      {title}
                    </Text>
                  </Popover.Trigger>
                  <Popover.Content>
                    <Text css={{ p: "$6", color: "$success" }}>
                      Copied to your clipboard
                    </Text>
                  </Popover.Content>
                </Popover>
                <Text>{subTitle}</Text>
              </div>
              <Text>{credit}</Text>
            </div>
          </Grid>
        </Grid.Container>
        <div className={styles["manga-tags"]}>
          {data.attributes.tags.length !== 0
            ? data.attributes.tags.map((item: any, index: number) => (
                <Link href={`/tag/${item.id}`} key={index}>
                  <a>
                    <Text
                      css={{
                        color: "Orange",
                        paddingRight: "$8",
                        fontWeight: "$bold",
                      }}
                    >
                      {item.attributes.name.en}
                    </Text>
                  </a>
                </Link>
              ))
            : false}
        </div>
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
              <div className={styles["content-child"]}>
                <Text size={20} b>
                  Author
                </Text>
                {authorDetail.length !== 0 ? (
                  authorDetail.map((item: any, index: number) => (
                    <Link href={`/author/${item.id}`} key={index}>
                      <a>
                        <Text css={{ color: "Orange" }}>
                          {item.attributes.name}
                        </Text>
                      </a>
                    </Link>
                  ))
                ) : (
                  <Text>Not update yet</Text>
                )}
              </div>
              <hr />
              <div className={styles["content-child"]}>
                <Text size={20} b>
                  Artist
                </Text>
                {artistDetail.length !== 0 ? (
                  artistDetail.map((item: any, index: number) => (
                    <Link href={`/author/${item.id}`} key={index}>
                      <a>
                        <Text css={{ color: "Orange" }}>
                          {item.attributes.name}
                        </Text>
                      </a>
                    </Link>
                  ))
                ) : (
                  <Text>Not update yet</Text>
                )}
              </div>
              <hr />
              <div className={styles["content-child"]}>
                <Text size={20} b>
                  Create date
                </Text>
                <Text>{moment(data.attributes.createdAt).fromNow()}</Text>
              </div>
              <hr />
              <div className={styles["content-child"]}>
                <Text size={20} b>
                  Last update
                </Text>
                <Text>{moment(data.attributes.updatedAt).fromNow()}</Text>
              </div>
              <hr />
              <div className={styles["content-child"]}>
                <Text size={20} b>
                  Status
                </Text>
                <Text>{data.attributes.status.toUpperCase()}</Text>
              </div>
              <hr />
            </Grid>
            <hr className={styles["divider"]} />
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
            >
              <Text size={20} b>
                Description
              </Text>
              <Text ref={description}></Text>
              <hr />
              {data.attributes.altTitles.length !== 0 ? (
                <>
                  <Text size={20} b>
                    Other names
                  </Text>
                  <div ref={otherName}></div>
                </>
              ) : (
                false
              )}
            </Grid>
          </Grid.Container>
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
