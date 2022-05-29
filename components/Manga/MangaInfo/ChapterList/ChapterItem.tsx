import { FC } from "react";
import { Text } from "@nextui-org/react";

interface propsType {
  data: any;
}

const ChapterItem: FC<propsType> = ({ data }) => {
  return <Text>{data.attributes.chapter}</Text>;
};

export default ChapterItem;
