// Description.tsx
import React from "react";
import "./Description.css";

interface DescriptionProps {
  text: string;
  text2: string;
}

const Description: React.FC<DescriptionProps> = ({ text, text2 }) => {
  return (
    <div className="description-strip">
      <p>{text}</p>
      <p className="small">{text2}</p>
    </div>
  );
};

export default Description;
