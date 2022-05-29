import { FC, useRef } from "react";
import useStore from "store";
import { Image } from "@nextui-org/react";
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

        <a
          className={styles["cover-container"]}
          href={coverLink.current}
          target="_blank"
          rel="noopener noreferrer"
        >
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
