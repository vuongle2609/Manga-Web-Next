import { FC, useState } from "react";
import SubNavBar from "components/SubNavBar/SubNavBar";
import styles from "styles/Browse.module.scss";
import { GetServerSideProps } from "next";
import { getManga, getTagsList } from "data/getData";
import { Grid, Input, Row, Spacer, Text } from "@nextui-org/react";
import MangaCardNormal from "components/nomalCard/MangaCardNormal";

const Browse: FC<any> = ({ tags, mangaData }) => {
  console.log("🚀 ~ file: browse.tsx ~ line 7 ~ tags", mangaData);
  const [tagDrop, setTagDrop] = useState<boolean>(true);

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

  return (
    <SubNavBar>
      <Grid.Container gap={1} justify="center">
        <Grid xs={10} direction="column">
          <div className={styles["browse-sort"]}>
            <Text>
              Sort by: <Text b>Best Match</Text>
              <i className="fa-light fa-arrow-up"></i>
            </Text>
          </div>
          <Grid.Container className={styles["browse-manga"]}>
            {mangaData.map((item: any) => (
              <Grid lg={2}>
                <MangaCardNormal data={item} />
              </Grid>
            ))}
          </Grid.Container>
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
                  {tags.map((item: any) => (
                    <li>{item?.attributes?.name?.en}</li>
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
console.log("🚀 ~ file: browse.tsx ~ line 83 ~ constgetServerSideProps:GetServerSideProps= ~ context", context)
  const tagData = await getTagsList();
  const mangaData = await getManga({
    limit: 90,
    offset: 0,
    contentRating: ["safe", "suggestive", "erotica"],
    includes: ["cover_art", "author", "artist"],
    order: {
      // createdAt: "desc",
    },
  });

  return {
    props: {
      tags: tagData.data,
      mangaData: mangaData.data.data,
    },
  };
};

export default Browse;
