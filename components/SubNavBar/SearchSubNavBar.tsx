import { Input, Text } from "@nextui-org/react";
import { handleAddParams } from "data/getData";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import styles from "./SearchSubNavBar.module.scss";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const fetcher: (any: any) => any = (...config) =>
  fetch(...config).then((res) => res.json());

const SearchSubNavBar: FC<any> = ({ load }) => {
  const [keyword, setKeyword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const closeList = (e: any) => {
      if (!e.target.closest("#search-sub-nav")) {
        e?.target?.preventDefault?.();
        setOpen(false);
      }
    };

    const closeScroll = () => setOpen(false);

    if (document) {
      document.addEventListener("click", closeList);
      document.addEventListener("scroll", closeScroll);
    }

    return () => {
      document.removeEventListener("click", closeList);
      document.removeEventListener("scroll", closeScroll);
    };
  }, []);

  useEffect(() => {
    if (!open && keyword.length !== 0) setOpen(true);
  }, [keyword]);

  const dataFetched: any = useSWR(
    keyword.length !== 0
      ? handleAddParams("/mangaapi", {
          limit: 20,
          contentRating: ["safe", "suggestive", "erotica", "pornographic"],
          title: keyword,
        })
      : null,
    fetcher
  );

  const dataArr = dataFetched?.data?.data;

  console.log(dataArr);

  return (
    <div className={styles["search-bar"]} id="search-sub-nav">
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search"
        underlined
        color="primary"
        contentRight={<i className="fa-regular fa-magnifying-glass"></i>}
        aria-label="search-bar"
        onFocus={() => setOpen(true)}
      />

      {open && (
        <div className={styles["search-list"]}>
          <SimpleBar style={{ maxHeight: 400 }}>
            {dataArr ? (
              dataArr.length !== 0 ? (
                dataArr.map((item: any) => {
                  const title: any = Object.values(item.attributes.title)[0];
                  return (
                    <Link href={`/manga/${item.id}`}>
                      <a
                        className={styles["search-link"]}
                        onClick={() => load.current.continuousStart()}
                      >
                        {title}
                      </a>
                    </Link>
                  );
                })
              ) : (
                <div className={styles["search-list-label"]}>
                  <i className="fa-thin fa-face-disappointed"></i>
                  <Text size={16}>Not found</Text>
                </div>
              )
            ) : (
              <div className={styles["search-list-label"]}>
                <i className="fa-thin fa-face-grin-squint"></i>
                <Text size={16}>Type something...</Text>
              </div>
            )}
          </SimpleBar>
          {keyword.length !== 0 && (
            <div className={styles["search-list-more"]}>
              <Link href={`/home/browse?keyword=${keyword}`}>
                <a onClick={() => load.current.continuousStart()}>
                  See more...
                </a>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSubNavBar;
