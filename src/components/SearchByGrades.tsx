import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface Course {
  ID: number;
  Name: string;
}

interface Degree {
  ID: number;
  Name: string;
}
interface Institution {
  ID: number;
  Name: string;
}
interface Type {
  TypeId: number;
  Type: string;
}

interface Grades {
  [key: string]: string | number;
  gradeEnglish: number;
  pointsEnglish: number;
  gradeLit: number;
  pointsLit: number;
  gradeMath: number;
  pointsMath: number;
  gradeTanach: number;
  pointsTanach: number;
  gradeCiv: number;
  pointsCiv: number;
  gradeHeb: number;
  pointsHeb: number;
  gradeHistory: number;
  pointsHistory: number;
  gradeHebAra: number;
  pointsHebAra: number;
  gradeArabic: number;
  pointsArabic: number;
  gradeSocial: number;
  pointsSocial: number;
  gradeHisDruze: number;
  pointsHisDruze: number;
  gradeHisArab: number;
  pointsHisArab: number;
  gradeJewish: number;
  pointsJewish: number;
  gradeElectives1: number;
  pointsElectives1: number;
  gradeElectives2: number;
  pointsElectives2: number;
  gradeElectives3: number;
  pointsElectives3: number;
  degreeCredits: number;
  degreeAverage: number;
  pscience: number;
  penglish: number;
  pmath: number;
  pphysics: number;
  gradeAcademic1: number;
  pointsAcademic1: number;
  gradeAcademic2: number;
  pointsAcademic2: number;
  gradeAcademic3: number;
  pointsAcademic3: number;
  gradeAcademic4: number;
  pointsAcademic4: number;
  gradeAcademic5: number;
  pointsAcademic5: number;
  gradeAcademic6: number;
  pointsAcademic6: number;
  overall: number;
  quant: number;
  verbal: number;
  english: number;
}

