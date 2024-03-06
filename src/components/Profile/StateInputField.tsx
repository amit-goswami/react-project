import { MenuItem, Select } from "@mui/material";
import React from "react";
import { Theme } from "../../Utils/Constants";

interface props {
  selectedState: string;
  onChange: (value: string) => void;
}

const StateInputField: React.FC<props> = ({ selectedState, onChange }) => {
  const states = [
    { title: "Andhra Pradesh", key: "AP" },
    { title: "Arunachal Pradesh", key: "AR" },
    { title: "Assam", key: "AS" },
    { title: "Bihar", key: "BR" },
    { title: "Chhattisgarh", key: "CG" },
    { title: "Goa", key: "GA" },
    { title: "Gujarat", key: "GJ" },
    { title: "Haryana", key: "HR" },
    { title: "Himachal Pradesh", key: "HP" },
    { title: "Jharkhand", key: "JH" },
    { title: "Karnataka", key: "KA" },
    { title: "Kerala", key: "KL" },
    { title: "Madhya Pradesh", key: "MP" },
    { title: "Maharashtra", key: "MH" },
    { title: "Manipur", key: "MN" },
    { title: "Meghalaya", key: "ML" },
    { title: "Mizoram", key: "MZ" },
    { title: "Nagaland", key: "NL" },
    { title: "Odisha", key: "OR" },
    { title: "Punjab", key: "PB" },
    { title: "Rajasthan", key: "RJ" },
    { title: "Sikkim", key: "SK" },
    { title: "Tamil Nadu", key: "TN" },
    { title: "Telangana", key: "TG" },
    { title: "Tripura", key: "TR" },
    { title: "Uttar Pradesh", key: "UP" },
    { title: "Uttarakhand", key: "UK" },
    { title: "West Bengal", key: "WB" },
    { title: "Andaman and Nicobar Islands", key: "AN" },
    { title: "Chandigarh", key: "CH" },
    { title: "Dadra and Nagar Haveli and Daman and Diu", key: "DN" },
    { title: "Lakshadweep", key: "LD" },
    { title: "Delhi", key: "DL" },
    { title: "Puducherry", key: "PY" },
    { title: "Jammu and Kashmir", key: "JK" },
    { title: "Ladakh", key: "LA" },
  ];

  const handleChange = (selectedOption: any) => {
    // Handle selected state option here...
  };

  const getMenuItemsList = () => {
    const menuItemsList: JSX.Element[] = [];
    for (let i = 0; i < states.length; i++) {
      menuItemsList.push(
        <MenuItem key={i} value={states[i].key}>
          {states[i].title}
        </MenuItem>
      );
    }
    return menuItemsList;
  };

  return (
    <Select
      labelId="select-label"
      id="simple-select"
      value={selectedState}
      onChange={handleChange}
      size="small"
      style={styles.selectStyle}
    >
      {getMenuItemsList()}
    </Select>
  );
};

const styles = {
  selectStyle: {
    color: Theme.colors.black70,
    borderRadius: Theme.borderRadius,
    width: "100%",
  },
};

export default StateInputField;
