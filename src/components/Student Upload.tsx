import React from "react";
import Description from "./Description";
import StudentUploadForm from "./StudentUploadForm";
import "./Form.css";
import "./Student Upload.css";

const studentUpload: React.FC = () => {
  return (
    <div>
      <Description
        text="Share your academic success story"
        text2="There are so many academic qualifications that can secure a spot into college, and we're here to reveal the various ways to acceptance.
        So share your academic achievements that helped you get into your school, and help future students planning their academic journey.
        Rest assured, all contributions will remain anonymous.
      "
      />
      <div className="outer">
        <div className="outer4">
          <StudentUploadForm></StudentUploadForm>
        </div>
      </div>
    </div>
  );
};

export default studentUpload;
