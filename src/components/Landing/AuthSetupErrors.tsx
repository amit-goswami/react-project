import React from "react";
import { Theme } from "../../Utils/Constants";
import CountdownTimer from "./CountdownTimer";

export class LandingPagesEnums {
  static readonly LOGIN = "LOGIN";
  static readonly SIGNUP = "SIGNUP";
  static readonly FORGOT_PASSWORD = "FORGOT_PASSWORD";
  static readonly OTP_VALIDATION = "OTP_VALIDATION";
  static readonly PASSWORD_RESET = "PASSWORD_RESET";
}

interface AuthSetupErrorsProps {
  errorMessage: string;
  setCurrentPage: (page: string) => void;
  resendPassword: () => void;
  setErrorMessage: (message: string) => void;
  setShowCountdown: (showCountdown: boolean) => void;
}

const AuthSetupErrors: React.FC<AuthSetupErrorsProps> = ({
  errorMessage,
  setCurrentPage,
  resendPassword,
  setErrorMessage,
  setShowCountdown,
}) => {
  const passwordForgottenError = (
    <p style={styles.errorMessage}>
      Wrong Password. Try
      <span
        style={styles.linkLine}
        onClick={() => setCurrentPage(LandingPagesEnums.FORGOT_PASSWORD)}
      >
        {" "}
        Password Reset
      </span>
    </p>
  );

  const noActiveAccountFoundError = (
    <p style={styles.errorMessage}>
      Account not found, please
      <span
        style={styles.linkLine}
        onClick={() => setCurrentPage(LandingPagesEnums.SIGNUP)}
      >
        {" "}
        Sign up
      </span>
      .
    </p>
  );
  const passwordMismatchError = (
    <p style={styles.errorMessage}>Passwords do not match. Please try again.</p>
  );
  const userAlreadyExistsError = (
    <p style={styles.errorMessage}>
      User already exists. Please try{" "}
      <span
        style={styles.linkLine}
        onClick={() => setCurrentPage(LandingPagesEnums.LOGIN)}
      >
        {" "}
        Login!
      </span>
      .
    </p>
  );
  const retrySendingPassword = (
    <p style={styles.errorMessage}>
      Didn't receive password?{" "}
      <span style={styles.linkLine} onClick={() => resendPassword()}>
        {" "}
        Resend it!
      </span>
      .
    </p>
  );
  const userPhoneAlreadyExistsError = (
    <p style={styles.errorMessage}>
      Phone number already associated with a different user.
    </p>
  );
  const wrongOTPError = <p style={styles.errorMessage}>Incorrect OTP</p>;

  function passwordRetryTimer() {
    return (
      <p style={styles.errorMessage}>
        OTP sent. You can retry in{" "}
        <CountdownTimer
          countdownComplete={() => {
            setShowCountdown(false);
            setErrorMessage("OTP_RESEND_MESSAGE");
          }}
        />
      </p>
    );
  }

  function renderLoginErrorMessage() {
    if (errorMessage === "CREDENTIALS_INVALID") {
      return passwordForgottenError;
    } else if (errorMessage === "OTP_INCORRECT") {
      return wrongOTPError;
    } else if (errorMessage === "NO_ACTIVE_ACCOUNT") {
      return noActiveAccountFoundError;
    } else if (errorMessage === "PASSWORD_MISMATCH") {
      return passwordMismatchError;
    } else if (errorMessage === "PHONE_NUMBER_ALREADY_EXISTS") {
      return userPhoneAlreadyExistsError;
    } else if (errorMessage === "EMAIL_ALREADY_EXISTS") {
      return userAlreadyExistsError;
    } else if (errorMessage === "USER_NOT_FOUND") {
      return noActiveAccountFoundError;
    } else if (errorMessage === "OTP_VALIDATION_COUNTDOWN") {
      return passwordRetryTimer();
    } else if (errorMessage === "OTP_RESEND_MESSAGE") {
      return retrySendingPassword;
    } else {
      return null;
    }
  }

  return renderLoginErrorMessage();
};

const styles = {
  errorMessage: {
    color: Theme.colors.white75,
    fontSize: Theme.fontSizes.h6,
    margin: "0 6pt",
  },
  linkLine: {
    color: Theme.colors.yellow,
    display: "inline",
    cursor: "pointer",
  },
};

export default AuthSetupErrors;
