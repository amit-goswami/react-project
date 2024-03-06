import React, { useEffect, useState } from "react";
import Header, { CurrentPage } from "../Header/Header";
import Footer from "../Footer";
import { Theme } from "../../Utils/Constants";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  ArticleOutlined,
  DescriptionOutlined,
  SubscriptionsOutlined,
  West,
} from "@mui/icons-material";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import MyProfile from "./MyProfile";
import MySubscriptions from "./MySubscriptions";
import BrokerSettings from "./BrokerProfile/BrokerSettings";
import PlanAndPricing from "./PlanAndPricing";
import StrategyPL from "./StrategyPL";
import HelpAndSupport from "./HelpAndSupport";
import useWindowSize from "../Hooks/useWindowSize";
import { useNavigate, useParams } from "react-router-dom";
import { AuthModule } from "../../API";
import useAppStore from "../../store/app.store";

const ProfilePage: React.FC = () => {
  const params = useParams();
  const selectedTab = params.selectedTab;

  const windowSize = useWindowSize();
  const navigate = useNavigate();

  const { selectedSectionIndex } = useAppStore();
  const { setSelectedSectionIndex } = useAppStore();

  useEffect(() => {
    if (selectedTab === "subscription") {
      setSelectedSectionIndex(1);
    }
  }, [selectedTab, setSelectedSectionIndex]);

  const sections = [
    {
      title: "Profile",
      icon: <PersonOutlineIcon style={styles.icon} />,
      navigate: "user",
    },
    {
      title: "Subscriptions",
      icon: <SubscriptionsOutlined style={styles.icon} />,
      navigate: "subscription",
    },
    {
      title: "Broker",
      icon: <DescriptionOutlined style={styles.icon} />,
      navigate: "broker",
    },
    {
      title: "Plan & Pricing",
      icon: <OfflineBoltOutlinedIcon style={styles.icon} />,
      navigate: "pricing",
    },
    {
      title: "Strategy P&L",
      icon: <TimelineOutlinedIcon style={styles.icon} />,
      navigate: "strategy",
    },
    {
      title: "Help & Support",
      icon: <ArticleOutlined style={styles.icon} />,
      navigate: "support",
    },
    {
      title: "Logout",
      icon: <PowerSettingsNewIcon style={styles.icon} />,
      navigate: "logout",
    },
  ];

  const getSectionComp = () => {
    const normalStyle = styles.dropDownItem;
    const selectedStyle = {
      ...styles.dropDownItem,
      ...styles.selectedStyle,
    };

    return sections.map((section, index) => {
      return (
        <div
          style={selectedSectionIndex === index ? selectedStyle : normalStyle}
          key={index}
          onClick={() => {
            setSelectedSectionIndex(index);
            navigate(`/profile/${section.navigate.toLowerCase()}`);
          }}
        >
          {section.icon}
          <span style={styles.sectionName}>{section.title}</span>
        </div>
      );
    });
  };

  const [_isAuthenticated, setIsAuthenticated] = useState(false);

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

  const getSelectedContent = () => {
    switch (selectedSectionIndex) {
      case 0:
        return <MyProfile />;
      case 1:
        return <MySubscriptions />;
      case 2:
        return <BrokerSettings />;
      case 3:
        return <PlanAndPricing />;
      case 4:
        return <StrategyPL />;
      case 5:
        return <HelpAndSupport />;
      default:
        return <MyProfile />;
    }
  };

  const getRightContainer = () => {
    return (
      <div>
        <p
          style={
            windowSize <= 480 ? styles.pageTitleResponsive : styles.pageTitle
          }
        >
          {windowSize <= 480 && (
            <West
              onClick={() => {
                navigate("/backtesting");
              }}
              style={{ cursor: "pointer" }}
            />
          )}
          {/* Exceptional case for broker */}
          {sections[selectedSectionIndex || 0].title === "Broker"
            ? "Select Brokers"
            : sections[selectedSectionIndex || 0].title}
        </p>
        <div style={styles.pageActual}>{getSelectedContent()}</div>
      </div>
    );
  };

  return (
    <div style={styles.pageContainer}>
      <Header currentPage={CurrentPage.None} />

      <div style={styles.flexCont}>
        {windowSize > 480 && (
          <div style={styles.leftCont}>{getSectionComp()}</div>
        )}
        <div
          style={
            windowSize <= 480 ? styles.rightContResponsive : styles.rightCont
          }
        >
          {getRightContainer()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: Theme.colors.backgroundF3,
  },
  selectedStyle: {
    backgroundColor: Theme.colors.yellow + "1A",
    borderLeft: `5px solid ${Theme.colors.orange}`,
  },
  flexCont: {
    display: "flex" as const,
    flexDirection: "row" as const,
    justifyContent: "space-around" as const,
    alignItems: "flex-start" as const,
  },
  sectionName: {
    margin: "auto 0",
    fontSize: Theme.fontSizes.h4,
  },
  leftCont: {
    width: "220px",
    backgroundColor: Theme.colors.white,
    margin: Theme.gapXXLarge,
    marginBottom: Theme.gapLarge,
    borderRadius: Theme.borderRadius,
    paddingTop: Theme.gapSmall,
    paddingBottom: Theme.gapSmall,
  },
  rightCont: {
    flex: 1,
    marginRight: Theme.gapLarge,
  },
  rightContResponsive: {
    flex: 1,
    marginRight: Theme.gapLarge,
    marginLeft: Theme.gapLarge,
  },
  icon: {
    color: Theme.colors.black70,
    fontSize: Theme.fontSizes.h3,
    margin: Theme.gapSmall,
    backgroundColor: Theme.colors.whiteGrey30,
    padding: Theme.gapTiny,
    borderRadius: "50%",
  },
  dropDownItem: {
    display: "flex" as const,
    cursor: "pointer" as const,
  },
  pageTitle: {
    fontSize: Theme.fontSizes.h1,
    fontWeight: Theme.fontWeight.semiBold,
    color: Theme.colors.black,
    margin: 0,
    marginTop: Theme.gapSmall,
    marginBottom: Theme.gapSmall,
  },
  pageTitleResponsive: {
    fontSize: Theme.fontSizes.h3,
    fontWeight: Theme.fontWeight.semiBold,
    color: Theme.colors.black,
    margin: 0,
    marginTop: Theme.gapLarge,
    marginBottom: Theme.gapLarge,
    display: "flex" as const,
    flexDirection: "row" as const,
    justifyContent: "flex-start" as const,
    alignItems: "center" as const,
    gap: "10px",
  },
  pageActual: {
    backgroundColor: Theme.colors.backgroundF3,
    borderRadius: Theme.borderRadius,
  },
};

export default ProfilePage;
