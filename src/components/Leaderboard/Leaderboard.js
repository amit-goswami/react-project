import React from "react";
import "../Leaderboard/Leaderboard.css";
import LeaderboardData from "./LeaderboardData";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Header, { CurrentPage } from "../Header/Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";

function Leaderboard() {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "high":
        return "#2ACD1C";

      case "low":
        return "#F82929";

      case "medium":
        return "#E7AF1D";

      default:
        return "black";
    }
  };

  function UpDownIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="12"
        fill="none"
        viewBox="0 0 9 12"
        className="ml-5"
      >
        <path
          fill="#000"
          fillOpacity="0.7"
          d="M0 4.5L4.5 0 9 4.5H0zM0 7.2l4.5 4.5L9 7.2H0z"
        ></path>
      </svg>
    );
  }

  return (
    <>
      <Header currentPage={CurrentPage.Leaderboard} />
      <div className="leaderboard-container">
        <h5 className="leaderboardrankings">
          Leaderboard Rankings
          <div className="leaderboardrankings-btm-line"></div>
        </h5>
        <hr className="leaderboard-horizontal-line" />

        <Link
          className="learnmoreaboutleaderboard"
          to={"/learn-more-about-leaderboard"}
        >
          Learn more about Leaderboard{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="7"
            viewBox="0 0 14 7"
            fill="none"
          >
            <path
              d="M10.5087 4.375H0L0 2.625L10.5087 2.625V0L14 3.5L10.5087 7V4.375Z"
              fill="#2747DD"
            />
          </svg>
        </Link>

        <div className="leaderboard-parent-pages">
          <div className="leaderboard-pages1">1 -7 of 246 Results</div>
          <div className="leaderboard-child1-pages">
            <div className="leaderboard-pages2">1 of 35 pages</div>
            <button
              class="leaderboard-btn1"
              style={{ color: "rgba(0, 0, 0, 0.70)" }}
            >
              {" "}
              <ArrowBackIosIcon style={{ fontSize: "10px" }} /> Previous{" "}
            </button>
            <button
              class="leaderboard-btn2"
              style={{ color: "rgba(0, 0, 0, 0.70)" }}
            >
              Next
              <ArrowForwardIosIcon style={{ fontSize: "10px" }} />
            </button>
          </div>
        </div>

        <table className="leaderboard-table">
          <thead className="leaderboard-table-heading">
            <tr className="leaderboard-table-navitem">
              <th className="leaderboard-nav" style={{ textAlign: "center" }}>
                Ranking <UpDownIcon />
              </th>
              <th
                className="leaderboard-nav"
                style={{ textAlign: "left", paddingLeft: "20px" }}
              >
                Name <UpDownIcon />
              </th>
              <th
                className="leaderboard-nav"
                style={{ textAlign: "center", paddingRight: "40px" }}
              >
                Level <UpDownIcon />
              </th>
              <th className="leaderboard-nav" style={{ textAlign: "center" }}>
                No. of Backtests <UpDownIcon />
              </th>
              <th className="leaderboard-nav" style={{ textAlign: "center" }}>
                Strategies P&L <UpDownIcon />
              </th>
              <th className="leaderboard-nav" style={{ textAlign: "center" }}>
                Strategies P&L % <UpDownIcon />
              </th>
              <th className="leaderboard-nav" style={{ textAlign: "center" }}>
                Market News Engagement <UpDownIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {LeaderboardData.map((data, index) => {
              return (
                <tr className="leaderboard-table-row">
                  <td
                    className="leaderboard-table-data"
                    style={{ textAlign: "center" }}
                  >
                    {data.id}
                  </td>
                  <td
                    className="leaderboard-table-data"
                    style={{ textAlign: "center" }}
                  >
                    <img className="profile-img" src={data.image} /> {data.name}
                  </td>
                  <td
                    className="leaderboard-table-data"
                    style={{ textAlign: "left", paddingLeft: "95px" }}
                  >
                    {data.icon} {data.level}
                  </td>
                  <td
                    className="leaderboard-table-data bluecolortable"
                    style={{ textAlign: "left", paddingLeft: "70px" }}
                  >
                    {data.backtest}
                  </td>
                  <td
                    className="leaderboard-table-data "
                    style={{ textAlign: "center" }}
                  >
                    {data.strategy}
                  </td>
                  <td
                    className="leaderboard-table-data"
                    style={{
                      textAlign: "center",
                      color: data.strategy1 > 0 ? " #2ACD1C" : "#F82929",
                    }}
                  >
                    {data.strategy1}%
                  </td>
                  <td
                    className="leaderboard-table-data"
                    style={{
                      color: getStatusColor(data.market_news_engagement),
                      textAlign: "left",
                      paddingLeft: "120px",
                    }}
                  >
                    {data.market_news_engagement}
                    {data.icon1}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="leaderboard-footer-container">
        <Footer />
      </div>
    </>
  );
}

export default Leaderboard;
