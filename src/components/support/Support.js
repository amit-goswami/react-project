import { Link } from "react-router-dom";
import React from "react";
import "./Support.css";
import Header from "../Header/Header";
import learning from "../../assets/images/learning.svg";
import faq from "../../assets/images/faq.svg";
import support from "../../assets/images/support.svg";
import rightarrow from "../../assets/images/rightarrow.svg";
import SupportData from "./SupportData";

function Support({ setShowFAQs }) {
  const handleClick = () => {
    setShowFAQs();
  };
  return (
    <div className="support-child2">
      {SupportData.map((data) => {
        return (
          <>
            <div className="support-child2-section1">
              <img className="support-learning-img" src={learning} />
              <div className="support-learning">Learning</div>
              <p className="support-lorem">{data.lorem}</p>
              <div className="support-learn-with-us-parent1">
                <Link to="" className="support-learn-with-us-child1">
                  Learn with Us <img src={rightarrow} />
                </Link>
              </div>
            </div>

            <div className="support-child2-section2">
              <img className="support-faq-img" src={faq} />
              <div className="support-faq">FAQs</div>
              <p className="support-lorem">{data.lorem}</p>
              <div
                className="support-explore-faq-us-parent2"
                onClick={handleClick}
              >
                {" "}
                <Link to="" className="support-explore-faq-us-child2">
                  Explore FAQs <img src={rightarrow} />
                </Link>
              </div>
            </div>

            <div className="support-child2-section3">
              <img className="support-support-img" src={support} />
              <div className="support-support">Support</div>
              <p className="support-lorem">{data.lorem}</p>
              <div className="support-support-us-parent3">
                {" "}
                <Link className="support-support-us-child3">
                  Mail Us <img style={{ color: "white" }} src={rightarrow} />
                </Link>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Support;
