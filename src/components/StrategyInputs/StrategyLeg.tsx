import React from "react";
import SliderInput from "./Elements/SliderInput";
import SwitchInput from "./Elements/SwitchInput";
import { Theme, ThemeTypes } from "../../Utils/Constants";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ATMDiffInput from "./Elements/ATMInput";
import { MenuItem, Select } from "@mui/material";

export interface IStrategyLeg {
  index: number;
  slPerct: number;
  tpPerct: number;
  optionType: "CE" | "PE";
  actionType: "Buy" | "Sell";
  lots: number;
  atmDiff: string;
  instrument: "NIFTYBANK" | "NIFTY";
}

export const DefaultLeg: IStrategyLeg = {
  index: 0,
  slPerct: 5,
  tpPerct: 5,
  optionType: "CE",
  actionType: "Buy",
  lots: 1,
  atmDiff: "0",
  instrument: "NIFTYBANK",
};

interface StrategyLegProps {
  saveStrategyInputs: (list: IStrategyLeg[]) => void;
  removeLegEntry: (index: number) => void;
  legs: IStrategyLeg[];
}

const StrategyLeg: React.FC<StrategyLegProps> = ({
  saveStrategyInputs,
  removeLegEntry,
  legs,
}) => {
  const handleSLChange = (value: number, index: number) => {
    legs[index].slPerct = value;
    saveStrategyInputs(legs);
  };

  const handleTPChange = (value: number, index: number) => {
    legs[index].tpPerct = value;
    saveStrategyInputs(legs);
  };

  const handleOptionTypeChange = (value: boolean, index: number) => {
    legs[index].optionType = value ? "CE" : "PE";
    saveStrategyInputs(legs);
  };

  const handleActionTypeChange = (value: boolean, index: number) => {
    legs[index].actionType = value ? "Sell" : "Buy";
    saveStrategyInputs(legs);
  };

  const handleATMDiffChange = (value: string, index: number) => {
    legs[index].atmDiff = value;
    saveStrategyInputs(legs);
  };

  const onNewLegEntry = () => {
    const newDef = { ...DefaultLeg };
    newDef.index = legs.length;
    saveStrategyInputs([...legs, { ...newDef }]);
  };

  function getEachStrategyLeg(leg: IStrategyLeg, index: number) {
    const { actionType, optionType, slPerct, tpPerct, atmDiff } = leg;
    return (
      <tr key={"strategyLegList" + index}>
        <td style={styles.tableCell}>
          <SwitchInput
            trueLabel="Buy"
            falseLabel="Sell"
            checked={actionType === "Sell"}
            onChange={(event) => {
              handleActionTypeChange(event, index);
            }}
          />
        </td>
        <td style={styles.tableCell}>
          <SwitchInput
            trueLabel="PE"
            falseLabel="CE"
            checked={optionType === "CE"}
            onChange={(event) => {
              handleOptionTypeChange(event, index);
            }}
          />
        </td>
        <td style={styles.tableCell}>
          <Select
            value={"Weekly"}
            disabled={true}
            // onChange={handleChange}
            style={styles.selectStyle}
          >
            <MenuItem value={"Weekly"}>Weekly</MenuItem>
            <MenuItem value={"Monthly"}>Monthly</MenuItem>
          </Select>
        </td>
        <td style={styles.tableCell}>1</td>
        <td style={styles.tableCell}>
          <ATMDiffInput
            atmValue={atmDiff}
            thinner={true}
            onChange={(event) => {
              handleATMDiffChange(event, index);
            }}
          />
        </td>
        <td style={styles.tableCell}>
          <SliderInput
            min={0}
            max={100}
            step={1}
            value={slPerct}
            onChange={(event) => {
              handleSLChange(event, index);
            }}
          />
        </td>
        <td style={styles.tableCell}>
          <SliderInput
            min={0}
            max={100}
            step={1}
            value={tpPerct}
            onChange={(event) => {
              handleTPChange(event, index);
            }}
          />
        </td>
        <td style={styles.tableCell}>
          <DeleteForeverIcon
            onClick={() => {
              removeLegEntry(index);
            }}
            style={styles.addIcon}
          />
        </td>
      </tr>
    );
  }

  return (
    <>
      <table style={styles.tableStyle}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Buy/Sell</th>
            <th style={styles.headerCell}>Option</th>
            <th style={styles.headerCell}>Expiry</th>
            <th style={styles.headerCell}>Lots</th>
            <th style={styles.headerCell}>Strike</th>
            <th style={styles.headerCell}>SL%</th>
            <th style={styles.headerCell}>Target%</th>
            <th style={styles.headerCell}></th>
          </tr>
        </thead>
        <tbody>
          {legs.map((leg, index) => getEachStrategyLeg(leg, index))}
        </tbody>
      </table>
      <button onClick={onNewLegEntry} style={styles.addMoreButton}>
        <AddIcon style={ThemeTypes.buttonIcon} /> Add Leg
      </button>
    </>
  );
};

const styles = {
  addMoreButton: {
    ...ThemeTypes.transparentButton,
    marginTop: Theme.gapSmall,
    marginBottom: Theme.gapSmall,
    marginLeft: 0,
  },
  selectStyle: {
    minWidth: "128px",
    maxHeight: "32px",
  },
  tableStyle: {
    backgroundColor: Theme.colors.backgroundF3,
    borderCollapse: "collapse" as "collapse",
    borderRadius: Theme.borderRadiusLarge,
    width: "100%",
  },
  tableCell: {
    paddingTop: Theme.gapTiny,
    paddingBottom: Theme.gapTiny,
    textAlign: "center" as "center",
  },
  headerCell: {
    padding: Theme.gapTiny,
    fontWeight: "normal" as const,
    fontSize: Theme.fontSizes.h4,
  },
  instrumentName: {
    margin: "auto 0px",
  },
  whiteButton: {
    ...ThemeTypes.transparentButton,
    marginTop: Theme.gapSmall,
    marginBottom: Theme.gapLarge,
  },
  addIcon: {
    color: Theme.colors.black70,
    fontSize: Theme.fontSizes.h2,
  },
  inputBox: {
    backgroundColor: Theme.colors.backgroundEA,
    display: "flex",
    flexDirection: "row" as "row",
    flexWrap: "wrap" as "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.gapSmall,
    borderRadius: Theme.borderRadius,
  },
  gapBox: {
    width: Theme.gapSmall,
  },
};

export default StrategyLeg;
