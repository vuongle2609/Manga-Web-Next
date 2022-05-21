import { FC, useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { Row, Col } from "@nextui-org/react";
import style from "./SliderBig.module.scss";
import SliderItem from "./SliderItem";
import ControllerItem from "./ControllerItem";

const SliderBig: FC<any> = ({ data }) => {
  const [render, setRender] = useState<boolean>(false);
  const slider = useRef<Slider>(null);

  useEffect(() => {
    setRender(!render);
  }, [slider.current]);

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: false,
    easing: "ease-in-out",
    fade: true,
    responsive: [
      {
        breakpoint: 1180,
        settings: {
          swipe: true,
        },
      },
    ],
  };

  return (
    <>
      <Row gap={0} className={style["slider-pc-tablet"]}>
        <Col span={9} className={style["col-right-controller"]}>
          <div>
            <Slider {...settings} ref={slider}>
              {data &&
                data.map((item: any, index: number) => (
                  <SliderItem key={index} data={item} />
                ))}
            </Slider>
          </div>
        </Col>
        <Col span={3} className={style["col-left-controller"]}>
          {data.map((item: any, index: number) => (
            <ControllerItem
              key={index}
              data={item}
              index={index}
              slider={slider.current}
            />
          ))}
        </Col>
      </Row>

      <Row gap={0} className={style["slider-mobile"]}>
        <Col span={12} className={style["col-right-controller"]}>
          <div>
            <Slider {...settings}>
              {data.map((item: any, index: number) => (
                <SliderItem key={index} data={item} />
              ))}
            </Slider>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SliderBig;
