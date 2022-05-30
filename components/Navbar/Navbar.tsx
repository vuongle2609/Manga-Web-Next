import { FC } from "react";
import styles from "./Navbar.module.scss";
import {
  Avatar,
  Container,
  Row,
  User,
  Link as LinkNext,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import useLocalStorage from "store/persist";
import useStore from "store/store";

const Navbar: FC = () => {
  const [token] = useLocalStorage((state: any) => [state.token]);

  const [setLoginModal, userData] = useStore((state: any) => [
    state.setLoginModal,
    state.userData,
  ]);

  return (
    <Container
      className={styles["Navbar"]}
      display="flex"
      alignItems="center"
      xl
    >
      <Row justify="space-between" align="center">
        <div className={styles["Navbar-right-content"]}>
          <Link href="/home/discover">
            <Avatar
              src="https://media.discordapp.net/attachments/914572068123721788/924219001180127292/bot.png?width=676&height=676"
              size="md"
            />
          </Link>
          <Link href="/home/discover">
            <a>Home</a>
          </Link>
          <Link href="/">
            <a>Favourite</a>
          </Link>
          <Link href="/">
            <a>Trending</a>
          </Link>
        </div>

        <div className={styles["Navbar-left-content"]}>
          {!!userData ? (
            <>
              <Avatar
                size="sm"
                src="https://media.discordapp.net/attachments/914572068123721788/914572084938678342/259665476_2653063228322120_2046432820796071138_n.png?width=608&height=676"
                color="success"
                bordered
                className={styles["navbar-avatar"]}
              />
              <User
                src="https://media.discordapp.net/attachments/914572068123721788/914572084938678342/259665476_2653063228322120_2046432820796071138_n.png?width=608&height=676"
                name={userData.attributes.username}
                bordered
                color="success"
                description="UI/UX Designer @Github"
                className={styles["navbar-user"]}
              />
            </>
          ) : (
            <Button
              onClick={() => setLoginModal(true)}
              size="sm"
              light
              color="warning"
            >
              Login
            </Button>
          )}
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
