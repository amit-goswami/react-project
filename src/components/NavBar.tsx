import React, { useMemo, useState } from "react";
import { Theme } from "../Utils/Constants";
import { AuthModule } from "../API/Auth";
import StarIcon from "@mui/icons-material/Star";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Twitter from "@mui/icons-material/Twitter";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import YouTube from "@mui/icons-material/YouTube";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";

const NavBar: React.FC = () => {
  useMemo(() => {
    AuthModule.getInstance()
      .getAboutMe()
      .then((res) => {
        setProfileName(res.name);
        return res;
      })
      .catch((err) => {
        console.error("error from navBar", err);
      });
  }, []);

  const [profileName, setProfileName] = useState("");
  const [isSection1Open, setIsSection1Open] = useState(false);
  const [isSection2Open, setIsSection2Open] = useState(false);

  const toggleSection1 = () => {
    // setIsSection1Open(!isSection1Open);
  };

  const toggleSection2 = () => {
    setIsSection2Open(!isSection2Open);
  };

  return (
    <div style={styles.container}>
      <img
        src="./images/profilePic.jpg"
        alt="logo"
        style={styles.profileImageStyle}
      />
      <p style={styles.profileName}>
        {profileName ? profileName : "Profile Name"}
      </p>
      <div style={styles.ratingCont}>
        <p style={styles.rating}>
          <span style={styles.ratingText}>Beginner</span>
          <StarIcon style={styles.ratingIcon} />
          <span style={{ paddingLeft: Theme.gapTiny }}>1</span>
        </p>
      </div>

      <div style={styles.borderTop}>
        <p onClick={toggleSection1} style={styles.collapseHeader}>
          <AssessmentIcon style={{ paddingRight: Theme.gapTiny }} />
          Your Stats
          {isSection1Open ? (
            <KeyboardArrowUpIcon style={styles.collapseButtonIcon} />
          ) : (
            <KeyboardArrowDownIcon style={styles.collapseButtonIcon} />
          )}
        </p>
        {isSection1Open && (
          <div>
            <p>Content of Section 1</p>
          </div>
        )}
      </div>

      <div>
        <p onClick={toggleSection2} style={styles.collapseHeader}>
          <BookmarkIcon style={{ paddingRight: Theme.gapTiny }} /> Saved
          BackTests
          {isSection2Open ? (
            <KeyboardArrowUpIcon style={styles.collapseButtonIcon} />
          ) : (
            <KeyboardArrowDownIcon style={styles.collapseButtonIcon} />
          )}
        </p>
        {isSection2Open && (
          <div style={styles.backTestList}>
            <p>BackTest1</p>
            <p>BackTest2</p>
            <p>BackTest2</p>
          </div>
        )}
      </div>

      <div style={styles.noticeContainer}>
        <div style={styles.notices}>
          <p style={styles.noticeHeader}>Social Proofing</p>
          <div style={styles.noticeDescription}>
            <MobileScreenShareIcon />
            <p>100 users are now using moneyy.ai now.</p>
          </div>
        </div>
      </div>

      <div style={styles.socialDiv}>
        <div style={styles.socialList}>
          <Facebook style={styles.socialIcon} />
          <Instagram style={styles.socialIcon} />
          <Twitter style={styles.socialIcon} />
          <YouTube style={styles.socialIcon} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  noticeContainer: {
    margin: Theme.gapLarge,
    borderRadius: Theme.borderRadiusLarge,
  },
  noticeHeader: {
    paddingTop: Theme.gapSmall,
    fontSize: Theme.fontSizes.h5,
  },
  notices: {
    backgroundColor: Theme.colors.yellow,
    borderRadius: Theme.borderRadiusLarge,
  },
  noticeDescription: {
    paddingTop: Theme.gapSmall,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadiusLarge,
    boxShadow: `0px -1px 5px 0px ${Theme.colors.whiteGrey70}`,
    fontSize: Theme.fontSizes.h5,
    minHeight: "128px",
  },
  backTestList: {
    color: Theme.colors.white,
  },
  socialIcon: {
    color: Theme.colors.blueSolid,
    fontSize: Theme.fontSizes.h2,
  },
  socialList: {
    display: "flex",
    justifyContent: "space-around",
    paddingTop: Theme.gapSmall,
    paddingBottom: Theme.gapSmall,
  },
  collapseButtonIcon: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.h2,
    margin: "auto 0 auto auto",
    alignItems: "right",
  },
  socialDiv: {
    position: "fixed" as const,
    bottom: "0px",
    width: Theme.navBarWidth,
    backgroundColor: Theme.colors.white,
  },
  collapseHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.h5,
    padding: Theme.gapTiny,
    margin: 0,
    backgroundColor: Theme.colors.blueSolid,
    borderBottom: `1px solid ${Theme.colors.white}34`,
    textAlign: "left" as const,
  },
  borderTop: {
    marginTop: Theme.gapSmall,
    borderTop: `1px solid ${Theme.colors.white}34`,
  },
  ratingCont: {
    margin: "auto",
    width: "fit-content",
    padding: Theme.gapTiny,
  },
  ratingIcon: {
    paddingLeft: Theme.gapTiny,
    color: Theme.colors.blueSolid,
    width: Theme.fontSizes.h4,
  },
  rating: {
    margin: "auto",
    borderRadius: Theme.borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: Theme.fontSizes.h6,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: Theme.gapTiny,
    paddingRight: Theme.gapTiny,
    backgroundColor: Theme.colors.yellow,
  },
  ratingText: {
    fontSize: Theme.fontSizes.h6,
    borderRight: `1px solid ${Theme.colors.black70}`,
    paddingRight: Theme.gapTiny,
  },
  profileName: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.h4,
    fontWeight: Theme.fontWeight.semiBold,
    padding: Theme.gapSmall,
    margin: 0,
  },
  profileImageStyle: {
    width: Theme.profileImageWidth,
    height: Theme.profileImageWidth,
    border: "1px solid white",
    borderRadius: Theme.borderRadius,
  },
  container: {
    paddingTop: Theme.gapLarge,
    textAlign: "center" as const,
    alignItems: "center" as const,
    width: "100%",
    height: "100%",
    backgroundColor: Theme.colors.blueSolid,
  },
};

export default NavBar;
