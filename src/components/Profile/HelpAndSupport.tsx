import React, { useState } from "react";
import Support from "../support/Support";
import Accordion from "./FAQAccordion";

const HelpAndSupport: React.FC = () => {
  const [fAQs, setFAQs] = useState<boolean>(false);
  const items:any = [
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension for JavaScript used with React to describe what the UI should look like.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
      answer:
        "JSX is a syntax extension for JavaScript used with React to describe what the UI should look like.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
      answer:
        "JSX is a syntax extension for JavaScript used with React to describe what the UI should look like.",
    },
    // Add more items as needed
  ];
  const handleShowFAQs = () => {
    setFAQs(true);
  };

  return fAQs ? (
    <div>
      <h1>FAQs</h1>
      <Accordion items={items} />
    </div>
  ) : (
    <Support setShowFAQs={handleShowFAQs} />
  );
};

export default HelpAndSupport;
