import { FC } from "react";
import { Row, Col } from "@nextui-org/react";
import styles from "./ColumnsArticle.module.scss";

const ColumnsDivider: FC = () => {
  return <div className="columns-divider"></div>;
};

const ColumnsArticle: FC = () => {
  return (
    <Row className={styles["columns-article"]}>
      <Col>sdfsd</Col>
      <ColumnsDivider />
      <Col>sfsdf</Col>
      <ColumnsDivider />
      <Col>fsdfds</Col>
    </Row>
  );
};

export default ColumnsArticle;
