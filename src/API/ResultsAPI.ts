import { IResultsAPIInput } from "./API.interface";
import { AuthModule } from "./Auth";

export class ResultsAPIModule {
  private auth: AuthModule;
  public constructor() {
    this.auth = AuthModule.getInstance();
  }

  public async getResults(data: IResultsAPIInput) {
    console.log(data)
    const accessToken = this.auth.getAccessToken();
    console.log(accessToken)
    try {
      return fetch("https://api.moneyy.ai/api/mock/runtests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
