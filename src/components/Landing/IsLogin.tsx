import React, { useEffect, useMemo, useState } from "react";
import { AuthModule } from "../../API/Auth";
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
import PlanAndPricing from "../Profile/PlanAndPricing";
import IsLoginSection from "./IsLoginSection";

const IsLogin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticated =
          await AuthModule.getInstance().isAuthenticated();
        setIsAuthenticated(isAuthenticated);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthentication();
  }, []);
  return (
    <div
      style={{
        backgroundColor: Theme.colors.backgroundF3,
        maxWidth: 1600,
        margin: "0px auto",
      }}
    >
      <Header currentPage={CurrentPage.None} />
      <IsLoginSection />
      <Footer />
    </div>
  );
};

export default IsLogin;
