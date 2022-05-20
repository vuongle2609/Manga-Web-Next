import { FC, useState, useEffect, useRef } from "react";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import styles from "./SubNavBar.module.scss";

const SubNavBar: FC<any> = (props) => {
  const [isSticky, setIsSticky] = useState(false);
  const navBar = useRef<any>(null);

  useEffect(() => {
    const cachedRef = navBar.current,
      observer = new IntersectionObserver(
        ([e]) => setIsSticky(e.intersectionRatio < 1),
        {
          threshold: [1],
        }
      );

    observer.observe(cachedRef);

    return function () {
      observer.unobserve(cachedRef);
    };
  }, []);

  return (
    <>
      <div
        className={
          styles["sub-navbar"] + " " + (isSticky ? styles["isSticky"] : "")
        }
        ref={navBar}
      >
        <Input
          placeholder="Search"
          status="default"
          underlined
          contentRight={<i className="fa-regular fa-magnifying-glass"></i>}
          aria-label="search-bar"
        />
        <Link href="/home/discover">
          <b>Discover</b>
        </Link>
        <Link href="/home/browse">
          <b>Browse</b>
        </Link>
      </div>
      {props.children}
    </>
  );
};

export default SubNavBar;
