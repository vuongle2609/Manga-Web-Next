import { FC, useRef } from "react";
import useStore from "store/store";
import { Image, Loading } from "@nextui-org/react";
import styles from "./CoverModal.module.scss";

const CoverModal: FC = () => {
  const coverLink = useRef<string>("");
  const [coverModal, removeCoverModal] = useStore((state: any) => [
    state.coverModal,
    state.removeCoverModal,
  ]);

  if (coverModal) {
    coverLink.current = coverModal;
  }

  const closeHandler: () => void = () => {
    removeCoverModal();
  };

  return (
    <div
      className={styles["modal"]}
      style={{ display: !!coverModal ? "block" : "none" }}
      onClick={closeHandler}
    >
      <div>
        <div className={styles["modal-background"]}></div>

        <a className={styles["cover-container"]}>
          <Loading
            className={styles["cover-loading"]}
            size="lg"
            color="primary"
          ></Loading>

          <Image
            maxDelay={10000}
            src={coverLink.current}
            alt="bigcover"
            width={320}
            showSkeleton
            height={180}
            css={{
              borderRadius: 0,
            }}
          />
        </a>
      </div>
    </div>
  );
};

export default CoverModal;
