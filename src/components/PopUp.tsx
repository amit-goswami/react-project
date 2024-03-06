import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Styles } from "../Utils/Constants";
interface PopupProps {
  message: string;
}

const Popup: React.FC<PopupProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className="flex-center kill-switch-popup"
      style={{
        display: isVisible ? "block" : "none",
        padding: "15px",
        border: "1px solid #ccc",
        position: "fixed",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        zIndex: 999,
        borderRadius: "8px",
      }}
    >
      <span style={Styles.h3Text}>{message}</span>
    </div>
  );
};

export const showPopUpMessage = (message: string) => {
  const popupElement = document.createElement("div");
  document.body.appendChild(popupElement);

  const closePopup = () => {
    ReactDOM.unmountComponentAtNode(popupElement);
    popupElement.remove();
  };

  ReactDOM.render(<Popup message={message} />, popupElement);

  setTimeout(() => {
    closePopup();
  }, 3000);
};
