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

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    document.querySelector("body").style.backgroundImage =
      "url('/images/bg.png')";
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
        <Navbar />
        <Container lg>
          <Component {...pageProps} className="global-class" />
        </Container>
        <Footer />
        <GotoTop />
      </div>
      <LoginModal />
      <CoverModal />
    </NextUIProvider>
  );
};

export default MyApp;
