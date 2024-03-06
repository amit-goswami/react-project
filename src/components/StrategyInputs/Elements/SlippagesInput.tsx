import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Theme } from "../../../Utils/Constants";

interface Props {
  slippage: string;
  label: string;
  onChange: (value: string) => void;
}

const Slippagesinput: React.FC<Props> = ({ slippage, label, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  const getMenuItemsList = () => {
    const menuItemsList: JSX.Element[] = [];
    menuItemsList.push(
      <MenuItem key={1} value={"1"}>
        1%
      </MenuItem>,
    );
    return menuItemsList;
  };

  return (
    <div style={styles.dateBox}>
      <Select
        label={label}
        value={slippage}
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
    margin: Theme.gapTiny,
    color: Theme.colors.black70,
  },
};

export default Slippagesinput;
