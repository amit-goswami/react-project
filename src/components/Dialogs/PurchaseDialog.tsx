import { Dialog, DialogContent } from "@mui/material";
import React from "react";
import { Theme } from "../../Utils/Constants";

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse' | undefined;

type PurchaseDialogProps = {
    open: boolean; 
    planData: any;
    handleClose: () => void;
  };

const PurchaseDialog: React.FC<PurchaseDialogProps> = ({ open, handleClose,planData }) => {
  return (
    <Dialog open={open} onClose={handleClose} style={{ borderRadius: Theme.borderRadius }}>
      <DialogContent style={styles.dialog}>
        {
          planData?<>
           <h2 style={styles.Congo}>Congratulations on the purchase</h2>
         <h4 style={styles.subheadingPurchase}>Heading back to the starting point!</h4>
         <button onClick={handleClose} style={styles.purchaseSureButton}>
         <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.81818 7.1194L0.954545 4.29851L0 5.23881L3.81818 9L12 0.940299L11.0455 0L3.81818 7.1194Z" fill="#252525"/>
</svg>
          <p style={styles.btnText}> Yes, Sure!</p> 
          </button>
          </>: <img style={styles.loading} src="./images/spinner.svg" alt="logo" />
        }
      </DialogContent>
    </Dialog>
  );
};

const styles = {
  loading: {
    width: "100%",
    height: Theme.dialogHeight,
  },
    Congo:{
        fontSize: '1.4rem',
        fontWeight: 600,
        margin: 0
    },
    btnText:{
     margin:'0px',
     fontWeight: 600,
    },
    subheadingPurchase:{
        fontWeight: 500,
    },
    purchaseSureButton: {
    backgroundColor: 'rgba(255, 228, 132, 1)',
    width: 'fite-content',
    padding: '4px 8px',
    display: 'flex',
    flexDirection: 'row' as FlexDirection,
    alignItems: 'center',
    justifyContent: 'çenter',
    gap:'4px',
    color:'black',
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
  },
  dialog: {
    marginLeft: Theme.gapXXLarge,
    marginRight: Theme.gapXXLarge,
    marginTop: Theme.gapLarge,
    marginBottom: Theme.gapLarge,
    overflow: "hidden",
    borderRadius: Theme.borderRadius,
    display: 'flex',
    flexDirection: 'column' as FlexDirection,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default PurchaseDialog;
