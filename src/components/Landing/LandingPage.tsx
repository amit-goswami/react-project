import React, { useMemo } from "react";
import { AuthModule } from "../../API";
import { useNavigate } from "react-router-dom";
import { Theme } from "../../Utils/Constants";
import Header, { CurrentPage } from "../Header/Header";

import WebsiteOptions from "./WebsiteOptions";
import PricingPlans from "./PricingPlans";
import MediaAppearances from "./MediaAppearances";
import Footer from "../Footer";
import UserTestimonials from "./UserTestimonials";
import FreeTrialSection from "./FreeTrialSection";
import IntroAndAuthSection from "./IntroAndAuthSection";

const LandingPage: React.FC = () => {
  // const navigate = useNavigate();

  // useMemo(() => {
  //   AuthModule.getInstance()
  //     .isAuthenticated()
  //     .then((isAuthenticated) => {
  //       if (isAuthenticated) {
  //         navigate("/backtesting", { replace: true });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("error from login page", error);
  //     });
  // }, [navigate]);

  return (
    <div
      style={{
        backgroundColor: Theme.colors.backgroundF3,
        maxWidth: 1600,
        margin: "0px auto",
      }}
    >
      <Header currentPage={CurrentPage.None} />
      <IntroAndAuthSection />
      <WebsiteOptions />
      <PricingPlans />
      {/* <MediaAppearances />
      <UserTestimonials /> */}
      <FreeTrialSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
