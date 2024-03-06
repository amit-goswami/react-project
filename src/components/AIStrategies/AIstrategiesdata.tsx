import trade from "../../assets/images/trade.jpg";

export const AIStrategiesdata = [
  {
    id: 1,
    img: trade,
    title: "Startegy 1",
    badge1: "New",
    riskBadge: "High Risk",
    cardDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur adipiscing elit.",
    cardAuthor: "Windmill",
    minCapital: 100000,
    capDeploy: 50000,
    cagr: 10.78,
  },
  {
    id: 2,
    img: trade,
    title: "Startegy 2",
    badge1: "Popular",
    riskBadge: "Low Risk",
    cardDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    cardAuthor: "Windmill",
    minCapital: 100000,
    capDeploy: 50000,
    cagr: 15.78,
  },
  {
    id: 3,
    img: trade,
    title: "Startegy 3",
    badge1: "High Return",
    riskBadge: "Medium Risk",
    cardDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    cardAuthor: "Windmill",
    minCapital: 100000,
    capDeploy: 50000,
    cagr: 34.78,
  },
  {
    id: 4,
    img: trade,
    title: "Startegy 4",
    badge1: "New",
    riskBadge: "High Risk",
    cardDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    cardAuthor: "Windmill",
    minCapital: 100000,
    capDeploy: 50000,
    cagr: 10.78,
  },
];

async function getStrategyList(): Promise<any[]> {
  const url =
    "https://bhfgfr2f63.execute-api.ap-south-1.amazonaws.com/dev/strategy-list";
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    const responseData = await response.json();
    return responseData.response_data;
  } catch (error) {
    console.error("Error");
    return [];
  }
}

async function getStrategyDetails(id: any): Promise<any> {
  const url =
    "https://bhfgfr2f63.execute-api.ap-south-1.amazonaws.com/dev/strategy-details";

  const requestBody = {
    strategyId: id,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching strategy details:", error);
    throw error;
  }
}

export default getStrategyList;
export { getStrategyDetails };
