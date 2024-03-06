import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Theme } from "../../Utils/Constants";
import { AuthModule } from "../../API/Auth";
import { useNavigate } from "react-router-dom";
import HeaderDropDown from "./HeaderDropDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
import useWindowSize from "../Hooks/useWindowSize";
import Loader from "../Dialogs/Loader";
import useAppStore from "../../store/app.store";

export enum CurrentPage {
  BackTesting = "BackTesting",
  AI_Strategies = "AI_Strategies",
  Market_News = "Market_News",
  Learn = "Learn",
  Pricing = "Pricing",
  Leaderboard = "Leaderboard",
  None = "None",
}

interface HeaderProps {
  currentPage: CurrentPage;
}

function Header({ currentPage }: HeaderProps) {
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { isAuthenticated } = useAppStore();
  const { isLoading } = useAppStore();
  const { profileName } = useAppStore();
  const { setIsAuthenticated } = useAppStore();
  const { setIsLoading } = useAppStore();
  const { setProfileName } = useAppStore();
  const { setSelectedSectionIndex } = useAppStore();

  const windowSize = useWindowSize();

  const signOut = useCallback(() => {
    AuthModule.getInstance().performLogout();
    navigate("/login", { replace: true });
  }, [navigate]);

  useMemo(() => {
    AuthModule.getInstance()
      .getAboutMe()
      .then((res) => {
        setProfileName(res.name);
        setIsAuthenticated(true);
        setIsLoading(false);
        return res;
      })
      .catch((err) => {
        console.error("error from header", err);
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  const getButtonType = () => {
    if (isLoading) {
      return <Loader />;
    }
    console.log("isAuthenticated", isAuthenticated);
    switch (isAuthenticated && windowSize > 1000) {
      case true:
        return loggedInDropDownMenu();
      case false:
        return loggedOutSignUpButton();
      default:
        return <Loader />;
    }
  };

  function toggleDropdown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    setDropdownVisible(!isDropdownVisible);
  }

  function getStylesForPage(page: CurrentPage) {
    if (page === currentPage) {
      return {
        ...styles.centerTab,
        ...styles.highlightTab,
      };
    } else {
      return styles.centerTab;
    }
  }

  interface ButtonProps {
    responsive?: boolean;
  }

  const loggedInDropDownMenu = (props?: ButtonProps) => {
    return (
      <div
        style={
          props?.responsive
            ? styles.rightContainerResponsiveStyle
            : styles.rightContainerStyle
        }
        onClick={(e) => toggleDropdown(e)}
      >
        <span
          style={
            props?.responsive
              ? styles.profileNameResponsiveStyle
              : windowSize <= 1160
                ? { ...styles.profileNameStyle, ...{ fontSize: "11px" } }
                : styles.profileNameStyle
          }
        >
          Hi,{" "}
          {profileName && profileName.length > 7
            ? `${profileName.substring(0, 7)}...`
            : profileName}
        </span>
        {isDropdownVisible ? (
          <KeyboardArrowUpIcon style={styles.buttonIcon} />
        ) : (
          <KeyboardArrowDownIcon style={styles.buttonIcon} />
        )}
        {isDropdownVisible && (
          <HeaderDropDown
            setDropdownVisible={setDropdownVisible}
            onSignOut={signOut}
          />
        )}
      </div>
    );
  };

  const loggedOutSignUpButton = (props?: ButtonProps) => {
    return (
      <div
        style={
          props?.responsive
            ? styles.rightContainerResponsiveStyle
            : styles.rightContainerStyle
        }
        onClick={() => {
          navigate("/login", { replace: true });
        }}
      >
        <span
          style={
            props?.responsive
              ? styles.profileNameResponsiveStyle
              : styles.profileNameStyle
          }
        >
          Sign Up Free
        </span>
      </div>
    );
  };

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogoClick = () => {
    navigate("/home");
  };

  return (
    <header
      style={
        windowSize <= 1000
          ? { ...styles.headerStyle, flexDirection: "column" }
          : styles.headerStyle
      }
    >
      <div
        style={
          windowSize <= 1000
            ? styles.leftContainerResponsiveStyle
            : styles.leftContainerStyle
        }
      >
        <div style={styles.logoContainerStyle} onClick={handleLogoClick}>
          {windowSize <= 1000 ? (
            <div onClick={toggleMenu} style={styles.menuIconContainer}>
              <MenuIcon style={styles.menuIcon} />
            </div>
          ) : null}
          <img
            src="/images/logo.svg"
            alt="logo"
            style={{
              ...(windowSize <= 1000
                ? styles.profileImageResponsiveStyle
                : styles.profileImageStyle),
              cursor: "pointer", // this line to change cursor to pointer
            }}
          />
        </div>
        {isAuthenticated &&
          windowSize <= 1000 &&
          loggedInDropDownMenu({ responsive: true })}
        {!isAuthenticated &&
          windowSize <= 1000 &&
          loggedOutSignUpButton({ responsive: true })}
      </div>
      {(windowSize > 1000 || isOpen) && (
        <div
          style={
            windowSize <= 1000
              ? { ...styles.centerContainer, flexDirection: "column" }
              : styles.centerContainer
          }
        >
          <div
            style={
              windowSize <= 1160 && windowSize > 1000
                ? {
                    ...getStylesForPage(CurrentPage.BackTesting),
                    ...{ fontSize: "11px", whiteSpace: "nowrap" },
                  }
                : windowSize <= 1000
                  ? {
                      ...getStylesForPage(CurrentPage.BackTesting),
                      ...{
                        fontSize: "11px",
                        whiteSpace: "nowrap",
                        backgroundColor: "transparent",
                        border: "none",
                      },
                    }
                  : { ...getStylesForPage(CurrentPage.BackTesting) }
            }
            onClick={() => {
              navigate("/backtesting");
            }}
          >
            Backtesting
          </div>
          <div
            style={
              windowSize <= 1160 && windowSize > 1000
                ? {
                    ...getStylesForPage(CurrentPage.AI_Strategies),
                    ...{
                      fontSize: "11px",
                      whiteSpace: "nowrap",
                      position: "relative",
                    },
                  }
                : windowSize <= 1000
                  ? {
                      ...getStylesForPage(CurrentPage.AI_Strategies),
                      ...{
                        fontSize: "11px",
                        whiteSpace: "nowrap",
                        backgroundColor: "transparent",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                      },
                    }
                  : { ...getStylesForPage(CurrentPage.AI_Strategies) }
            }
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
          >
            <div style={{ position: "relative", marginRight: 10 }}>
              <span
                onClick={() => {
                  navigate("/strategy");
                }}
              >
                AI Strategies{" "}
              </span>

              {isAuthenticated && (
                <>
                  <span>
                    {isDropdownOpen ? (
                      <KeyboardArrowUpIcon
                        style={
                          windowSize > 1160
                            ? {
                                position: "absolute",
                                top: 0,
                                right: -25 + "px",
                              }
                            : {
                                position: "absolute",
                                top: -3,
                                right: -25 + "px",
                              }
                        }
                      />
                    ) : (
                      <KeyboardArrowDownIcon
                        style={
                          windowSize > 1160
                            ? {
                                position: "absolute",
                                top: 0,
                                right: -25 + "px",
                              }
                            : {
                                position: "absolute",
                                top: -3,
                                right: -25 + "px",
                              }
                        }
                      />
                    )}
                  </span>
                  {isDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 1000,
                        background: "transparent",
                        display: "flex",
                        width: 300,
                        paddingTop: 25,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          background: "#FFFFFF",
                          width: "100%",
                          padding: "10px",
                          borderRadius: 5,
                          border: "2px solid #eee",
                          gap: 5,
                        }}
                      >
                        <div
                          onClick={() => {
                            navigate("/live-today");
                          }}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <KeyboardDoubleArrowRightIcon />
                          <div style={{ textDecoration: "none" }}>
                            Live today
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div
            style={
              windowSize <= 1160 && windowSize > 1000
                ? {
                    ...getStylesForPage(CurrentPage.Market_News),
                    ...{ fontSize: "11px", whiteSpace: "nowrap" },
                  }
                : windowSize <= 1000
                  ? {
                      ...getStylesForPage(CurrentPage.Market_News),
                      ...{
                        fontSize: "11px",
                        whiteSpace: "nowrap",
                        backgroundColor: "transparent",
                        border: "none",
                      },
                    }
                  : { ...getStylesForPage(CurrentPage.Market_News) }
            }
            onClick={() => {
              navigate("/market-news");
            }}
          >
            Market news
          </div>
          <div
            style={
              windowSize <= 1160 && windowSize > 1000
                ? {
                    ...getStylesForPage(CurrentPage.Learn),
                    ...{ fontSize: "11px", whiteSpace: "nowrap" },
                  }
                : windowSize <= 1000
                  ? {
                      ...getStylesForPage(CurrentPage.Learn),
                      ...{
                        fontSize: "11px",
                        whiteSpace: "nowrap",
                        backgroundColor: "transparent",
                        border: "none",
                      },
                    }
                  : { ...getStylesForPage(CurrentPage.Learn) }
            }
            onClick={() => {
              navigate("/learn-more-about-leaderboard");
            }}
          >
            Learn
          </div>
          <div
            style={
              windowSize <= 1160 && windowSize > 1000
                ? {
                    ...getStylesForPage(CurrentPage.Pricing),
                    ...{ fontSize: "11px", whiteSpace: "nowrap" },
                  }
                : windowSize <= 1000
                  ? {
                      ...getStylesForPage(CurrentPage.Pricing),
                      ...{
                        fontSize: "11px",
                        whiteSpace: "nowrap",
                        backgroundColor: "transparent",
                        border: "none",
                      },
                    }
                  : { ...getStylesForPage(CurrentPage.Pricing) }
            }
            onClick={() => {
              setSelectedSectionIndex(3);
              navigate("/profile/pricing");
            }}
          >
            Pricing
          </div>
          <div
            style={
              windowSize <= 1160 && windowSize > 1000
                ? {
                    ...getStylesForPage(CurrentPage.Leaderboard),
                    ...{ fontSize: "11px", whiteSpace: "nowrap" },
                  }
                : windowSize <= 1000
                  ? {
                      ...getStylesForPage(CurrentPage.Leaderboard),
                      ...{
                        fontSize: "11px",
                        whiteSpace: "nowrap",
                        backgroundColor: "transparent",
                        border: "none",
                      },
                    }
                  : { ...getStylesForPage(CurrentPage.Leaderboard) }
            }
            onClick={() => {
              navigate("/leaderboard");
            }}
          >
            Leaderboard
          </div>
        </div>
      )}
      {getButtonType()}
    </header>
  );
}

const styles = {
  buttonIcon: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.h2,
    margin: "auto",
  },
  menuIconContainer: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: {
    color: Theme.colors.black,
    fontSize: Theme.fontSizes.h1,
    margin: "auto",
  },
  headerStyle: {
    backgroundColor: Theme.colors.white,
    color: "#fff",
    display: "flex",
    borderBottom: `2px solid ${Theme.colors.whiteGrey}`,
    justifyContent: "space-between",
  },
  centerContainer: {
    flex: 1,
    textAlign: "left" as "left",
    paddingLeft: Theme.gapSmall,
    marginTop: Theme.gapTiny,
    color: Theme.colors.black70,
    display: "flex",
    height: "100%",
    alignItems: "center",
    fontSize: Theme.fontSizes.h4,
    flexDirection: "row" as "row",
  },
  leftContainerResponsiveStyle: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: Theme.responsiveNavBarHorizondalGap,
    paddingRight: Theme.responsiveNavBarHorizondalGap,
  },
  leftContainerStyle: {
    textAlign: "center" as "center",
    margin: "auto",
    width: Theme.navBarWidth,
  },
  logoContainerStyle: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    gap: "16px",
    justifyContent: "center",
  },
  centerTab: {
    display: "block",
    cursor: "pointer",
    fontWeight: Theme.fontWeight.semiBold,
    padding: Theme.gapSmall,
    paddingTop: Theme.gapTiny,
  },
  highlightTab: {
    backgroundColor: Theme.colors.yellow,
    borderTop: `1px solid ${Theme.colors.blueSolid}`,
    borderLeft: `1px solid ${Theme.colors.blueSolid}`,
    borderRight: `1px solid ${Theme.colors.blueSolid}`,
    color: Theme.colors.blueSolid,
  },
  rightContainerResponsiveStyle: {
    display: "flex" as "flex",
    alignItems: "center" as "center",
    cursor: "pointer",
    backgroundColor: Theme.colors.blueSolid,
    borderRadius: Theme.borderRadius,
    padding: "6px 10px",
  },
  rightContainerStyle: {
    textAlign: "center" as "center",
    display: "flex" as "flex",
    alignItems: "center" as "center",
    cursor: "pointer",
    backgroundColor: Theme.colors.blueSolid,
    borderRadius: Theme.borderRadius,
    padding: Theme.gapTiny,
    margin: `auto ${Theme.gapSmall}`,
  },
  profileImageResponsiveStyle: {
    height: "24px",
    paddingTop: Theme.responsiveLogoTopNavBarGap,
    paddingBottom: Theme.responsiveLogoBottomNavBarGap,
  },
  profileImageStyle: {
    width: Theme.logoWidthNavBar,
    paddingLeft: Theme.logoWidthNavBarGap,
    paddingRight: Theme.logoWidthNavBarGap,
  },
  profileNameResponsiveStyle: {
    fontSize: Theme.fontSizes.h5,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.white,
  },
  profileNameStyle: {
    fontSize: Theme.fontSizes.h4,
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.medium,
    paddingRight: Theme.gapSmall,
    paddingLeft: Theme.gapSmall,
  },
};

export default Header;
