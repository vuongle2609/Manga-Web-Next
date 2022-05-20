import { FC } from "react";
import "styles/Discover.module.scss";
import SliderBig from "components/Discover/SliderBig/SliderBig";
import SliderArticle from "components/Discover/SliderArticle/SliderArticle";
import ColumnsArticle from "components/Discover/ColumnsArticle/ColumnsArticle";
import SubNavBar from "components/SubNavBar/SubNavBar";

const Discover: FC = () => {
  return (
    <SubNavBar>
      <SliderBig />
      <SliderArticle
        apiOption={{
          limit: 36,
          offset: 7,
          contentRating: ["safe", "suggestive", "erotica"],
          includes: ["cover_art", "author", "artist"],
          order: {
            followedCount: "desc",
          },
        }}
        label="Seasonal"
      />

      <ColumnsArticle />

      <SliderArticle
        apiOption={{
          limit: 36,
          offset: 0,
          contentRating: ["safe", "suggestive", "erotica"],
          includes: ["cover_art", "author", "artist"],
          order: {
            createdAt: "desc",
          },
        }}
        label="Recently added"
      />
    </SubNavBar>
  );
};

export default Discover;
