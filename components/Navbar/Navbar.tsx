import { FC } from "react";
import styles from "./Navbar.module.scss";
import {
  Avatar,
  Container,
  Row,
  User,
  Link as LinkNext,
  Button,
  Popover,
  Text,
  Loading,
  Grid,
} from "@nextui-org/react";
import Link from "next/link";
import useLocalStorage from "store/persist";
import useStore from "store/store";
import { logoutUser } from "data/getData";

const Navbar: FC = () => {
  const [token, addToken] = useLocalStorage((state: any) => [
    state.token,
    state.addToken,
  ]);

  const [setLoginModal, userData, setUserData] = useStore((state: any) => [
    state.setLoginModal,
    state.userData,
    state.setUserData,
  ]);

  const logOutUser = () => {
    logoutUser(token.session);
    addToken({
      session: null,
      refresh: null,
    });
    setUserData(false);
  };

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
            <Popover placement={"bottom-right"}>
              <Popover.Trigger>
                <div>
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
                </div>
              </Popover.Trigger>
              <Popover.Content>
                <div className={styles["Navbar-popover"]}>
                  <Row justify="center" align="center">
                    <Text>User info</Text>
                  </Row>
                  <Row justify="center" align="center">
                    <Text>User info</Text>
                  </Row>
                  <Row justify="center" align="center">
                    <Button color="primary" size="sm" onClick={logOutUser}>
                      Logout
                    </Button>
                  </Row>
                </div>
              </Popover.Content>
            </Popover>
          ) : (
            <Button
              onClick={() => setLoginModal(true)}
              size="sm"
              light
              disabled={userData === null}
              color="warning"
            >
              {userData === false ? (
                "login"
              ) : (
                <Loading color="primary" size="sm" />
              )}
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
