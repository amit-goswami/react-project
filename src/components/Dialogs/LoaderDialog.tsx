import { Dialog, DialogContent } from "@mui/material";
import React from "react";
import { Theme } from "../../Utils/Constants";

const MyComponent: React.FC = () => {
  return (
    <Dialog open={true} style={{ borderRadius: Theme.borderRadius }}>
      <DialogContent style={styles.dialog}>
        <h2>Loading Backtest Results</h2>
        <img style={styles.loading} src="./images/spinner.svg" alt="logo" />
      </DialogContent>
    </Dialog>
  );
};

const styles = {
  loading: {
    width: "100%",
    height: Theme.dialogHeight,
  },
  dialog: {
    marginLeft: Theme.gapXXLarge,
    marginRight: Theme.gapXXLarge,
    marginTop: Theme.gapLarge,
    marginBottom: Theme.gapLarge,
    overflow: "hidden",
    borderRadius: Theme.borderRadius,
  },
};

export default MyComponent;
