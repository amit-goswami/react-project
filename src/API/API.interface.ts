export interface IResultsAPIInput {
  fromDate: string; //"2023-05-01";
  toDate: string; // "2023-05-04";
  entryTime: string; // "09:16";
  exitTime: string; // "15:05";
  strategies: IResultsAPILegs[];
}

export interface IResultsAPILegs {
  sequence: number; // 1;
  slPerct: number; //23;
  tpPerct: number; //42;
  instrumentName: "NIFTYBANK";
  optionType: "CE" | "PE";
  actionType: "Sell" | "Buy";
  lots: number; //1;
  atmDiff: number; //0;
}

export interface BackTestAPIResponse {
  dailyBackTestResults: { [key: string]: DailyBackTestResult };
  resultsSummary: IResultsSummary;
  mockTestAPIRequest: IResultsAPIInput;
  dayBackTestResults: { [key: string]: { [key: string]: number } };
  monthBackTestResults: { [key: string]: { [key: string]: number } };
}

export interface IResultsSummary {
  estimatedMargin: number;
  overallProfit: number;
  avgDayProfit: number;
  maxDayProfit: number;
  maxDayLoss: number;
  winPerctInDays: number;
  lossPerctInDays: number;
  avgMonthlyProfit: number;
  avgYearlyProfit: number;
  sharpeRatio: number;
  maxDrawDownDays: number;
  maxPeakProfit: number;
  maxProfitByMDD: number;
  avgProfitOnWinDays: number;
  avgLossOnLossDays: number;
  lotSizes: number;
  maxDrawDown: number;
  maxDrawDaysRecoveryPeriod: number;
  returnToMDDRatio: number;
  maxWinningStreak: number;
  maxLosingStreak: number;
  zeroslTpHitCount: number;
  oneSLTPHitCount: number;
  twoSLTPHitCount: number;
}

export interface DailyBackTestResult {
  pnL: number;
  dateStr: string;
  strikePrice: number;
  lotSize: number;
  tableName: string;
  strategyLegs: DailyLegResult[];
}

export interface DailyLegResult {
  isCE: boolean;
  endTime: Date;
  endValue: number;
  startTime: Date;
  startValue: number;
  sequence: number;
  legPnL: number;
}

export interface ResultsReponse {
  StrikePrice: number;
  dailyProfit: number;
  dateStr: string;
  endTime: string;
  endValue: number;
  isCE: boolean;
  lotSize: number;
  startTime: string;
  startValue: number;
  tableName: string;
}
