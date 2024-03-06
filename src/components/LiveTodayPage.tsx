import React, { useEffect, useMemo, useState } from "react";
import { AuthModule } from "../API";
import Header, { CurrentPage } from "./Header/Header";
import { Theme } from "../Utils/Constants";
import Footer from "./Footer";
import NavBar from "./NavBar";
import LiveTodayPageContent from "./AIStrategies/LiveTodayHomePage";
import { useNavigate } from "react-router-dom";

const LiveTodayPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    AuthModule.getInstance()
      .isAuthenticated()
      .then((isAuthenticated) => {
        setIsAuthenticated(isAuthenticated);
        if (!isAuthenticated) {
          navigate("/home");
        }
      })
      .catch((error) => {
        setIsAuthenticated(false);
      });
  }, [navigate]);

  return (
    <>
      <Header currentPage={CurrentPage.AI_Strategies} />
      <div style={styles.container}>
        <div style={styles.navBar}>
          <NavBar />
        </div>
        <div>
          <div style={styles.fullPageContainer}>
            <LiveTodayPageContent />
          </div>
          <div
            style={{
              backgroundColor: Theme.colors.backgroundF3,
              paddingTop: Theme.gapLarge,
            }}
          >
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex" as const,
  },
  navBar: {
    minWidth: Theme.navBarWidth,
    width: Theme.navBarWidth,
  },
  fullPageContainer: {
    padding: Theme.gapSmall,
    width: "80vw",
    height: "100vh",
  },
};

export default LiveTodayPage;
