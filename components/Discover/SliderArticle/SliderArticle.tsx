import { FC, useEffect, useRef } from "react";
import { Text } from "@nextui-org/react";
import Link from "next/link";
import Slider from "react-slick";
import styles from "./SliderArticle.module.scss";
import MangaCardNormal from "components/nomalCard/MangaCardNormal";

interface propsType {
  data: any;
  label: string;
}

const SliderArticle: FC<propsType> = ({ data, label }) => {
  const slider = useRef<Slider>(null);
  const nextBtnSlider = useRef<any>(null);
  const prevBtnSlider = useRef<any>(null);

  useEffect(() => {
    const handleClickNext = () => {
      slider.current?.slickNext();
    };

    const handleClickPrev = () => {
      slider.current?.slickPrev();
    };

    const nextBtn = nextBtnSlider.current;
    const prevBtn = prevBtnSlider.current;
    nextBtn.addEventListener("click", handleClickNext);
    prevBtn.addEventListener("click", handleClickPrev);

    return () => {
      nextBtn.removeEventListener("click", handleClickNext);
      prevBtn.removeEventListener("click", handleClickPrev);
    };
  }, []);

  const settings = {
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
    swipe: false,
    easing: "ease-in-out",
    rows: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          swipe: true,
        },
      },
      {
        breakpoint: 810,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className={styles["slider-article"]}>
      <div className={styles["slider-article-label"]}>
        <Link href="/">
          <span>
            <Text h3 b>
              {label}
            </Text>
            <i
              className={
                "fa-regular fa-chevron-right " + styles["fa-chevron-right"]
              }
            ></i>
          </span>
        </Link>
        <div>
          <span ref={prevBtnSlider}>
            <i className="fa-regular fa-angle-left"></i>
          </span>
          <span ref={nextBtnSlider}>
            <i className="fa-regular fa-angle-right"></i>
          </span>
        </div>
      </div>
      <Slider
        {...settings}
        ref={slider}
        className={styles["slider-article-slider"]}
      >
        {data.map((item: any, index: number) => (
          <MangaCardNormal key={item.id + index} data={item} index={index} />
        ))}
      </Slider>
    </div>
  );
};

export default SliderArticle;