const SearchByGrades: React.FC = () => {
  const [isButtonBlue, setIsButtonBlue] = useState<boolean>(false);
  const [grades, setGrades] = useState<Grades>({
    gradeEnglish: 0,
    pointsEnglish: 0,
    gradeLit: 0,
    pointsLit: 0,
    gradeMath: 0,
    pointsMath: 0,
    gradeTanach: 0,
    pointsTanach: 0,
    gradeCiv: 0,
    pointsCiv: 0,
    gradeHeb: 0,
    pointsHeb: 0,
    gradeHistory: 0,
    pointsHistory: 0,
    gradeHebAra: 0,
    pointsHebAra: 0,
    gradeArabic: 0,
    pointsArabic: 0,
    gradeSocial: 0,
    pointsSocial: 0,
    gradeHisDruze: 0,
    pointsHisDruze: 0,
    gradeHisArab: 0,
    pointsHisArab: 0,
    gradeJewish: 0,
    pointsJewish: 0,
    gradeElectives1: 0,
    pointsElectives1: 0,
    gradeElectives2: 0,
    pointsElectives2: 0,
    gradeElectives3: 0,
    pointsElectives3: 0,
    gradeElectives4: 0,
    pointsElectives4: 0,
    gradeElectives5: 0,
    pointsElectives5: 0,
    gradeElectives6: 0,
    pointsElectives6: 0,
    degreeCredits: 0,
    degreeAverage: 0,
    pscience: 0,
    penglish: 0,
    pmath: 0,
    pphysics: 0,
    gradeAcademic1: 0,
    pointsAcademic1: 0,
    gradeAcademic2: 0,
    pointsAcademic2: 0,
    gradeAcademic3: 0,
    pointsAcademic3: 0,
    gradeAcademic4: 0,
    pointsAcademic4: 0,
    gradeAcademic5: 0,
    pointsAcademic5: 0,
    gradeAcademic6: 0,
    pointsAcademic6: 0,
    overall: 0,
    quant: 0,
    verbal: 0,
    english: 0,
  });

  const [electives, setElectives] = useState<number>(0);
  const [subjectElective1, setElective1] = useState<number>(0);
  const [subjectElective2, setElective2] = useState<number>(0);
  const [subjectElective3, setElective3] = useState<number>(0);
  const [subjectElective4, setElective4] = useState<number>(0);
  const [subjectElective5, setElective5] = useState<number>(0);
  const [subjectElective6, setElective6] = useState<number>(0);

  const [academics, setAcademics] = useState<number>(0);
  const [academicCourses, setAcademicCourses] = useState<Course[]>([]);

  const [courses, setCourses] = useState<Course[]>([]);

  const [selectedNameId, setSelectedNameId] = useState<number>(0);
  const [selectedDegreeId, setSelectedDegreeId] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<number>(0);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [names, setNames] = useState<Institution[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [rows, setRows] = useState<
    { degreeId: number; acceptedSchoolId: number; deniedSchoolId: number }[]
  >([{ degreeId: 0, acceptedSchoolId: 0, deniedSchoolId: 0 }]);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [showSpan, setShowSpan] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>(
          "http://localhost:8800/bagrutcourses"
        );
        setCourses(response.data);
      } catch (err) {
        console.error("Failed to fetch names:", err);
      }
    };

    const fetchAcademic = async () => {
      try {
        const response = await axios.get<Course[]>(
          "http://localhost:8800/academiccourses"
        );
        setAcademicCourses(response.data);
      } catch (err) {
        console.error("Failed to fetch names:", err);
      }
    };
    const fetchDegrees = async () => {
      try {
        const response = await axios.get<Degree[]>(
          "http://localhost:8800/degrees"
        );
        setDegrees(response.data);
      } catch (err) {
        console.error("Failed to fetch degrees:", err);
      }
    };
    const fetchNames = async () => {
      try {
        const response = await axios.get<Institution[]>(
          "http://localhost:8800/institution"
        );
        setNames(response.data);
      } catch (err) {
        console.error("Failed to fetch names:", err);
      }
    };
    const fetchTypes = async () => {
      try {
        const response = await axios.get<Type[]>(
          "http://localhost:8800/degrees/types"
        );
        setTypes(response.data);
      } catch (err) {
        console.error("Failed to fetch types:", err);
      }
    };

    fetchTypes();
    fetchNames();
    fetchDegrees();
    fetchAcademic();
    fetchCourses();
  }, []);
  useEffect(() => {
    console.log("Names:", names);
  }, [names]);

  useEffect(() => {
    console.log("Types:", types);
  }, [types]);

  useEffect(() => {
    console.log("Degrees:", degrees);
  }, [degrees]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    setGrades((prevGrades) => ({
      ...prevGrades,
      [name]: isNaN(numericValue) ? 0 : numericValue,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    setGrades((prevGrades) => ({
      ...prevGrades,
      [name]: isNaN(numericValue) ? 0 : numericValue,
    }));
  };

  const handleCourseChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const nameId = parseInt(e.target.value, 10);
    switch (index) {
      case 1:
        setElective1(nameId);
        break;
      case 2:
        setElective2(nameId);
        break;
      case 3:
        setElective3(nameId);
        break;
      case 4:
        setElective4(nameId);
        break;
      case 5:
        setElective5(nameId);
        break;
      case 6:
        setElective6(nameId);
        break;
      default:
        break;
    }
  };

  const handleAcademicChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const nameId = parseInt(e.target.value, 10);
    setGrades({
      ...grades,
      [`subjectAcademic${index}`]: nameId,
    });
  };

  const checkButtonColor = (nameId: number, type: number, degreeId: number) => {
    setIsButtonBlue(
      (nameId !== 0 && type !== 0) || (degreeId !== 0 && type !== 0)
    );
  };

  const handleNameChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nameId = parseInt(e.target.value, 10);
    setSelectedNameId(nameId);
    checkButtonColor(selectedNameId, selectedType, selectedDegreeId);
  };

  const handleDegreeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const degreeId = parseInt(e.target.value, 10);
    setSelectedDegreeId(degreeId);
    checkButtonColor(selectedNameId, selectedType, selectedDegreeId);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = parseInt(e.target.value, 10);
    setSelectedType(type);
    checkButtonColor(selectedNameId, selectedType, selectedDegreeId);
  };

  const handleAddCourse = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setElectives(electives + 1);
  };

  const handleAddAcademic = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setAcademics((prevAcademics) => Math.min(prevAcademics + 1, 6)); // Ensure a maximum of 6 academic courses
  };

  // Function to handle the 'Predict Acceptance' button click
  const handlePredictClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const url = "http://localhost:5000/predict";
    setIsLoading(true);

    const data = {
      englishGrade: grades.gradeEnglish,
      literatureGrade: grades.gradeLit,
      mathGrade: grades.gradeMath,
      tanachGrade: grades.gradeTanach,
      civicsGrade: grades.gradeCiv,
      hebrewGrade: grades.gradeHeb,
      historyGrade: grades.gradeHistory,
      hebrewForArabicSpeakersGrade: grades.gradeHebAra,
      arabicGrade: grades.gradeArabic,
      socialStudiesGrade: grades.gradeSocial,
      druzeChristianHistoryGrade: grades.gradeHisDruze,
      "historyOfArabs&IslamGrade": grades.gradeHisArab,
      judaicThoughtGrade: grades.gradeJewish,
      elective1Grade: grades.gradeElectives1,
      elective2Grade: grades.gradeElectives2,
      elective3Grade: grades.gradeElectives3,
      elective4Grade: grades.gradeElectives4,
      elective5Grade: grades.gradeElectives5,
      elective6Grade: grades.gradeElectives6,
      grade1: grades.gradeAcademic1,
      grade2: grades.gradeAcademic2,
      grade3: grades.gradeAcademic3,
      grade4: grades.gradeAcademic4,
      grade5: grades.gradeAcademic5,
      grade6: grades.gradeAcademic6,
      verbal_score: grades.verbal,
      english_score: grades.english,
      quantitative_score: grades.quant,
      degree_average: grades.degreeAverage,
      mathScore: grades.pmath,
      physicsScore: grades.pphysics,
      englishScore: grades.penglish,
      scientificWritingScore: grades.pscience,
      degree_id: selectedDegreeId,
      institution_id: selectedNameId,
      Type: selectedType,
    };
    const jsonData = JSON.stringify(data);
    console.log("Sending data:", jsonData); // Log the data sent to backend

    // Fetch request to the Flask backend
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("Received response:", response); // Log the received response
        if (response.Prediction) {
          setResult(response.Prediction);
        } else {
          setResult("");
        }
        setIsLoading(false);
        setShowSpan(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while predicting.");
        setIsLoading(false);
      });
  };

  return (
    <div>
      <form method="post" acceptCharset="utf-8" name="Modelform">
        <div className="bagrut">
          <table>
            <thead>
              <tr>
                <th colSpan={6}>Bagrut Scores</th>
              </tr>
              <tr>
                <th>Subject</th>
                <th>Score</th>
                <th>Points</th>
                <th>Subject</th>
                <th>Score</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {/* Rows for Bagrut Scores */}
              <tr>
                <td>English</td>
                <td>
                  <label>
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="gradeEnglish"
                      value={grades.gradeEnglish}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <select
                      className="styled-input-points"
                      name="pointsEnglish"
                      value={grades.pointsEnglish}
                      onChange={handleSelectChange}
                    >
                      <option value="0"></option>
                      {[1, 2, 3, 4, 5].map((point) => (
                        <option key={point} value={point}>
                          {point}
                        </option>
                      ))}
                    </select>
                  </label>
                </td>
                <td>Literature</td>
                <td>
                  <label>
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="gradeLit"
                      value={grades.gradeLit}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <select
                      className="styled-input-points"
                      name="pointsLit"
                      value={grades.pointsLit}
                      onChange={handleSelectChange}
                    >
                      <option value="0"></option>
                      {[1, 2, 3, 4, 5].map((point) => (
                        <option key={point} value={point}>
                          {point}
                        </option>
                      ))}
                    </select>
                  </label>
                </td>
              </tr>
              {/* Repeat similar structure for other subjects */}
              {/* Example for Math */}
              <tr>
                <td>Math</td>
                <td>
                  <label>
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="gradeMath"
                      value={grades.gradeMath}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <select
                      className="styled-input-points"
                      name="pointsMath"
                      value={grades.pointsMath}
                      onChange={handleSelectChange}
                    >
                      <option value="0"></option>
                      {[1, 2, 3, 4, 5].map((point) => (
                        <option key={point} value={point}>
                          {point}
                        </option>
                      ))}
                    </select>
                  </label>
                </td>
                <td>Tanach</td>
                <td>
                  <label>
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="gradeTanach"
                      value={grades.gradeTanach}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <select
                      className="styled-input-points"
                      name="pointsTanach"
                      value={grades.pointsTanach}
                      onChange={handleSelectChange}
                    >
                      <option value="0"></option>
                      {[1, 2, 3, 4, 5].map((point) => (
                        <option key={point} value={point}>
                          {point}
                        </option>
                      ))}
                    </select>
                  </label>
                </td>
              </tr>
              <tr>
                <td>Civics</td>
                <td>
                  <label>
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="gradeCiv"
                      value={grades.gradeCiv}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <select
                      className="styled-input-points"
                      name="pointsCiv"
                      value={grades.pointsCiv}
                      onChange={handleSelectChange}
                    >
                      <option value="0"></option>
                      {[1, 2, 3, 4, 5].map((point) => (
                        <option key={point} value={point}>
                          {point}
                        </option>
                      ))}
                    </select>
                  </label>
                </td>
                <td>Hebrew</td>
                <td>
                  <label>
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="gradeHeb"
                      value={grades.gradeHeb}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <select
                      className="styled-input-points"
                      name="pointsHeb"
                      value={grades.pointsHeb}
                      onChange={handleSelectChange}
                    >
                      <option value="0"></option>
                      {[1, 2, 3, 4, 5].map((point) => (
                        <option key={point} value={point}>
                          {point}
                        </option>
                      ))}
                    </select>
                  </label>
                </td>
              </tr>
              <tr>
                <td>History</td>
                <td>
                  <label>
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="gradeHistory"
                      value={grades.gradeHistory}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <select
                      className="styled-input-points"
                      name="pointsHistory"
                      value={grades.pointsHistory}
                      onChange={handleSelectChange}
                    >
                      <option value="0"></option>
                      {[1, 2, 3, 4, 5].map((point) => (
                        <option key={point} value={point}>
                          {point}
                        </option>
                      ))}
                    </select>
                  </label>
                </td>
                <td>Hebrew for Arabic Speakers</td>
                <td>
                  <label>
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="gradeHebAra"
                      value={grades.gradeHebAra}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <select
                      className="styled-input-points"
                      name="pointsHebAra"
                      value={grades.pointsHebAra}
                      onChange={handleSelectChange}
                    >
                      <option value="0"></option>
                      {[1, 2, 3, 4, 5].map((point) => (
                        <option key={point} value={point}>
                          {point}
                        </option>
                      ))}
                    </select>
                  </label>
                </td>
              </tr>
              <tr>
                <td>Arabic</td>
                <td>
                  <label>
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="gradeArabic"
                      value={grades.gradeArabic}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <select
                      className="styled-input-points"
                      name="pointsArabic"
                      value={grades.pointsArabic}
                      onChange={handleSelectChange}
                    >
                      <option value="0"></option>
                      {[1, 2, 3, 4, 5].map((point) => (
                        <option key={point} value={point}>
                          {point}
                        </option>
                      ))}
                    </select>
                  </label>
                </td>
                <td>Social Studies</td>
                <td>
                  <label>
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="gradeSocial"
                      value={grades.gradeSocial}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <select
                      className="styled-input-points"
                      name="pointsSocial"
                      value={grades.pointsSocial}
                      onChange={handleSelectChange}
                    >
                      <option value="0"></option>
                      {[1, 2, 3, 4, 5].map((point) => (
                        <option key={point} value={point}>
                          {point}
                        </option>
                      ))}
                    </select>
                  </label>
                </td>
              </tr>
              <tr>
                <td>Druze/Christian History</td>
                <td>
                  <label>
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="gradeHisDruze"
                      value={grades.gradeHisDruze}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <select
                      className="styled-input-points"
                      name="pointsHisDruze"
                      value={grades.pointsHisDruze}
                      onChange={handleSelectChange}
                    >
                      <option value="0"></option>
                      {[1, 2, 3, 4, 5].map((point) => (
                        <option key={point} value={point}>
                          {point}
                        </option>
                      ))}
                    </select>
                  </label>
                </td>
                <td>History of Arabs & Islam</td>
                <td>
                  <label>
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="gradeHisArab"
                      value={grades.gradeHisArab}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <select
                      className="styled-input-points"
                      name="pointsHisArab"
                      value={grades.pointsHisArab}
                      onChange={handleSelectChange}
                    >
                      <option value="0"></option>
                      {[1, 2, 3, 4, 5].map((point) => (
                        <option key={point} value={point}>
                          {point}
                        </option>
                      ))}
                    </select>
                  </label>
                </td>
              </tr>
              <tr>
                <td>Judaic Thought</td>
                <td>
                  <label>
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="gradeJewish"
                      value={grades.gradeJewish}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <select
                      className="styled-input-points"
                      name="pointsJewish"
                      value={grades.pointsJewish}
                      onChange={handleSelectChange}
                    >
                      <option value="0"></option>
                      {[1, 2, 3, 4, 5].map((point) => (
                        <option key={point} value={point}>
                          {point}
                        </option>
                      ))}
                    </select>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Electives</th>
                <th>Score</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: electives }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <label>
                      <select
                        className="styled-input-electives"
                        value={
                          index === 0
                            ? subjectElective1
                            : index === 1
                            ? subjectElective2
                            : index === 2
                            ? subjectElective3
                            : index === 3
                            ? subjectElective4
                            : index === 4
                            ? subjectElective5
                            : subjectElective6
                        }
                        onChange={(e) => handleCourseChange(e, index + 1)}
                      >
                        <option value="0">Select Elective</option>
                        {courses.map((course) => (
                          <option key={course.ID} value={course.ID}>
                            {course.Name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </td>
                  <td>
                    <label>
                      <input
                        className="styled-input-grade"
                        type="number"
                        name={`gradeElectives${index + 1}`}
                        value={grades[`gradeElectives${index + 1}`]}
                        onChange={handleInputChange}
                      />
                    </label>
                  </td>
                  <td>
                    <label>
                      <select
                        className="styled-input-points"
                        name={`pointsElectives${index + 1}`}
                        value={grades[`pointsElectives${index + 1}`]}
                        onChange={handleSelectChange}
                      >
                        <option value="0"></option>
                        {[1, 2, 3, 4, 5].map((point) => (
                          <option key={point} value={point}>
                            {point}
                          </option>
                        ))}
                      </select>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="bagrutButton"
            onClick={handleAddCourse}
            disabled={electives >= 6}
          >
            Add Elective
          </button>

          <table>
            <thead>
              <tr>
                <th>Psychometric Scores</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label>
                    Overall Score&nbsp;
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="overall"
                      value={grades.overall}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    Verbal Score&nbsp;
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="verbal"
                      value={grades.verbal}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    English Score&nbsp;
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="english"
                      value={grades.english}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    Quantitative Score&nbsp;
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="quant"
                      value={grades.quant}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Bachelor's Degree Holder</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label>
                    Number of Credits&nbsp;
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="degreeCredits"
                      value={grades.degreeCredits}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    Degree Average&nbsp;
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="degreeAverage"
                      value={grades.degreeAverage}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Preparatory Courses</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label>
                    Math Score&nbsp;
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="pmath"
                      value={grades.pmath}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    Physics Score&nbsp;
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="pphysics"
                      value={grades.pphysics}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    English Score&nbsp;
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="penglish"
                      value={grades.penglish}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    Scientific Writing Score&nbsp;
                    <input
                      className="styled-input-grade"
                      type="number"
                      name="pscience"
                      value={grades.pscience}
                      onChange={handleInputChange}
                    />
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Academic Courses</th>
                <th>Score</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: academics }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <label>
                      <select
                        className="styled-input-electives"
                        value={grades[`subjectAcademic${index + 1}`] || ""}
                        onChange={(e) => handleAcademicChange(e, index + 1)}
                      >
                        <option value="0">Select Academic Course</option>
                        {academicCourses.map((course) => (
                          <option key={course.ID} value={course.ID}>
                            {course.Name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </td>
                  <td>
                    <label>
                      <input
                        className="styled-input-grade"
                        type="number"
                        name={`gradeAcademic${index + 1}`}
                        value={grades[`gradeAcademic${index + 1}`]}
                        onChange={handleInputChange}
                      />
                    </label>
                  </td>
                  <td>
                    <label>
                      <select
                        className="styled-input-points"
                        name={`pointsAcademic${index + 1}`}
                        value={grades[`pointsAcademic${index + 1}`]}
                        onChange={handleSelectChange}
                      >
                        <option value="0"></option>
                        {[1, 2, 3, 4, 5].map((point) => (
                          <option key={point} value={point}>
                            {point}
                          </option>
                        ))}
                      </select>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="bagrutButton"
            onClick={handleAddAcademic}
            disabled={academics >= 6}
          >
            Add Course
          </button>
        </div>
        <div>
          <label>
            <select value={selectedNameId} onChange={handleNameChange}>
              <option value="0">Select a school</option>
              {names.map((name, index) => (
                <option key={index} value={name.ID}>
                  {name.Name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            <select value={selectedType} onChange={handleTypeChange}>
              <option value="0">Select a Type</option>
              {types.map((type, index) => (
                <option key={index} value={type.TypeId}>
                  {type.Type}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            <select value={selectedDegreeId} onChange={handleDegreeChange}>
              <option value="0">Select a field</option>
              {degrees.map((degree, index) => (
                <option key={index} value={degree.ID}>
                  {degree.Name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          disabled={isLoading}
          onClick={!isLoading ? handlePredictClick : undefined}
        >
          Search
        </button>
      </form>
      <br />
      <div className="text-center">
        <h4>
          {showSpan && (
            <span id="prediction">
              {result ? (
                <p>The Predicted Acceptance is {result}</p>
              ) : (
                <p>Please fill out each field in the form completely</p>
              )}
            </span>
          )}
          {error && <p>{error}</p>}
        </h4>
      </div>
    </div>
  );
};

export default SearchByGrades;
