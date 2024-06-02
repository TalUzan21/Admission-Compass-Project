import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./Form.css";
import SearchByGrades from "./SearchByGrades";
import Plotly from "plotly.js-dist";

interface Institution {
  ID: number;
  Name: string;
}

interface Degree {
  ID: number;
  Name: string;
}

interface Type {
  TypeId: number;
  Type: string;
}
interface FeatureImportance {
  Feature: string;
  Importance: number;
}

const Form: React.FC = () => {
  const [selectedNameId, setSelectedNameId] = useState<number>(0);
  const [selectedDegreeId, setSelectedDegreeId] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<number>(0);

  const [names, setNames] = useState<Institution[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [showSchoolSearch, setShowSchoolSearch] = useState<number>(0);
  const [isButtonBlue, setIsButtonBlue] = useState<boolean>(false);

  const [results1, setResults1] = useState<Degree[]>([]);
  const [results2, setResults2] = useState<Institution[]>([]);

  const handleShapAnalysis = async (e: FormEvent) => {
    e.preventDefault();
    console.log(selectedNameId);
    console.log(selectedType);
    fetch("http://localhost:5000/shap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        institution_id: selectedNameId,
        Type: selectedType,
      }),
    })
      .then((response) => response.json())
      .then((data: FeatureImportance[]) => {
        const featureImportances: Plotly.Data[] = [
          {
            x: data.map((entry) => entry.Feature),
            y: data.map((entry) => entry.Importance),
            type: "bar" as Plotly.PlotType,
          },
        ];

        Plotly.newPlot("graph", featureImportances, {
          title: "Feature Importances",
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
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

  const handleNameChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nameId = parseInt(e.target.value, 10);
    setSelectedNameId(nameId);
    checkButtonColor(nameId, selectedType, selectedDegreeId);
  };

  const handleDegreeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const degreeId = parseInt(e.target.value, 10);
    setSelectedDegreeId(degreeId);
    checkButtonColor(selectedNameId, selectedType, degreeId);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = parseInt(e.target.value, 10);
    setSelectedType(type);
    checkButtonColor(selectedNameId, selectedType, selectedDegreeId);
  };

  const checkButtonColor = (nameId: number, type: number, degreeId: number) => {
    setIsButtonBlue(
      (nameId !== 0 && type !== 0) || (degreeId !== 0 && type !== 0)
    );
  };

  const handleSubmit1 = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedNameId && selectedType) {
      try {
        const response = await axios.get<Degree[]>(
          `http://localhost:8800/results/${selectedNameId}/${selectedType}`
        );
        setResults1(response.data);
      } catch (err) {
        console.error("Failed to fetch results:", err);
      }
    }
  };

  const handleSubmit2 = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedDegreeId && selectedType) {
      try {
        const response = await axios.get<Institution[]>(
          `http://localhost:8800/resultsSchools/${selectedDegreeId}/${selectedType}`
        );
        setResults2(response.data);
      } catch (err) {
        console.error("Failed to fetch results:", err);
      }
    }
  };

  return (
    <div>
      <div className="outer2">
        <div className="button-container">
          <button
            onClick={() => setShowSchoolSearch(0)}
            className={showSchoolSearch === 0 ? "active-button" : ""}
          >
            Search Schools
          </button>
          <button
            onClick={() => setShowSchoolSearch(1)}
            className={showSchoolSearch === 1 ? "active-button" : ""}
          >
            Search Fields of Study
          </button>
          <button
            onClick={() => setShowSchoolSearch(2)}
            className={showSchoolSearch === 2 ? "active-button" : ""}
          >
            Search By Grades
          </button>
        </div>

        {showSchoolSearch === 0 ? (
          <form onSubmit={handleShapAnalysis}>
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
              <button onClick={handleShapAnalysis}>Get SHAP Analysis</button>
              {/*<button
                type="submit"
                style={{ backgroundColor: isButtonBlue ? "#a4d4e7" : "" }}
              >
                Search
                </button>*/}
            </div>
          </form>
        ) : showSchoolSearch === 1 ? (
          <form onSubmit={handleSubmit2}>
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
            <div>
              <label>
                <select value={selectedType} onChange={handleTypeChange}>
                  <option value="0">Select a Type</option>
                  {types.map((type, index) => (
                    <option key={index} value={type.Type}>
                      {type.Type}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              {/*
              <button
                type="submit"
                style={{ backgroundColor: isButtonBlue ? "#a4d4e7" : "" }}
              >
                Search
              </button>
              */}
            </div>
          </form>
        ) : showSchoolSearch === 2 ? (
          <SearchByGrades></SearchByGrades>
        ) : null}
      </div>
      <div className="results-container">
        {showSchoolSearch === 0 && results1.length > 0 && (
          <>
            <div className="outer3">
              <p>{results1.length} Results</p>
            </div>

            <div className="result">
              {/*}
              {results1.map((result, index) => (
                <div className="result-item" key={index}>
                  {result.Name} - {result.ID}
                </div>
              ))} */}
            </div>
          </>
        )}
        {showSchoolSearch === 1 && results2.length > 0 && (
          <>
            <div className="outer3">
              <p>{results2.length} Results</p>
            </div>
            <div className="result">
              {results2.map((result, index) => (
                <div className="result-item" key={index}>
                  {result.Name} - {result.ID}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div id="graph"></div>
    </div>
  );
};

export default Form;
