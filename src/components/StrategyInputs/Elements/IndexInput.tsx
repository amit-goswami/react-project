import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Theme } from "../../../Utils/Constants";

interface Props {
  defaultIndex: string;
  label: string;
  onChange: (value: string) => void;
}

const IndexInput: React.FC<Props> = ({ defaultIndex, label, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  const getMenuItemsList = () => {
    const menuItemsList: JSX.Element[] = [];
    menuItemsList.push(
      <MenuItem key={1} value={"NIFTYBANK"}>
        Banknifty
      </MenuItem>
    );
    return menuItemsList;
  };

  return (
    <div style={styles.dateBox}>
      <Select
        labelId="label-inputs-page-index-input"
        label={label}
        value={defaultIndex}
        onChange={handleChange}
        disabled={false}
        style={styles.selectStyle}
      >
        {getMenuItemsList()}
      </Select>
    </div>
  );
};

const styles = {
  selectStyle: {
    width: "100%",
    color: Theme.colors.black70,
    borderRadius: Theme.borderRadius,
  },
  dateBox: {
    minWidth: Theme.inputElementMinWidth,
    margin: Theme.gapTiny,
  },
};

export default IndexInput;
