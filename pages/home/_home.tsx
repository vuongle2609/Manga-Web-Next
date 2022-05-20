import type { AppProps } from "next/app";
import { FC } from "react";
import SubNavBar from "components/SubNavBar/SubNavBar";

const Home: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <SubNavBar />
      <Component {...pageProps} />
    </>
  );
};

export default Home;
