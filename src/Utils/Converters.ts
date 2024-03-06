import { IResultsAPIInput } from "../API/API.interface";
import { IInputsPageResult } from "../components/StrategyInputs/InputsPage";

export function convertTestInputsTypes(
  input: IInputsPageResult
): IResultsAPIInput {
  return {
    fromDate: toDateFormat(input.strategy.fromDate),
    toDate: toDateFormat(input.strategy.toDate),
    entryTime: toTimeFormat(input.strategy.entryTime),
    exitTime: toTimeFormat(input.strategy.exitTime),
    strategies: input.legs.map((leg, index) => {
      return {
        sequence: index + 1,
        slPerct: leg.slPerct,
        tpPerct: leg.tpPerct,
        instrumentName: "NIFTYBANK",
        optionType: leg.optionType,
        actionType: leg.actionType,
        lots: leg.lots,
        atmDiff: parseInt(leg.atmDiff),
      };
    }),
  };
}

export function getPercentages(value: number, margin: number) {
  if (typeof value !== "number" || typeof margin !== "number") {
    return "-";
  }
  if (value === 0 || margin === 0) {
    return "-";
  }
  const retVal = ((value / margin) * 100).toFixed(0);
  return retVal + "%";
}

function toDateFormat(date: Date): string {
  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate.replace(/\//g, "-").split("-").reverse().join("-");
}

function toTimeFormat(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${formattedHours}:${formattedMinutes}`;
}
