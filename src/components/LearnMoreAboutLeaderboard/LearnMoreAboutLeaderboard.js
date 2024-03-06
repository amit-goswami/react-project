import React from "react";
import "./LearnMoreAboutLeaderboard.css";
import Header, { CurrentPage } from "../Header/Header";
import Footer from "../Footer";
import { ReactComponent as Beginner } from "../../assets/images/beginner.svg";
import { ReactComponent as First } from "../../assets/images/first.svg";
import { ReactComponent as Second } from "../../assets/images/second.svg";
import { ReactComponent as Pro } from "../../assets/images/pro.svg";

function LearnMoreAboutLeaderboard() {
  function Level(props) {
    const img = props.img;
    const name = props.name;
    const overview = props.overview;
    const milestone = props.milestone;
    return (
      <div className="learn-more-about-leaderboard-level">
        <div className="learn-more-about-leaderboard-level-inner">
          <div className="learn-more-about-leaderboard-level-part learn-more-about-leaderboard-level-part-img">
            <div className="learn-more-about-leaderboard-img">{img}</div>
            <div className="learn-more-about-leaderboard-level-name">
              {name}
            </div>
          </div>
          <div className="learn-more-about-leaderboard-level-part">
            <div className="learn-more-about-leaderboard-level-part-title">
              Overview
            </div>
            <div className="learn-more-about-leaderboard-level-part-description">
              {overview}
            </div>
          </div>
          <div className="learn-more-about-leaderboard-level-part"></div>
          <div className="learn-more-about-leaderboard-level-part">
            <div className="learn-more-about-leaderboard-level-part-title">
              Milestone
            </div>
            <ul className="learn-more-about-leaderboard-level-part-description-list">
              {milestone.map((point, index) => {
                return <li key={index}>{point}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header currentPage={CurrentPage.Learn} />
      <div className="learn-more-about-leaderboard-image-text">
        Levels at Moneyy.ai
      </div>
      <div className="learn-more-about-leaderboard-level-container">
        <Level
          img={<Beginner />}
          name={"Beginner"}
          overview={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
          }
          milestone={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
            "sed do eiusmod tempor incididunt ut labore et dolore ",
            "magna aliqua. Ut enim ad minim veniam, quis ",
            "nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
          ]}
        />
        <Level
          img={<First />}
          name={"Level 1"}
          overview={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
          }
          milestone={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
            "sed do eiusmod tempor incididunt ut labore et dolore ",
            "magna aliqua. Ut enim ad minim veniam, quis ",
            "nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
          ]}
        />
        <Level
          img={<Second />}
          name={"Level 2"}
          overview={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
          }
          milestone={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
            "sed do eiusmod tempor incididunt ut labore et dolore ",
            "magna aliqua. Ut enim ad minim veniam, quis ",
            "nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
          ]}
        />
        <Level
          img={<Pro />}
          name={"Pro"}
          overview={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
          }
          milestone={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
            "sed do eiusmod tempor incididunt ut labore et dolore ",
            "magna aliqua. Ut enim ad minim veniam, quis ",
            "nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
          ]}
        />
      </div>
      <div className="learn-more-about-leaderboard-footer-container">
        <Footer />
      </div>
    </>
  );
}

export default LearnMoreAboutLeaderboard;
