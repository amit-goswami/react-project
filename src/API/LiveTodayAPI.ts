export interface ApiResponse {
  status: string;
  message: string;
}

export interface OrderDetails {
  PositionID: string;
  Position: string;
  Quantity: string;
  EntryAveragePrice: string;
  Entry: boolean;
  Direction: string;
  ExitAveragePrice: string | null;
  PnL: string | null;
}

export interface UserLiveTradeAPIInterface {
  response_code: number;
  error_code: string;
  error_message: string;
  request_id: string;
  time_taken: number;
  request_timestamp: string;
  response_message: string;
  response_data: {
    PositionDetails: {
      position_id: string;
      order_details: OrderDetails[];
    };
  };
}

export interface SubscriptionDetailResponseData {
  strategy_id: string;
  lots: number;
  is_active: boolean;
  strategy_name: string;
}

export interface SubscriptionDetailInterface {
  Status: number;
  Response_data: SubscriptionDetailResponseData[];
}

export async function LiveTodayKillAPI(
  userId: string,
  strategyId: string,
): Promise<ApiResponse> {
  try {
    const requestBody = {
      userId: userId,
      strategyId: strategyId,
    };

    const response = await fetch(
      "https://bhfgfr2f63.execute-api.ap-south-1.amazonaws.com/dev/user-kill-switch",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function subscriptionPauseResumeAPI(
  strategyId: string,
): Promise<string> {
  const apiUrl = "https://api.moneyy.ai/api/subscription_pause_resume/";

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Access token not found in local storage");
  }

  const requestBody = {
    strategy_id: strategyId,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    if (response.ok) {
      // alert(responseData.message);
      return responseData.message;
    } else {
      throw new Error(responseData.message);
    }
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`);
  }
}

export async function getSubscriptionDetails(): Promise<SubscriptionDetailInterface> {
  // const apiUrl = 'https://api.moneyy.ai/api/get_subscription_details/';
  const apiUrl = "https://api.moneyy.ai/api/user/subscription/details/";

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found in local storage");
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const responseData: SubscriptionDetailInterface = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error("API request failed");
    }
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`);
  }
}

export async function UserLiveTradeAPI(
  userId: string,
  strategyId: string,
): Promise<UserLiveTradeAPIInterface> {
  const url =
    "https://bhfgfr2f63.execute-api.ap-south-1.amazonaws.com/dev/user-live-trade";
  const requestBody = JSON.stringify({
    UserId: userId,
    strategyId: strategyId,
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    // if (!response.ok) {
    //   throw new Error(`HTTP`);
    // }

    const responseData: UserLiveTradeAPIInterface = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetaching data:", error);
    throw error;
  }
}

class WebSocketService {
  private socket: WebSocket | null = null;

  public connect(
    strategyId: string,
    onMessageCallback: (data: any) => void,
  ): void {
    // const url = `ws://15.206.75.39:8765/${strategyId}`;
    const url = `ws://13.233.31.7:8765/strat_0008`;
    this.socket = new WebSocket(url);

    this.socket.addEventListener("message", (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        onMessageCallback(parsedData);
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}

const webSocketService = new WebSocketService();

export default webSocketService;
