import fetchSubscriptionData from "./SubscriptionData";
import "./Subscription.css";
import Header from "../Header/Header";
import SubscriptionTable from "./SubscriptionTable";
import { useEffect, useState } from "react";
import Loader from "../Dialogs/Loader";
function Subscription() {
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionData, setsubscriptionData] = useState([
    {
      planName: "Standard",
      startDate: "03 Nov 2019",
      endDate: "03 Nov 2025",
      invoiceAmount: "₹35,000",
    },
  ]);
  console.log(subscriptionData);

  useEffect(() => {
    const fetchData = async () => {
      const susbData = await fetchSubscriptionData();
      setsubscriptionData(susbData["Response data"]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="subscription-section-child2">
        <div
          style={{ paddingLeft: "15px" }}
          className="subscription-table-main"
        >
          Member Since 09 November 2023
        </div>

        <table>
          <thead>
            <tr className="subscription-table-heading">
              <th
                style={{ paddingLeft: "15px" }}
                className="subscription-header-row-data"
              >
                Plan Name
              </th>
              <th className="subscription-header-row-data">Start Date</th>
              <th className="subscription-header-row-data">End Date</th>
              <th className="subscription-header-row-data">Invoice Amount</th>
              <th className="subscription-header-row-data"></th>
            </tr>
          </thead>
          <tbody>
            {subscriptionData?.map((data) => {
              return (
                <>
                  <SubscriptionTable data={data} />
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Subscription;
