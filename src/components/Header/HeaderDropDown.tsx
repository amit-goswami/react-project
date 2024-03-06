import React, { useRef } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Theme } from "../../Utils/Constants";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {
  ArticleOutlined,
  DescriptionOutlined,
  SubscriptionsOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAppStore from "../../store/app.store";
import useOutside from "../../hooks/useOutSide";

interface HeaderDropDownProps {
  onSignOut: () => void;
  setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderDropDown: React.FC<HeaderDropDownProps> = ({
  onSignOut,
  setDropdownVisible,
}) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { setSelectedSectionIndex } = useAppStore();

  function handleSignOut() {
    onSignOut();
  }

  useOutside(containerRef, () => {
    setDropdownVisible(false);
  });

  return (
    <div style={styles.dropdownStyle} ref={containerRef}>
      <div
        style={styles.dropDownItem}
        onClick={() => {
          setSelectedSectionIndex(0);
          navigate("/profile", { replace: true });
        }}
      >
        <PersonOutlineIcon style={styles.icon} />
        <span>Profile</span>
      </div>
      <div
        style={styles.dropDownItem}
        onClick={() => {
          navigate("/subscription", { replace: false });
        }}
      >
        <SubscriptionsOutlined style={styles.icon} />
        <span>My Subscription</span>
      </div>
      <div style={styles.dropDownItem}>
        <DescriptionOutlined style={styles.icon} />
        <span>Broker</span>
      </div>
      <div style={styles.dropDownItem}>
        <OfflineBoltOutlinedIcon style={styles.icon} />
        <span>Plan & Pricing</span>
      </div>
      <div
        style={styles.dropDownItem}
        onClick={() => {
          navigate("/strategy", { replace: true });
        }}
      >
        <TimelineOutlinedIcon style={styles.icon} />
        <span>Strategy P&L</span>
      </div>
      <div style={styles.dropDownItem}>
        <ArticleOutlined style={styles.icon} />
        <span>Help & Support</span>
      </div>
      <div style={styles.dropDownItem} onClick={handleSignOut}>
        <PowerSettingsNewIcon style={styles.icon} />
        <span>Logout</span>
      </div>
    </div>
  );
};

const styles = {
  icon: {
    marginRight: Theme.gapSmall,
  },
  dropDownItem: {
    display: "flex",
    cursor: "pointer",
    fontSize: Theme.fontSizes.h5,
    paddingTop: Theme.gapTiny,
  },
  dropdownStyle: {
    position: "absolute" as "absolute",
    zIndex: 99999,
    top: "64px",
    right: "20px",
    backgroundColor: "#fff",
    color: "#000",
    padding: Theme.gapTiny,
    borderRadius: "5px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
  },
};

export default HeaderDropDown;
