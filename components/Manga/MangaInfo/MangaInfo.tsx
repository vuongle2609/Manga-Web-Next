import { FC } from "react";
import Link from "next/link";
import { Grid, Text } from "@nextui-org/react";
import moment from "moment";
import MangaChapterList from "./ChapterList/MangaChapterList";

interface PropsType {
  styles: any;
  creditDetail: any;
  data: any;
  description: any;
  otherName: any;
  links: any;
  chapterData: any;
  langSelected?: string[];
}

const MangaInfo: FC<PropsType> = ({
  styles,
  creditDetail,
  data,
  description,
  otherName,
  links,
  langSelected,
  chapterData,
}) => {
  const { artistDetail, authorDetail } = creditDetail;
  return (
    <>
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
                  <Text key={index} css={{ color: "Orange" }}>
                    {item.attributes.name}
                  </Text>
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
                  <Text key={index} css={{ color: "Orange" }}>
                    {item.attributes.name}
                  </Text>
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
              <Text size={20} b css={{ marginBottom: "$2", display: "block" }}>
                Links
              </Text>
              <div className={styles["link-others"]}>
                {links?.length !== 0 ? (
                  links?.map((item: any, index: number) => (
                    <a
                      href={item.link}
                      key={index}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Text css={{ color: "Orange" }} b>
                        {item.name}
                      </Text>
                    </a>
                  ))
                ) : (
                  <Text>Not update yet</Text>
                )}
              </div>
            </div>
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
          >
            <MangaChapterList
              chapterData={chapterData}
              translatedLang={data.attributes.availableTranslatedLanguages}
              langSelected={langSelected}
            />
          </Grid>
        </Grid.Container>
      </div>
    </>
  );
};

export default MangaInfo;
