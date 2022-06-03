import {
  Modal,
  Text,
  Button,
  Spacer,
  Grid,
  Input,
  Checkbox,
} from "@nextui-org/react";
import { getQueryUrlObj, isNumeric } from "data/handleData";
import { useRouter } from "next/router";
import { FC, useRef, useState } from "react";
import styles from "./FilterModal.module.scss";

interface propsType {
  setModalFilter: (bol: boolean) => void;
  modalFilter: boolean;
  tags: any[];
  query: any;
  tagQuery: string[];
  keyword: string;
  statusQuery: string[];
  orderSplit: string[];
  year: any;
  handleClickSave: (queryObj: any) => void;
}

const FilterModal: FC<propsType> = ({
  setModalFilter,
  modalFilter,
  tags,
  query,
  tagQuery,
  keyword,
  statusQuery,
  year,
  handleClickSave,
}) => {
  const [tagsSelected, setTagsSelected] = useState<string[]>(tagQuery);
  const [statusSelected, setStatusSelected] = useState<string[]>(statusQuery);
  const [newKeyword, setNewKeyword] = useState<string>(keyword);
  const [newYear, setNewYear] = useState<any>(year);

  const handleClickCancel = () => {
    setTagsSelected(tagQuery);
    setStatusSelected(statusQuery);
    setNewKeyword(keyword);
    setNewYear(year);
  };

  const handleAddTags = (tag: string) => {
    if (tagsSelected.includes(tag)) {
      const newArr = tagsSelected.filter((item: any) => item !== tag);
      setTagsSelected(newArr);
    } else {
      setTagsSelected((prev) => [...prev, tag]);
    }
  };

  return (
    <Modal
      scroll
      width="550px"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={modalFilter}
    >
      <Modal.Header>
        <Text id="modal-title" size={20} b>
          Filters
        </Text>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Input
            fullWidth
            initialValue={newKeyword}
            placeholder="Keywords"
            underlined
            color="primary"
            contentRight={<i className="fa-regular fa-magnifying-glass"></i>}
            onChange={(e) => setNewKeyword(e.target.value)}
          />
        </div>

        <div>
          <Input
            fullWidth
            initialValue={newYear}
            placeholder="Year"
            underlined
            color="primary"
            contentRight={<i className="fa-regular fa-calendar"></i>}
            onChange={(e) => setNewYear(e.target.value)}
          />
        </div>

        <Checkbox.Group
          isRow
          label={<Text b>Status</Text>}
          color="primary"
          onChange={(statusArr: string[]) => setStatusSelected(statusArr)}
          defaultValue={
            statusSelected?.length !== 0
              ? statusSelected
              : ["ongoing", "cancelled", "hiatus", "completed"]
          }
          css={{ paddingBottom: "1rem" }}
          className={styles["modal-checkbox"]}
        >
          <Checkbox value="ongoing" className={styles["modal-checkbox-item"]}>
            <Text size={16}>Ongoing</Text>
          </Checkbox>
          <Checkbox value="completed">
            <Text size={16}>Completed</Text>
          </Checkbox>
          <Checkbox value="hiatus">
            <Text size={16}>Hiatus</Text>
          </Checkbox>
          <Checkbox value="cancelled">
            <Text size={16}>Cancelled</Text>
          </Checkbox>
        </Checkbox.Group>

        <div>
          <div>
            <Text b>Tags</Text>
          </div>
          <Spacer y={0.4} />
          <Grid.Container className={styles["modal-list"]} gap={0.5}>
            {tags.map((item: any, index: number) => {
              const tagContains = tagsSelected?.includes(item?.id);
              return (
                <Grid
                  key={index}
                  xs={6}
                  sm={6}
                  onClick={() => {
                    handleAddTags(item?.id);
                  }}
                >
                  <div
                    className={styles["modal-item"]}
                    style={{
                      background: tagContains && "#fef0d6",
                    }}
                  >
                    <span>
                      <Text size={16}>{item?.attributes?.name?.en}</Text>
                    </span>
                    {tagContains && <i className="fa-light fa-check"></i>}
                  </div>
                </Grid>
              );
            })}
          </Grid.Container>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          auto
          flat
          color="error"
          onClick={() => {
            handleClickCancel();
            setModalFilter(false);
          }}
        >
          cancel
        </Button>
        <Button
          auto
          onClick={() => {
            handleClickSave({
              tagsSelected,
              statusSelected,
              newKeyword,
              newYear,
            });
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
