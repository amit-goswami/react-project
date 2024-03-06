import React from "react";
import "./MarketNews.css";
import { LatestMarketNewsData, PopularMarketNewsData } from "./MarketNewsData";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Header, { CurrentPage } from "../Header/Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";

function MarketNews() {
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

  function SearchIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="15"
        fill="none"
        viewBox="0 0 17 15"
      >
        <path
          fill="#000"
          fillOpacity="0.7"
          d="M12.15 9.434h-.768l-.272-.232c.952-.977 1.526-2.247 1.526-3.627C12.636 2.495 9.807 0 6.318 0 2.828 0 0 2.496 0 5.575s2.828 5.574 6.318 5.574c1.565 0 3.003-.506 4.111-1.346l.263.24v.677l4.86 4.28L17 13.722l-4.85-4.288zm-5.832 0c-2.42 0-4.374-1.724-4.374-3.86 0-2.135 1.954-3.859 4.374-3.859s4.374 1.724 4.374 3.86c0 2.135-1.954 3.859-4.374 3.859z"
        ></path>
      </svg>
    );
  }

  function StarIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          fill="#E7AF1D"
          d="M12.43 8L10 0 7.57 8H0l6.18 4.41L3.83 20 10 15.31 16.18 20l-2.35-7.59L20 8h-7.57z"
        ></path>
      </svg>
    );
  }

  function LinkIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="5"
        fill="none"
        viewBox="0 0 10 5"
      >
        <path
          fill="#5468C4"
          d="M7.5 0h-2v1h2C8.325 1 9 1.675 9 2.5S8.325 4 7.5 4h-2v1h2a2.5 2.5 0 000-5zm-3 4h-2C1.675 4 1 3.325 1 2.5S1.675 1 2.5 1h2V0h-2a2.5 2.5 0 000 5h2V4zM3 2h4v1H3V2z"
        ></path>
      </svg>
    );
  }

  function ThumbsIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="15"
        fill="none"
        viewBox="0 0 16 15"
      >
        <path
          fill="#000"
          fillOpacity="0.7"
          d="M5.55 14.571h6.244c.576 0 1.069-.346 1.277-.846l2.095-4.891a1.37 1.37 0 00.097-.507V6.94c0-.763-.624-1.388-1.387-1.388H9.498l.659-3.17.02-.222c0-.285-.117-.548-.305-.736L9.137.696 4.565 5.268c-.25.25-.402.596-.402.978v6.938c0 .763.624 1.387 1.387 1.387zm0-8.325l3.011-3.011-.93 3.705h6.245v1.387l-2.082 4.857H5.55V6.246zm-5.55 0h2.775v8.325H0V6.246z"
        ></path>
      </svg>
    );
  }

  function ForwardIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="10"
        fill="none"
        viewBox="0 0 12 10"
      >
        <path
          fill="#323232"
          d="M7.333 2.667V0L12 4.667 7.333 9.333V6.6C4 6.6 1.667 7.667 0 10c.667-3.333 2.667-6.667 7.333-7.333z"
        ></path>
      </svg>
    );
  }

  function DownIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="17"
        fill="none"
        viewBox="0 0 10 17"
      >
        <path
          fill="#F82929"
          d="M6.012 12.093V0h-2.12v12.093H.712l4.24 4.018 4.24-4.018h-3.18z"
        ></path>
      </svg>
    );
  }

  function UpIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="17"
        fill="none"
        viewBox="0 0 10 17"
      >
        <path
          fill="#2ACD1C"
          d="M6.156 4.018V16.11h-2.12V4.018H.856L5.096 0l4.24 4.018h-3.18z"
        ></path>
      </svg>
    );
  }

  function ThumbDownIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="15"
        fill="none"
        viewBox="0 0 16 15"
      >
        <path
          fill="#000"
          fillOpacity="0.7"
          d="M10.217.696H3.973c-.576 0-1.069.347-1.277.846L.601 6.433a1.37 1.37 0 00-.097.507v1.387c0 .764.624 1.388 1.387 1.388H6.27l-.659 3.17-.02.223c0 .284.117.548.305.735l.735.728L11.202 10c.25-.25.402-.596.402-.978V2.083c0-.763-.624-1.387-1.387-1.387zm0 8.325l-3.011 3.011.93-3.705H1.89V6.94l2.082-4.857h6.244v6.938zM12.992.696h2.775V9.02h-2.775V.696z"
        ></path>
      </svg>
    );
  }

  function MarketNewsBodyTitle(props) {
    const title = props.title;
    return (
      <div className="marketnews-body-title">
        <StarIcon /> {title}
        <div className="marketnews-body-title-dot"></div>
      </div>
    );
  }

  function MarketNewsBodyContent(props) {
    const img = props.img;
    const title = props.title;
    const time = props.time;
    const desc = props.desc;
    const link = props.link;
    const tags = props.tags;
    const like = props.like;
    const dislike = props.dislike;
    const up = props.up;
    const down = props.down;
    const previewLink = link.replace(/^https?:\/\//, "");
    const redirectLink =
      link.startsWith("http://") || link.startsWith("https://")
        ? link
        : "http://" + link;

    return (
      <div className="marketnews-body-content">
        <div className="marketnews-body-content-title">
          {title}
          <div className="marketnews-body-content-title-time">{time}</div>
        </div>
        <div className="marketnews-body-content-description">{desc}</div>
        <div className="marketnews-body-content-bottom">
          <div className="marketnews-body-content-bottom-parts marketnews-body-content-bottom-part-1">
            <img src={img} alt="profile" />
            <Link to={redirectLink}>
              {previewLink} <LinkIcon />{" "}
            </Link>

            {tags.map((tag, index) => {
              return <button key={index}>{tag}</button>;
            })}
          </div>
          <div className="marketnews-body-content-bottom-parts marketnews-body-content-bottom-part-2">
            <button>
              <ThumbsIcon /> {like}
            </button>
            <button>
              <ThumbDownIcon /> {dislike}
            </button>
            <button>
              <UpIcon /> {up}
            </button>
            <button>
              <DownIcon /> {down}
            </button>
            <button
              onClick={() => {
                //Not For Production
                //Not For Production
                //Not For Production
                //Not For Production
                alert("Forward");
                //Not For Production
                //Not For Production
                //Not For Production
                //Not For Production
              }}
            >
              <ForwardIcon />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header currentPage={CurrentPage.Market_News} />
      <div className="marketnews-container">
        <h5 className="marketnewsrankings">
          Market News in Real Time
          <div className="marketnewsrankings-btm-line"></div>
        </h5>
        <hr className="marketnews-horizontal-line" />

        <div className="marketnews-parent-pages">
          <div className="marketnews-part1">
            <button
              className="marketnews-part1-btn"
              style={{ color: "rgba(0, 0, 0, 0.70)" }}
            >
              Top News <ArrowDropDownIcon />
            </button>
            <button
              className="marketnews-part1-btn"
              style={{ color: "rgba(0, 0, 0, 0.70)" }}
            >
              Show All <ArrowDropDownIcon />
            </button>
          </div>
          <div className="marketnews-part2">
            <div className="marketnews-part2-icon-cont">
              <SearchIcon />
            </div>
            <input
              type="search"
              className="marketnews-part2-search-input"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="marketnews-body">
          <MarketNewsBodyTitle title="Latest" />
          {LatestMarketNewsData.map((item) => {
            return (
              <MarketNewsBodyContent
                key={item.id}
                img={item.img}
                title={item.title}
                time={item.time}
                desc={item.desc}
                link={item.link}
                tags={item.tags}
                like={item.like}
                dislike={item.dislike}
                up={item.up}
                down={item.down}
              />
            );
          })}
          <div className="promo-box-container">
            <div className="promo-box">
              <div className="promo-box-parts">
                <div className="promo-box-parts-text1">
                  100 users are using moneyy.ai now.{" "}
                </div>
                <div className="promo-box-parts-text2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>
              <div className="promo-box-parts">
                <button>Read more</button>
              </div>
            </div>
          </div>
          <MarketNewsBodyTitle title="Popular" />
          {PopularMarketNewsData.map((item) => {
            return (
              <MarketNewsBodyContent
                key={item.id}
                img={item.img}
                title={item.title}
                time={item.time}
                desc={item.desc}
                link={item.link}
                tags={item.tags}
                like={item.like}
                dislike={item.dislike}
                up={item.up}
                down={item.down}
              />
            );
          })}
        </div>
        <div className="marketnews-pages">
          <div>
            <button
              class="marketnews-btn1"
              style={{ color: "rgba(0, 0, 0, 0.70)" }}
            >
              {" "}
              <ArrowBackIosIcon style={{ fontSize: "10px" }} /> Previous{" "}
            </button>
            <button
              class="marketnews-btn2"
              style={{ color: "rgba(0, 0, 0, 0.70)" }}
            >
              Next
              <ArrowForwardIosIcon style={{ fontSize: "10px" }} />
            </button>
          </div>
        </div>
      </div>
      <div className="marketnews-footer-container">
        <Footer />
      </div>
    </>
  );
}

export default MarketNews;
