import React from "react";
import { Switch } from "@mui/joy";
import { Theme } from "../../../Utils/Constants";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

type Props = {
  falseLabel: string;
  trueLabel: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const SwitchInput: React.FC<Props> = ({
  trueLabel,
  falseLabel,
  checked,
  onChange,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      style={{ justifyContent: "center" }}
    >
      <Switch
        onChange={handleInputChange}
        checked={checked}
        slotProps={{
          track: {
            sx: {
              backgroundColor: checked
                ? Theme.colors.blueSolid
                : Theme.colors.whiteGrey70,
            },
          },
        }}
      />
      <Typography>{checked ? trueLabel : falseLabel}</Typography>
    </Stack>
  );
};

export default SwitchInput;
