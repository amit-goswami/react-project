import { useState } from "react";
import { Styles, Theme, ThemeTypes } from "../../Utils/Constants";
import StrategyInputs, { IStrategyInput } from "./StrategyInputs";
import StrategyLeg, { DefaultLeg, IStrategyLeg } from "./StrategyLeg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

export interface IInputsPageResult {
  strategy: IStrategyInput;
  legs: IStrategyLeg[];
}

export interface IInputsPageProps {
  onInputsChanged: (strategy: IInputsPageResult) => void;
  isLoading: boolean;
  showPrintButton: boolean;
}

export const InputsPage: React.FC<IInputsPageProps> = (props) => {
  const defaultStrategyInputs = {
    fromDate: new Date("2018-01-01 09:00"),
    toDate: new Date("2023-05-30 09:00"),
    entryTime: new Date("2023-06-14 09:16"),
    exitTime: new Date("2023-06-14 15:05"),
    index: "NIFTYBANK",
    strategy: "ShortStrangle",
    slippage: "1",
  };

  const [strategyInputs, setStrategyInputs] = useState<IStrategyInput>(
    defaultStrategyInputs
  );
  const [legs, setLegs] = useState<IStrategyLeg[]>([DefaultLeg]);
  const [showWatermark, setShowWatermark] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  const submitInputs = () => {
    props.onInputsChanged({
      strategy: strategyInputs,
      legs: legs,
    });
  };

  const printPage = () => {
    setShowWatermark(true);
    setTimeout(() => {
      window.print();
    }, 200);
    setTimeout(() => {
      setShowWatermark(false);
    }, 1000);
  };

  const saveStrategyInputs = (newLegs: IStrategyLeg[]) => {
    const clonedLegs = [...newLegs];
    clonedLegs.map((leg) => ({ ...leg }));
    setLegs(clonedLegs);
  };

  const removeLegEntry = (idx: number) => {
    if (legs.length === 1) {
      return;
    }
    setLegs([]);
    const newLegs = [...legs];
    newLegs.splice(idx, 1);
    setTimeout(() => {
      setLegs(newLegs);
    }, 100);
  };

  function getWaterMarks() {
    const paragraphElements = [];
    for (let i = 0; i < 1000; i++) {
      paragraphElements.push(
        <p style={styles.watermarkText} key={i}>
          Moneyy.ai
        </p>
      );
    }
    return <div style={styles.watermarksWrapper}>{paragraphElements}</div>;
  }

  function flipShowMore() {
    setShowMore(!showMore);
  }

  function getStrategyLegsCreation() {
    return (
      <StrategyLeg
        legs={legs}
        saveStrategyInputs={saveStrategyInputs}
        removeLegEntry={removeLegEntry}
      />
    );
  }

  return (
    <>
      <p style={Styles.strategySectionHeaderText}>Choose Index and Strategy</p>
      <StrategyInputs
        onInputsChanged={setStrategyInputs}
        strategyInputs={strategyInputs}
        showMore={showMore}
      />
      <button style={styles.transparentButton} onClick={flipShowMore}>
        {showMore ? (
          <KeyboardArrowUpIcon style={ThemeTypes.buttonIcon} />
        ) : (
          <KeyboardArrowDownIcon style={ThemeTypes.buttonIcon} />
        )}
        {showMore ? "View Less" : "View More"}
      </button>
      <p style={Styles.strategySectionHeaderText}>Design Strategy Legs</p>
      {getStrategyLegsCreation()}
      <div style={styles.buttonList}>
        <button
          disabled={props.isLoading}
          onClick={submitInputs}
          style={{ ...ThemeTypes.yellowButton, marginLeft: 0 }}
        >
          <PlayCircleIcon style={ThemeTypes.yellowButtonIcon} />
          Start Backtest
        </button>
        {showWatermark && <div style={styles.watermark}>{getWaterMarks()}</div>}
        {props.showPrintButton && (
          <button
            disabled={props.isLoading}
            onClick={printPage}
            style={ThemeTypes.yellowButton}
          >
            <DownloadOutlinedIcon style={ThemeTypes.yellowButtonIcon} />
            Print Results
          </button>
        )}
      </div>
    </>
  );
};

export const styles = {
  buttonList: {
    display: "flex" as "flex",
    justifyContent: "left" as "left",
    flexDirection: "row" as "row",
  },
  watermarksWrapper: {
    position: "relative" as "relative",
    top: 0,
    left: 0,
    display: "flex" as "flex",
    flexWrap: "wrap" as "wrap",
    height: "100vh",
  },
  yellowButton: {
    ...ThemeTypes.yellowButton,
  },
  transparentButton: {
    ...ThemeTypes.transparentButton,
    marginTop: Theme.gapSmall,
    marginBottom: Theme.gapSmall,
    marginLeft: 0,
  },
  watermark: {
    position: "absolute" as "absolute",
    top: 0,
    zIndex: 9999,
    fontSize: 46,
    textAlign: "center" as "center",
    color: "#cccccc22",
    height: "250vh",
    overflow: "hidden",
  },
  inputBoxes: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flexDirection: "row" as "row",
    flexWrap: "wrap" as "wrap",
    backgroundColor: Theme.colors.backgroundEA,
    padding: Theme.gapSmall,
    borderRadius: Theme.borderRadius,
  },
  watermarkText: {
    width: "88%",
    transform: "rotate(-45deg)",
    padding: Theme.gapLarge,
  },
};

export default InputsPage;
