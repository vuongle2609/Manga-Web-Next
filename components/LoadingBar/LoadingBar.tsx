import { forwardRef } from "react";
import LoadingBar from "react-top-loading-bar";

const LoadingTopBar = forwardRef((props, ref) => (
  <LoadingBar color="#fca815" ref={ref} />
));

export default LoadingTopBar;
