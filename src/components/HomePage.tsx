import React, { useMemo, useState } from "react";
import { AuthModule, ResultsAPIModule } from "../API";
import ResultsPage from "./Results/ResultsPage";
import InputsPage, { IInputsPageResult } from "./StrategyInputs/InputsPage";
import Header, { CurrentPage } from "./Header/Header";
import { Theme } from "../Utils/Constants";
import { convertTestInputsTypes } from "../Utils/Converters";
import TestResultsParser from "../Utils/TestResultsParser";
import { BackTestAPIResponse } from "../API/API.interface";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import LoaderDialog from "./Dialogs/LoaderDialog";
import { Samples } from "../API/samples";
import { set } from "date-fns";

enum HomePageStep {
  Inputs,
  Loading,
  Results,
  Error,
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  useMemo(() => {
    AuthModule.getInstance()
      .isAuthenticated()
      .then((isAuthenticated) => {
        setIsAuthenticated(isAuthenticated);
      })
      .catch((error) => {
        setIsAuthenticated(false);
      });
  }, []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputs, setInputs] = useState<IInputsPageResult>(null as any);
  const [step, setStep] = useState<HomePageStep>(HomePageStep.Inputs);
  const [results, setResults] = useState<TestResultsParser>(null as any);
  const [error, setError] = useState<string>("" as any);

  const onInputsChanged = (strategy: IInputsPageResult) => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
    setInputs(strategy);
    setStep(HomePageStep.Loading);
  };

  useMemo(() => {
    if (inputs === null) {
      return;
    }
    const dataObj = convertTestInputsTypes(inputs);
    console.log("Inputs changed", dataObj);
    setStep(HomePageStep.Loading);
    new ResultsAPIModule()
      .getResults(dataObj)
      .then(async (res) => {
        const response = await res?.json();
        if (res?.status === 200) {
          showResults(response as BackTestAPIResponse);
        } else {
          setStep(HomePageStep.Error);
          setError("Error processing the test results. Try again.");
        }
      })
      .catch((err) => {
        setStep(HomePageStep.Inputs);
        console.log(err);
      });
  }, [inputs]);

  function showResults(results: BackTestAPIResponse) {
    setStep(HomePageStep.Results);
    const optionsParse = new TestResultsParser(results);
    setResults(optionsParse);
  }

  // useMemo(() => {
  //   setTimeout(() => {
  //     showResults(Samples.successResponse as any);
  //   }, 1000);
  // }, [inputs]);

  return (
    <>
      <Header currentPage={CurrentPage.BackTesting} />
      <div style={styles.container}>
        {isAuthenticated && (
          <div style={styles.navBar}>
            <NavBar />
          </div>
        )}
        <div>
          <div style={styles.fullPageContainer}>
            <InputsPage
              onInputsChanged={onInputsChanged}
              isLoading={step === HomePageStep.Loading}
              showPrintButton={step === HomePageStep.Results}
            />
            {step === HomePageStep.Loading && <LoaderDialog />}
            {step === HomePageStep.Results && <ResultsPage results={results} />}
            {step === HomePageStep.Error && (
              <div style={{ color: "red" }}>{error}</div>
            )}
          </div>
          <div
            style={{
              backgroundColor: Theme.colors.backgroundF3,
              paddingTop: Theme.gapLarge,
            }}
          >
            <Footer />
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
  },
};

export default HomePage;
