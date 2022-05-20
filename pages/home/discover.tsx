import { FC } from "react";
import "styles/Discover.module.scss";
import SliderBig from "components/Discover/SliderBig/SliderBig";
import SliderArticle from "components/Discover/SliderArticle/SliderArticle";
import ColumnsArticle from "components/Discover/ColumnsArticle/ColumnsArticle";
import SubNavBar from "components/SubNavBar/SubNavBar";
import { GetServerSideProps } from "next";
import { getManga } from "api/index";

const Discover: FC<any> = (props) => {
  const { sliderBigData, sliderArticle1Data, sliderArticle2Data } = props;

  return (
    <SubNavBar>
      <SliderBig data={sliderBigData} />
      <SliderArticle data={sliderArticle1Data} label="Seasonal" />

      <ColumnsArticle />

      <SliderArticle data={sliderArticle2Data} label="Recently added" />
    </SubNavBar>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const getSliderBigData = () => {
    return getManga({
      limit: 6,
      includes: ["cover_art"],
      order: {
        followedCount: "desc",
        relevance: "desc",
        latestUploadedChapter: "desc",
      },
    });
  };

  const getSliderArticle1 = () => {
    return getManga({
      limit: 36,
      offset: 7,
      contentRating: ["safe", "suggestive", "erotica"],
      includes: ["cover_art", "author", "artist"],
      order: {
        followedCount: "desc",
      },
    });
  };

  const getSliderArticle2 = () => {
    return getManga({
      limit: 36,
      offset: 0,
      contentRating: ["safe", "suggestive", "erotica"],
      includes: ["cover_art", "author", "artist"],
      order: {
        createdAt: "desc",
      },
    });
  };

  let [sliderBigData, sliderArticle1Data, sliderArticle2Data] =
    await Promise.all([
      getSliderBigData(),
      getSliderArticle1(),
      getSliderArticle2(),
    ]);

  return {
    props: {
      sliderBigData: sliderBigData.data.data,
      sliderArticle1Data: sliderArticle1Data.data.data,
      sliderArticle2Data: sliderArticle2Data.data.data,
    },
  };
};

export default Discover;
