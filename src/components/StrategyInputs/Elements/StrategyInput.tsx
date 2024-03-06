import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Theme } from "../../../Utils/Constants";

interface Props {
  strategy: string;
  label: string;
  onChange: (value: string) => void;
}

const StrategyInput: React.FC<Props> = ({ strategy, label, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  const getMenuItemsList = () => {
    const menuItemsList: JSX.Element[] = [];
    menuItemsList.push(
      <MenuItem key={1} value={"ShortStrangle"}>
        Short Strangle
      </MenuItem>
    );
    return menuItemsList;
  };

  return (
    <div style={styles.dateBox}>
      <Select
        label={label}
        value={strategy}
        onChange={handleChange}
        disabled={true}
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
  },
  dateBox: {
    minWidth: Theme.inputElementMinWidth,
    color: Theme.colors.black70,
    margin: Theme.gapTiny,
  },
};

export default StrategyInput;
