import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Theme } from "../../../Utils/Constants";

interface Props {
  atmValue: string;
  onChange: (value: string) => void;
  thinner?: boolean;
}

const ATMDiffInput: React.FC<Props> = ({ atmValue, onChange, thinner }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  const getMenuItemsList = () => {
    const menuItemsList: JSX.Element[] = [];
    for (let i = -20; i <= 20; i++) {
      menuItemsList.push(
        <MenuItem key={i} value={i * 100}>
          {i === 0 ? "ATM" : `ATM ${i * 100}`}
        </MenuItem>,
      );
    }
    return menuItemsList;
  };

  const selectStyle = {
    ...styles.selectStyle,
  };
  if (!!thinner) {
    selectStyle.maxHeight = "32px";
  }

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={atmValue}
      onChange={handleChange}
      style={selectStyle}
    >
      {getMenuItemsList()}
    </Select>
  );
};

const styles = {
  selectStyle: {
    minWidth: "128px",
    maxHeight: "auto",
    color: Theme.colors.black70,
    borderRadius: Theme.borderRadius,
  },
};

export default ATMDiffInput;
