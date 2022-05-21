import { FC } from "react";
import styles from "./Navbar.module.scss";
import {
  Avatar,
  Container,
  Row,
  User,
  Link as LinkNext,
} from "@nextui-org/react";
import Link from "next/link";

const Navbar: FC = () => {
  return (
    <Container
      className={styles["Navbar"]}
      display="flex"
      alignItems="center"
      xl
    >
      <Row justify="space-between" align="center">
        <div className={styles["Navbar-right-content"]}>
          <Avatar
            src="https://media.discordapp.net/attachments/914572068123721788/924219001180127292/bot.png?width=676&height=676"
            size="md"
          />
          <Link href="/home/discover">
            <p>Home</p>
          </Link>
          <Link href="/">
            <p>Favourite</p>
          </Link>
          <Link href="/">
            <p>Trending</p>
          </Link>
        </div>

        <div className={styles["Navbar-left-content"]}>
          <User
            src="https://media.discordapp.net/attachments/914572068123721788/914572084938678342/259665476_2653063228322120_2046432820796071138_n.png?width=608&height=676"
            name="Mikuanmigoi"
            bordered
            color="success"
            description="UI/UX Designer @Github"
            className={styles["navbar-user"]}
          />
          <Avatar
            size="sm"
            src="https://media.discordapp.net/attachments/914572068123721788/914572084938678342/259665476_2653063228322120_2046432820796071138_n.png?width=608&height=676"
            color="success"
            bordered
            className={styles["navbar-avatar"]}
          />
          <LinkNext href="https://github.com/vuongle2609" target="_blank">
            <i className="fa-brands fa-github"></i>
          </LinkNext>
          <LinkNext href="https://twitter.com/paff2609" target="_blank">
            <i className="fa-brands fa-twitter"></i>
          </LinkNext>
        </div>
      </Row>
    </Container>
  );
};

export default Navbar;
