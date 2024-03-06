import React from "react";
import Download from "../../assets/images/download.svg";

function SubscriptionTable({ data }) {
  function extractDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  return (
    <>
      <tr className="subscription-table-data">
        <td style={{ paddingLeft: "15px" }} className="subscription-table-data">
          {data.plan_name}
        </td>
        <td className="subscription-table-data">
          {extractDate(data.issue_date)}
        </td>
        <td className="subscription-table-data">
          {extractDate(data.due_date)}
        </td>
        <td className="subscription-table-data">{data.around_total}</td>
        <td className="subscription-table-data">
          <button className="subscription-table-button">
            <img style={{ paddingRight: "5px" }} src={Download} />
            Invoice
          </button>
        </td>
      </tr>
    </>
  );
}

export default SubscriptionTable;
