import { FC } from "react";
import { Row, Col } from "@nextui-org/react";
import styles from "./ColumnsArticle.module.scss";

const ColumnsDivider: FC = () => {
  return <div className="columns-divider"></div>;
};

const ColumnsArticle: FC = () => {
  return (
    <Row className={styles["columns-article"]}>
      <Col span={4}>
        sdfsd
      </Col>
      {/* <ColumnsDivider /> */}
      <Col span={4}>
        sfsdf
      </Col>
      {/* <ColumnsDivider /> */}
      <Col span={4}>
        fsdfds
      </Col>
    </Row>
  );
};

export default ColumnsArticle;
