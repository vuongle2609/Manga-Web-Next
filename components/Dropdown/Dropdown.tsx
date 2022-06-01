import { FC, useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.scss";
import { Checkbox, Text, Button, Spacer } from "@nextui-org/react";
import _ from "lodash";

interface propsType {
  onChange: (item: any) => void;
  listValue: any[];
  defaultValue?: string;
  checkbox?: boolean;
  selectDefault?: string;
  value?: any;
  isLeft?: boolean;
  LabelDisplay?: string;
  id: string;
}

const Dropdown: FC<propsType> = ({
  onChange,
  listValue,
  defaultValue,
  checkbox,
  selectDefault,
  value,
  isLeft,
  LabelDisplay,
  id,
}) => {
  const [label, setLabel] = useState<string>(selectDefault || defaultValue);
  const [showList, setShowList] = useState<boolean>(false);
  const [checkboxValue, setCheckboxValue] = useState<string[]>([]);
  const prevChecked = useRef<string[]>([]);

  const handleClickItem: (item: string) => void = (item) => {
    onChange(item);
    setLabel(item);
    setShowList(false);
  };

  const setCheckbox = () => {
    setShowList(false);
    prevChecked.current = checkboxValue;
    onChange(checkboxValue);
  };

  useEffect(() => {
    const closeList = (e: any) => {
      if (!e.target.closest("#dropdown-selector-" + id)) {
        e?.target?.preventDefault?.();
        setShowList(false);
      }
    };
    if (document) document.addEventListener("click", closeList);

    return () => {
      document.removeEventListener("click", closeList);
    };
  }, []);

  return (
    <>
      <div
        className={styles["dropdown-container"]}
        id={"dropdown-selector-" + id}
      >
        <div
          className={styles["dropdown-label"]}
          onClick={() => {
            setShowList((prev) => !prev);
          }}
        >
          <Text>{LabelDisplay || label}</Text>{" "}
          {showList ? (
            <i
              className="fa-light fa-arrow-up"
              style={{ marginLeft: "10px" }}
            ></i>
          ) : (
            <i
              className="fa-light fa-arrow-down"
              style={{ marginLeft: "10px" }}
            ></i>
          )}
        </div>

        {checkbox ? (
          <div
            className={styles["dropdown-checkbox"]}
            style={{
              display: !showList && "none",
              left: isLeft && "0",
              right: !isLeft && "0",
            }}
          >
            <Checkbox.Group
              color="warning"
              css={{ padding: "$4 $0" }}
              defaultValue={value}
              onChange={setCheckboxValue}
            >
              {listValue.map((item: any, index: number) =>
                !!item?.value ? (
                  <Checkbox value={item.value} key={index}>
                    <Text>{item.text}</Text>
                  </Checkbox>
                ) : (
                  false
                )
              )}
            </Checkbox.Group>
            <Spacer y={0.2} />
            <Button
              size="sm"
              flat
              color="warning"
              onClick={setCheckbox}
              disabled={_.isEqual(prevChecked.current, checkboxValue)}
            >
              Save
            </Button>
          </div>
        ) : (
          <ul
            className={styles["dropdown-list"]}
            style={{
              display: !showList && "none",
              left: isLeft && "0",
              right: !isLeft && "0",
            }}
          >
            {listValue.map((item: any, index: number) => (
              <li
                key={index}
                onClick={() => {
                  handleClickItem(item.value);
                }}
                style={{ backgroundColor: label === item.value && "#fef0d6" }}
              >
                <Text>{item.text}</Text>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Dropdown;
