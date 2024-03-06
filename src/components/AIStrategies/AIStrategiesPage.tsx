import React, { useState, useEffect } from "react";
import "./aistrategies.css";
import { StrategyCard } from "./StrategyCard";
import SearchIcon from "@mui/icons-material/Search";
import getStrategyList from "./AIstrategiesdata";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Header, { CurrentPage } from "../Header/Header";
import AIStrategiesFilter from "./AIStrategiesFilter";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import useWindowSize from "../Hooks/useWindowSize";
import { West } from "@mui/icons-material";
import FilterIcon from "../Vector Components/FilterIcon";
import Loader from "../Dialogs/Loader";

const AIStrategiesPage: React.FC = () => {
  const [tab, setTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(CurrentPage.AI_Strategies);
  const [AIStrategiesdata, setAIStrategiesdata] = useState<any>([]);
  const [AllAIStrategiesdata, setAllAIStrategiesdata] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await getStrategyList();
      setAllAIStrategiesdata(data);
      setAIStrategiesdata(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   // console.log(AIStrategiesdata)
  // }, [AIStrategiesdata])

  const windowSize = useWindowSize();
  const navigate = useNavigate();

  const handleTabChange = (selectedTab: string) => {
    setTab(selectedTab);
  };

  const renderContent = () => {
    if (tab === "All") {
      return <StrategyCard AIStrategiesdata={AIStrategiesdata} />;
    }
    return null;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header currentPage={currentPage} />
      <div className={windowSize > 900 ? "container" : "container-responsive"}>
        {windowSize > 1300 && (
          <AIStrategiesFilter
            setAIStrategiesdata={setAIStrategiesdata}
            AIStrategiesdata={AllAIStrategiesdata}
          />
        )}
        <div className="strategy-landing-page">
          {windowSize > 730 ? (
            <div className="strategy-tabs">
              <div
                className="tab-option flex-center"
                onClick={() => handleTabChange("All")}
              >
                <span>All Strategies</span>
              </div>

              <div
                className="Popularity tab-option flex-center"
                onClick={() => handleTabChange("Popularity")}
              >
                <span style={{ fontWeight: "300" }}>Sort by &nbsp;</span>{" "}
                Popularity &nbsp;
                <span className="dropdown-icon flex-center">
                  <KeyboardArrowDownIcon />
                </span>
              </div>
              <div className="search-bar tab-option flex-center">
                <SearchIcon /> &nbsp;
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search any strategies"
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="strategy-tabs-responsive">
              <div
                className="tab-option-responsive-border"
                onClick={() => handleTabChange("All")}
              >
                <West
                  onClick={() => {
                    navigate("/backtesting");
                  }}
                  style={{ cursor: "pointer", marginLeft: 15 }}
                />
                <span className="strategy-title-style-responsive flex-center ">
                  {" "}
                  All Strategies
                </span>
              </div>
              <div className="search-bar tab-search-option-responsive">
                <SearchIcon />
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search any strategies"
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
              <div className="popu-fil-responsive">
                <div
                  className="tab-option-responsive"
                  onClick={() => handleTabChange("Popularity")}
                >
                  <span className="popu flex-center">
                    <span style={{ fontWeight: "300" }}>Sort by</span>{" "}
                    Popularity
                    <span className="dropdown-icon flex-center">
                      <KeyboardArrowDownIcon />
                    </span>
                  </span>
                </div>
                <span onClick={() => alert("Filter")} className="filter-span">
                  {" "}
                  <FilterIcon /> Filter
                </span>
              </div>
            </div>
          )}
          <div
            className={
              windowSize <= 900 ? "tab-content-responsive" : "tab-content"
            }
          >
            {/* <Link
              to="/strategypage"
              style={
                windowSize <= 900
                  ? { textDecoration: "none", width: 100 + "%" }
                  : { textDecoration: "none" }
              }
            > */}
            {renderContent()}
            {/* </Link> */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AIStrategiesPage;
