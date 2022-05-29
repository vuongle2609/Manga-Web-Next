import { FC, useRef, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Grid, Text, Popover, Button } from "@nextui-org/react";
import styles from "styles/Manga.module.scss";
import { getMangaDetail } from "data/getData";
import {
  getDetail,
  getDescription,
  getOtherNames,
  getCreditDetail,
} from "data/handleData";
import copy from "copy-text-to-clipboard";
import MangaInfo from "components/Manga/MangaInfo/MangaInfo";
import MangaArt from "components/Manga/MangaArt/MangaArt";
import MangaRelated from "components/Manga/MangaRelated/MangaRelated";
import Cover from "components/Manga/Cover/Cover";

const Manga: FC<any> = ({ data }) => {
  console.log(data);
  const [isOpen, setIsOpen] = useState(false);
  const [displayContent, setDisplayContent] = useState<number>(0);
  const description = useRef<any>(null);
  const otherName = useRef<any>(null);
  const { title, subTitle, cover, credit, links, maxCover } = getDetail(data);
  const creditDetail = getCreditDetail(data.relationships);

  useEffect(() => {
    if (description.current !== null) {
      description.current.innerHTML = getDescription(
        data.attributes.description.en
      );
    }

    if (data.attributes.altTitles.length !== 0 && otherName.current !== null) {
      otherName.current.innerHTML = getOtherNames(data.attributes.altTitles);
    }
  }, [displayContent]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 800);
    }
  }, [isOpen]);

  useEffect(() => {
    setDisplayContent(0);
  }, [data]);

  return (
    <>
      <div className={styles["manga-content"]}>
        <Grid.Container>
          <Grid xl={2} lg={2} md={3} sm={3} xs={5}>
            <Cover coverUrl={cover} maxCoverUrl={maxCover}/>
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
        <div className={styles["manga-action-zone"]}>
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
          <Button.Group
            color="primary"
            bordered
            borderWeight="light"
            className={styles["btn-group"]}
          >
            <Button onPress={() => setDisplayContent(0)}>Info</Button>
            <Button onPress={() => setDisplayContent(1)}>Related</Button>
            <Button onPress={() => setDisplayContent(2)}>Art</Button>
          </Button.Group>
        </div>
        {displayContent === 0 && (
          <MangaInfo
            styles={styles}
            data={data}
            creditDetail={creditDetail}
            description={description}
            links={links}
            otherName={otherName}
          />
        )}
        {displayContent === 1 && (
          <MangaRelated styles={styles} mangaData={data} />
        )}
        {displayContent === 2 && <MangaArt styles={styles} mangaData={data} />}
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
