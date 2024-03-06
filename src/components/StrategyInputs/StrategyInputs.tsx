import DateInput from "./Elements/DateInput";
import { Theme } from "../../Utils/Constants";
import TimeInput from "./Elements/TimeInput";
import IndexInput from "./Elements/IndexInput";
import StrategyInput from "./Elements/StrategyInput";
import Slippagesinput from "./Elements/SlippagesInput";

export interface IStrategyInput {
  fromDate: Date;
  toDate: Date;
  entryTime: Date;
  exitTime: Date;
  index: string;
  strategy: string;
  slippage: string;
}

export interface IStrategyInputsProps {
  strategyInputs: IStrategyInput;
  onInputsChanged: (strategyInput: IStrategyInput) => void;
  showMore: boolean;
}

export const StrategyInputs: React.FC<IStrategyInputsProps> = ({
  onInputsChanged,
  strategyInputs,
  showMore,
}) => {
  const minDate = new Date("2018-01-01 09:00");
  const maxDate = new Date("2023-05-30 09:00");
  const todayAt9AM = new Date("2023-06-14 09:00");
  const todayAt4PM = new Date("2023-06-14 16:00");
  const { fromDate, toDate, entryTime, exitTime, index, strategy, slippage } =
    strategyInputs;

  const setFromDate = (value: Date) => {
    strategyInputs.fromDate = value;
    onInputsChanged(strategyInputs);
  };

  const setToDate = (value: Date) => {
    strategyInputs.toDate = value;
    onInputsChanged(strategyInputs);
  };

  const setEntryTime = (value: Date) => {
    strategyInputs.entryTime = value;
    onInputsChanged(strategyInputs);
  };

  const setExitTime = (value: Date) => {
    strategyInputs.exitTime = value;
    onInputsChanged(strategyInputs);
  };

  const setIndex = (value: string) => {
    strategyInputs.index = value;
    onInputsChanged(strategyInputs);
  };

  const setStrategy = (value: string) => {
    strategyInputs.strategy = value;
    onInputsChanged(strategyInputs);
  };

  const setSlippage = (value: string) => {
    strategyInputs.slippage = value;
    onInputsChanged(strategyInputs);
  };

  return (
    <>
      <div style={styles.inputBoxes}>
        <IndexInput label="Index" onChange={setIndex} defaultIndex={index} />
        <DateInput
          label="Start Date"
          minDate={minDate}
          maxDate={maxDate}
          onChange={setFromDate}
          defaultDate={fromDate}
        />
        <DateInput
          label="End Date"
          minDate={minDate}
          maxDate={maxDate}
          onChange={setToDate}
          defaultDate={toDate}
        />
        <TimeInput
          label="Entry Time"
          minTime={todayAt9AM}
          maxTime={todayAt4PM}
          onChange={setEntryTime}
          defaultTime={entryTime}
        />
        <TimeInput
          label="Exit Time"
          minTime={todayAt9AM}
          maxTime={todayAt4PM}
          onChange={setExitTime}
          defaultTime={exitTime}
        />
        {showMore && (
          <StrategyInput
            label="Select Strategy"
            onChange={setStrategy}
            strategy={strategy}
          />
        )}
        {showMore && (
          <Slippagesinput
            label="Select Strategy"
            onChange={setSlippage}
            slippage={slippage}
          />
        )}
      </div>
    </>
  );
};

export const styles = {
  inputBoxes: {
    justifyContent: "left",
    display: "flex",
    alignItems: "center",
    flexDirection: "row" as "row",
    flexWrap: "wrap" as "wrap",
    backgroundColor: Theme.colors.backgroundF3,
    padding: Theme.gapSmall,
    borderRadius: Theme.borderRadiusLarge,
  },
};

export default StrategyInputs;
