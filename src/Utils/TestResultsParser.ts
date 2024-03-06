import {
  BackTestAPIResponse,
  DailyBackTestResult,
  IResultsAPILegs,
  IResultsSummary,
} from "../API/API.interface";

export default class TestResultsParser {
  public rawResults: BackTestAPIResponse;
  private resultsLength: number;

  public constructor(data: BackTestAPIResponse) {
    this.rawResults = data;
    this.resultsLength = Object.keys(
      this.rawResults.dailyBackTestResults
    ).length;
  }

  public getDailyViewKeys(from: number, to: number): string[] {
    return Object.keys(this.rawResults.dailyBackTestResults).slice(from, to);
  }

  public getPageCountsToShow(countPerPage: number): number {
    return Math.floor(this.resultsLength / countPerPage + 1);
  }

  public getStrategyLegs(): IResultsAPILegs[] {
    return this.rawResults.mockTestAPIRequest.strategies.sort(
      (a, b) => a.sequence - b.sequence
    );
  }

  public getMargins(): number {
    return this.rawResults.resultsSummary.estimatedMargin;
  }

  public getMonthlyView(): { [key: string]: { [key: string]: number } } {
    return this.rawResults.monthBackTestResults;
  }

  public getWeekDayView(): { [key: string]: { [key: string]: number } } {
    return this.rawResults.dayBackTestResults;
  }

  public getResultsSummary(): IResultsSummary {
    return this.rawResults.resultsSummary;
  }

  public getDailyViewDataFor(key: string): DailyBackTestResult {
    return this.rawResults.dailyBackTestResults[key];
  }
}
