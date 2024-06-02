import React from "react";
import "./MainData.css";

interface MainDataProps {
  h1: string;
  text1: React.ReactNode;
  h2: string;
  text2: React.ReactNode;
}

const MainData: React.FC<MainDataProps> = ({ h1, text1, h2, text2 }) => {
  return (
    <div className="outer">
      <div className="MainData-strip">
        <h1>{h1}</h1>
        <p>{text1}</p>
      </div>
      <div className="MainData-strip">
        <h1>{h2}</h1>
        <p>{text2}</p>
      </div>
    </div>
  );
};

export default MainData;
