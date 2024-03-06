import React, { useMemo, useState } from "react";
import { AuthModule } from "../../API/Auth";
import { useNavigate } from "react-router-dom";
import { Theme, ThemeTypes } from "../../Utils/Constants";
import AuthSetupErrors, { LandingPagesEnums } from "./AuthSetupErrors";

const AuthSetupPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPageInt] = useState(LandingPagesEnums.LOGIN);
  const [showCountdown, setShowCountdown] = useState(false);

  useMemo(() => {
    AuthModule.getInstance()
      .isAuthenticated()
      .then((isAuthenticated) => {
        if (!isAuthenticated) {
          navigate("/home", { replace: true });
        }
      })
      .catch((error) => {
        console.error("error from login page", error);
      });
  }, [navigate]);

  async function sendResetValidationOTP(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    if (password !== rePassword) {
      setErrorMessage("PASSWORD_MISMATCH");
      return;
    }
    await AuthModule.getInstance()
      .completeSignUp(emailId, otp, password)
      .then((data) => {
        console.log("Signup successful", data);
        navigate("/backtesting", { replace: true });
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }

  async function resendPassword() {
    await AuthModule.getInstance()
      .sendOTP(emailId, password, phoneNumber, name, false, true)
      .then((data) => {
        console.log("OTP sent successfully", data);
        setCurrentPage(LandingPagesEnums.OTP_VALIDATION);
      })
      .catch((error) => {
        console.log("error from login page", error);
        setErrorMessage(error);
      });
  }

  async function validateOTP(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await AuthModule.getInstance()
      .completeSignUp(emailId, otp, null)
      .then((data) => {
        console.log("Signup successful", data);
        navigate("/backtesting", { replace: true });
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }

  async function sendValidationOTP(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== rePassword) {
      setErrorMessage("PASSWORD_MISMATCH");
      return;
    }
    await AuthModule.getInstance()
      .sendOTP(emailId, password, phoneNumber, name)
      .then((data) => {
        console.log("OTP sent successfully", data);
        setCurrentPage(LandingPagesEnums.OTP_VALIDATION);
      })
      .catch((error) => {
        console.log("error from login page", error);
        setErrorMessage(error);
      });
  }

  async function sendForgotPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await AuthModule.getInstance()
      .sendOTP(emailId, password, phoneNumber, name, true)
      .then((data) => {
        console.log("OTP sent successfully", data);
        setCurrentPage(LandingPagesEnums.PASSWORD_RESET);
      })
      .catch((error) => {
        console.log("error from login page", error);
        setErrorMessage(error);
      });
  }

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await AuthModule.getInstance()
      .performLogin(emailId, password)
      .then((data) => {
        navigate("/backtesting", { replace: true });
      })
      .catch((error) => {
        console.error("error from login page", error);
        if (error === "CREDENTIALS_INVALID") {
          setErrorMessage("CREDENTIALS_INVALID");
        } else if (error === "NO_ACTIVE_ACCOUNT") {
          setErrorMessage("NO_ACTIVE_ACCOUNT");
        }
      });
  };

  function setCurrentPage(page: string) {
    setCurrentPageInt(page);
    setErrorMessage("");
    if (page === LandingPagesEnums.SIGNUP) {
      setPassword("");
    } else if (page === LandingPagesEnums.OTP_VALIDATION) {
      setErrorMessage("OTP_VALIDATION_COUNTDOWN");
      setShowCountdown(true);
    }
  }

  function renderSignUp() {
    return (
      <div>
        <div style={styles.headerButtons}>
          <button
            style={styles.headerButtonUnselected}
            onClick={() => setCurrentPage(LandingPagesEnums.LOGIN)}
          >
            Login
          </button>
          <button style={styles.headerButton}>SignUp</button>
        </div>
        <form onSubmit={sendValidationOTP}>
          <div className="container-flex-column">
            <input
              style={styles.inputElement}
              type="email"
              placeholder="hi@moneyy.ai"
              value={emailId}
              onChange={(event) => setEmailId(event.target.value)}
              required
            />
            <input
              style={styles.inputElement}
              type="text"
              placeholder="994949xxxx"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
            />
            <input
              style={styles.inputElement}
              type="text"
              placeholder="Name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <input
              style={styles.inputElement}
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <input
              style={styles.inputElement}
              type="password"
              placeholder="Re-enter password"
              autoComplete="new-password"
              value={rePassword}
              onChange={(event) => setRePassword(event.target.value)}
              required
            />
          </div>
          {renderLoginErrorMessage()}
          <div style={styles.loginButtonBox}>
            <button
              type="submit"
              style={{ ...ThemeTypes.yellowButton, margin: "0 auto" }}
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    );
  }

  function renderGoBackToLoginLink() {
    return (
      <div style={styles.warningLine}>
        Have an account already?
        <p
          style={styles.linkLine}
          onClick={() => setCurrentPage(LandingPagesEnums.LOGIN)}
        >
          Login!
        </p>
      </div>
    );
  }

  function renderOtpValidation(): React.ReactNode {
    return (
      <div>
        <p style={styles.pageHeader}>Activate</p>
        {renderGoBackToLoginLink()}
        <form onSubmit={validateOTP}>
          <div className="container-flex-column">
            <input
              style={styles.inputElement}
              value={phoneNumber}
              disabled={true}
            />
            <input
              style={styles.inputElement}
              value={emailId}
              disabled={true}
            />
            <input
              style={styles.inputElement}
              type="number"
              placeholder="OTP"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              required
            />
          </div>
          {renderLoginErrorMessage()}
          <button type="submit">Validate</button>
        </form>
      </div>
    );
  }

  function renderLogin() {
    return (
      <div>
        <div style={styles.headerButtons}>
          <button style={styles.headerButton}>Login</button>
          <button
            style={styles.headerButtonUnselected}
            onClick={() => setCurrentPage(LandingPagesEnums.SIGNUP)}
          >
            SignUp
          </button>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <div style={styles.inputCont}>
            <input
              type="email"
              style={styles.inputElement}
              placeholder="hi@moneyy.ai"
              autoComplete="username"
              value={emailId}
              onChange={(event) => setEmailId(event.target.value)}
              required
            />
          </div>
          <div style={styles.inputCont}>
            <input
              type="password"
              style={styles.inputElement}
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {renderLoginErrorMessage()}
          <div style={styles.loginButtonBox}>
            <button
              type="submit"
              style={{ ...ThemeTypes.yellowButton, margin: "0 auto" }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  function renderPasswordResetValidate() {
    return (
      <div>
        <p style={styles.pageHeader}>Password Reset</p>
        {renderGoBackToLoginLink()}
        <form onSubmit={sendResetValidationOTP}>
          <div className="container-flex-column">
            <input
              style={styles.inputElement}
              type="email"
              placeholder="hi@moneyy.ai"
              value={emailId}
              onChange={(event) => setEmailId(event.target.value)}
              disabled={true}
            />
            <input
              style={styles.inputElement}
              type="number"
              placeholder="OTP"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              required
            />
            <input
              style={styles.inputElement}
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <input
              style={styles.inputElement}
              type="password"
              placeholder="Re-enter password"
              autoComplete="new-password"
              value={rePassword}
              onChange={(event) => setRePassword(event.target.value)}
              required
            />
          </div>
          {renderLoginErrorMessage()}
          <button type="submit">Reset</button>
        </form>
      </div>
    );
  }

  function renderPasswordReset() {
    return (
      <div>
        <p style={styles.pageHeader}>Password Reset</p>
        {renderGoBackToLoginLink()}
        <form onSubmit={sendForgotPassword}>
          <div style={styles.inputCont}>
            <input
              type="email"
              style={styles.inputElement}
              placeholder="hi@moneyy.ai"
              autoComplete="username"
              value={emailId}
              onChange={(event) => setEmailId(event.target.value)}
              required
            />
          </div>
          {renderLoginErrorMessage()}
          <button type="submit">Send OTP</button>
        </form>
      </div>
    );
  }

  function renderLoginErrorMessage() {
    return (
      <AuthSetupErrors
        errorMessage={errorMessage}
        setCurrentPage={setCurrentPage}
        resendPassword={resendPassword}
        setErrorMessage={setErrorMessage}
        setShowCountdown={setShowCountdown}
      />
    );
  }

  function getAuthSetupPage() {
    switch (currentPage) {
      case LandingPagesEnums.LOGIN:
        return renderLogin();
      case LandingPagesEnums.SIGNUP:
        return renderSignUp();
      case LandingPagesEnums.OTP_VALIDATION:
        return renderOtpValidation();
      case LandingPagesEnums.FORGOT_PASSWORD:
        return renderPasswordReset();
      case LandingPagesEnums.PASSWORD_RESET:
        return renderPasswordResetValidate();
      default:
        return renderLogin();
    }
  }

  return <>{getAuthSetupPage()}</>;
};

const styles = {
  headerButton: {
    ...ThemeTypes.yellowButton,
    borderRadius: 0,
    margin: 0,
    backgroundColor: Theme.colors.yellow,
    color: Theme.colors.black,
    border: "1px solid " + Theme.colors.yellow,
    paddingLeft: Theme.gapLarge,
    paddingRight: Theme.gapLarge,
  },
  headerButtonUnselected: {
    ...ThemeTypes.yellowButton,
    borderRadius: 0,
    paddingLeft: Theme.gapLarge,
    paddingRight: Theme.gapLarge,
    margin: 0,
    border: "1px solid " + Theme.colors.yellow,
    backgroundColor: Theme.colors.blueSolid,
    color: Theme.colors.yellow,
  },
  headerButtons: {
    display: "flex",
    flex: "row",
    justifyContent: "center",
    marginBottom: Theme.gapLarge,
  },
  loginButtonBox: {
    marginTop: Theme.gapLarge,
  },
  pageHeader: {
    fontSize: Theme.fontSizes.h2,
    margin: Theme.gapSmall,
  },
  landingPage: {
    backgroundColor: Theme.colors.blueSolid,
  },
  inputElement: {
    minWidth: "280px",
    minHeight: "28px",
  },
  warningLine: {
    color: Theme.greyColor,
    fontSize: Theme.fontSizes.h6,
    marginBottom: Theme.gapSmall,
  },
  loginBox: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius,
    margin: Theme.gapSmall,
    paddingTop: Theme.gapLarge,
    paddingBottom: Theme.gapLarge,
    flex: "1",
    justifyContent: "center",
  },
  bannerImage: {
    borderRadius: Theme.borderRadius,
    margin: Theme.gapSmall,
    flex: "1",
    width: "auto",
  },
  imageElement: {
    width: "100%",
    minWidth: "280px",
  },
  landingText: {
    color: Theme.colors.white,
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    flex: "row",
  },
  linkLine: {
    color: Theme.colors.blueSolid,
    display: "inline",
    cursor: "pointer",
  },
  inputCont: {
    display: "flex",
    justifyContent: "center" as const,
  },
};

export default AuthSetupPage;
