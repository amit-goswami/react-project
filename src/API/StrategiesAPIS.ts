// apiSubscribeToStrategy.ts

interface SubscribeToStrategyRequest {
  strategy_id: string;
  lots: number;
  is_active: boolean;
  strategy_name: string;
}

interface SubscribeToStrategyResponse {
  message: string;
}

interface APICallOptions {
  fromDate: string;
  toDate: string;
  entryTime: string;
  exitTime: string;
  strategies: Strategy[];
}

interface Strategy {
  sequence: number;
  slPerct: number;
  tpPerct: number;
  instrumentName: string;
  optionType: string;
  actionType: string;
  lots: number;
  atmDiff: number;
}

export async function SubscribeToStrategyAPI(
  requestData: SubscribeToStrategyRequest,
): Promise<SubscribeToStrategyResponse> {
  // const apiUrl = 'https://api.moneyy.ai/api/SubscribeToStrategy/';
  const apiUrl = "https://api.moneyy.ai/api/SubscribeStrategy/";

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found in local storage");
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(requestData),
    redirect: "follow",
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const responseData: SubscribeToStrategyResponse = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.message || "API request failed");
    }
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`);
  }
}

export async function MockRunTestsAPI(options: APICallOptions): Promise<any> {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch("https://api.moneyy.ai/api/mock/runtests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(options),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Network response was not ok.");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
