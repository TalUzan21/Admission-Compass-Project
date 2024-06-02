import React from "react";
import Description from "./Description";
import MainData from "./MainData";
import Form from "./Form";

const Search: React.FC = () => {
  return (
    <div>
      <Description
        text="Discover a range of admission requirements"
        text2="If you already have a particular school in mind, search by schools to see their available degrees.
      If you know which degree you want but unsure about which school, search by fields of study. Or search based on your academic performance, and discover schools and degrees aligned with your grades."
      />

      <div className="outer">
        <Form></Form>
      </div>
    </div>
  );
};

export default Search;
