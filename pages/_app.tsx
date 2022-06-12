import "styles/globals.scss";
import "icon/index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import GotoTop from "components/GotoTop/GotoTop";
import { FC, useEffect } from "react";
import { NextUIProvider, Container } from "@nextui-org/react";
import { theme } from "theme/theme";
import CoverModal from "components/Modal/CoverModal/CoverModal";
import LoginModal from "components/Modal/LoginModal/LoginModal";
import useLocalStorage from "store/persist";
import { getUser, checkToken, rereshToken } from "data/getData";
import useStore from "store/store";
import { Toaster } from "react-hot-toast";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const [token, addToken] = useLocalStorage((state: any) => [
    state.token,
    state.addToken,
  ]);

  const [setUserData] = useStore((state: any) => [state.setUserData]);

  useEffect(() => {
    document.querySelector("body").style.backgroundImage =
      "url('/images/bg.png')";

    const getUserData = async () => {
      try {
        if (token.access && token.refresh) {
          const isTokenEx = await checkToken(token.session);
          if (!isTokenEx) {
            const resUser = await getUser(token.session);
            setUserData(resUser.data.data);
          } else if (isTokenEx) {
            const newToken = await rereshToken(token.refresh, token.session);
            addToken({
              refresh: newToken.refresh,
              session: newToken.session,
            });
            const resUser = await getUser(newToken.session);
            setUserData(resUser.data.data);
          }
        } else {
          setUserData(false);
        }
      } catch (err) {
        setUserData(false);
      }
    };

    getUserData();
  }, []);

  return (
    <NextUIProvider theme={theme}>
      <Head>
        <title>Paff manga</title>
        <meta
          name="description"
          content="A website for reading manga free without ADS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container-global-class light-mode">
        <Toaster
          containerStyle={{
            zIndex: 999999,
          }}
          toastOptions={{
            style: {
              border: "1px solid #8a8a8a",
              zIndex: 999999,
            },
          }}
        />
        <Navbar />

        {pageProps.fullScreen ? (
          <Component {...pageProps} className="global-class" />
        ) : (
          <Container lg>
            <Component {...pageProps} className="global-class" />
          </Container>
        )}
        {/* {!pageProps.fullScreen && (
          <>
            <Footer />
            <GotoTop />
          </>
        )} */}

        <Footer />
        <GotoTop />
      </div>

      <LoginModal />
      <CoverModal />
    </NextUIProvider>
  );
};

export default MyApp;
