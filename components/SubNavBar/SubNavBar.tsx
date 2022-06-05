import { FC, useState, useEffect, useRef } from "react";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import styles from "./SubNavBar.module.scss";
import LoadingBar from "react-top-loading-bar";
import SearchSubNavBar from "./SearchSubNavBar";

const SubNavBar: FC<any> = (props) => {
  const load = useRef(null);
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
      <LoadingBar ref={load} color="#fca815" />
      <div
        className={
          styles["sub-navbar"] + " " + (isSticky ? styles["isSticky"] : "")
        }
        ref={navBar}
      >
        <SearchSubNavBar load={load} />
        <Link href="/home/discover">
          <a onClick={() => load.current.continuousStart()}>
            <b>Discover</b>
          </a>
        </Link>
        <Link href="/home/browse">
          <a onClick={() => load.current.continuousStart()}>
            <b>Browse</b>
          </a>
        </Link>
      </div>
      {props.children}
    </>
  );
};

export default SubNavBar;
