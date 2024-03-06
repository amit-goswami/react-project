const fetchSubscriptionData = async () => {
  try {
    const response = await fetch("https://api.moneyy.ai/api/plan/invoice", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const subsData = await response.json();
    return subsData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchSubscriptionData;
