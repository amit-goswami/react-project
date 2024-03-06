import React from "react";
import HomePage from "./components/HomePage";
import LandingPage from "./components/Landing/LandingPage";
import ProfilePage from "./components/Profile/ProfilePage";
import AIStrategiesPage from "./components/AIStrategies/AIStrategiesPage";
import SingleStrategyPage from "./components/AIStrategies/SingleStrategyPage/SingleStrategyPage";
import LiveTodayPage from "./components/LiveTodayPage";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import MarketNews from "./components/MarketNews/MarketNews";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import LearnMoreAboutLeaderboard from "./components/LearnMoreAboutLeaderboard/LearnMoreAboutLeaderboard";
import LandingPageAfterLogin from "./components/Landing/LandingPageAfterLogin";
import PlanAndPricing from "./components/Profile/PlanAndPricing";
import IsLogin from "./components/Landing/IsLogin";

import { Navigate, Route, Routes } from "react-router-dom";
import { UpGradePlanMessagePopup } from "./components/AIStrategies/UpGradePlanPopUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/show-popup" element={<UpGradePlanMessagePopup />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route
          path="/learn-more-about-leaderboard"
          element={<LearnMoreAboutLeaderboard />}
        />
        <Route path="/market-news" element={<MarketNews />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route
          path="/subscription"
          element={<Navigate to="/profile/subscription" />}
        />
        <Route path="/login" element={<LandingPage />} />
        <Route path="/backtesting" element={<HomePage />} />
        <Route path="/profile/" element={<ProfilePage />} />
        <Route path="/profile/:selectedTab" element={<ProfilePage />} />
        <Route path="/strategy" element={<AIStrategiesPage />} />
        <Route path="/pricing" element={<PlanAndPricing />} />
        <Route path="/dashboard-login" element={<IsLogin />} />
        <Route
          path="/strategypage/:id"
          element={
            <React.Fragment>
              <SingleStrategyPage />
            </React.Fragment>
          }
        />
        <Route path="/live-today" element={<LiveTodayPage />} />
        <Route path="/" element={<LandingPageAfterLogin />} />
        <Route element={<HomePage />} />
        <Route path="/home" element={<LandingPageAfterLogin />} />
      </Routes>
    </div>
  );
}

export default App;
