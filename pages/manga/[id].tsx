import { FC, useRef, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { Grid, Text, Popover } from "@nextui-org/react";
import styles from "styles/Manga.module.scss";
import {
  getDetail,
  getMangaDetail,
  getDescription,
  getOtherNames,
} from "getData/index";
import copy from "copy-text-to-clipboard";
import moment from "moment";

const Manga: FC<any> = ({ data }) => {
  console.log(data);
  const [isOpen, setIsOpen] = useState(false);
  const description = useRef<any>(null);
  const otherName = useRef<any>(null);
  const { title, subTitle, cover, credit } = getDetail(data);

  const test = new Date(data.createdAt);
  console.log("🚀 ~ file: [id].tsx ~ line 22 ~ test", test)
  console.log(moment(test));
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
        <div className={styles["manga-sub-content"]}>
          <Grid.Container>
            <Grid
              xl={2}
              lg={2}
              md={3}
              sm={3}
              xs={5}
              css={{
                display: "flex",
                flexDirection: "column",
                paddingRight: "$8",
              }}
            >
              <Text size={20} b>
                Create date
              </Text>
              <Text>{/* {moment(data.createdAt).toDate()} */}</Text>
            </Grid>
            <Grid
              xl={10}
              lg={10}
              md={9}
              sm={9}
              xs={7}
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
