import { FC } from "react";
import styles from "./Footer.module.scss";
import { Container, Text, Link } from "@nextui-org/react";

const Footer: FC = () => {
  return (
    <div className={styles["footer"]}>
      <Container lg>
        <div className={styles["footer-container"]}>
          <div className={styles["social-icon"]}>
            {" "}
            <Link
              href="https://www.facebook.com/vuong.lethanh.315/"
              target="_blank"
            >
              <Text className={styles["text"]} h2>
                <i className="fa-brands fa-facebook-square"></i>
              </Text>
            </Link>
            <Link href="https://twitter.com/paff2609" target="_blank">
              <Text className={styles["text"]} h2>
                <i className="fa-brands fa-twitter-square"></i>
              </Text>
            </Link>
            <Link href="https://github.com/vuongle2609" target="_blank">
              <Text className={styles["text"]} h2>
                <i className="fa-brands fa-github-square"></i>
              </Text>
            </Link>
          </div>

          <div className={styles["credit"]}>
            <Text>All resources belong to &nbsp;</Text>
            <Link href="https://api.mangadex.org/swagger.html" target="_blank">
              <Text color="error">Mangadex &nbsp;</Text>
            </Link>
            <Text>I do not own any data</Text>
          </div>

          <div className={styles["credit"]}>
            <Text>2022 &nbsp;</Text>
            <Link href="https://github.com/vuongle2609" target="_blank">
              <Text color="primary">@vuongle2609 &nbsp;</Text>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
