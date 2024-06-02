import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ariela1993!",
    database: "admissioncompass"
});

app.get("/", (req, res) => {
    res.json("Hello this is the backend");
});

app.get('/results/:id/:type', (req, res) => {
  let schoolID = req.params.id;
  let type = req.params.type;
  let sql = 'SELECT * FROM degrees WHERE InstitutionID = ? AND Type = ?';
  db.query(sql, [schoolID, type], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/resultsSchools/:degreeid/:type', (req, res) => {
  let degreeID = req.params.degreeid;
  let type = req.params.type;
  let sql = `
  SELECT institution.*
  FROM institution, degrees 
  WHERE institution.ID = degrees.InstitutionID 
  AND degrees.ID = ? 
  AND degrees.Type = ?
`;
  db.query(sql, [degreeID, type], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

  
app.get('/institution', (req, res) => {
    let sql = 'SELECT ID, Name FROM institution';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  app.get('/degrees', (req, res) => {
    let sql = 'SELECT DISTINCT ID, Name FROM degrees';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  app.get('/degrees/types', (req, res) => {
    let sqlType = 'SELECT DISTINCT TypeId, Type FROM degrees';
    db.query(sqlType, (err, types) => {
      if (err) throw err;
      res.json(types);
    });
  });

  app.get('/bagrutcourses', (req, res) => {
    let sqlType = 'SELECT ID, Name FROM bagrutelectives ORDER BY Name ASC, ID ASC';
    db.query(sqlType, (err, types) => {
      if (err) throw err;
      res.json(types);
    });
  });
  app.get('/academiccourses', (req, res) => {
    let sqlType = 'SELECT ID, Name FROM academiccourses ORDER BY Name ASC, ID ASC';
    db.query(sqlType, (err, types) => {
      if (err) throw err;
      res.json(types);
    });
  });

  app.post("/submission", (req, res) => {
    const {
      gradeEnglish, pointsEnglish, gradeLit, pointsLit, gradeMath, pointsMath, gradeTanach, pointsTanach,
      gradeCiv, pointsCiv, gradeHeb, pointsHeb, gradeHistory, pointsHistory, gradeHebAra, pointsHebAra,
      gradeArabic, pointsArabic, gradeSocial, pointsSocial, gradeHisDruze, pointsHisDruze, gradeHisArab,
      pointsHisArab, gradeJewish, pointsJewish, subjectElective1, gradeElectives1, pointsElectives1,
      subjectElective2, gradeElectives2, pointsElectives2, subjectElective3, gradeElectives3, pointsElectives3,
      subjectElective4, gradeElectives4, pointsElectives4, subjectElective5, gradeElectives5, pointsElectives5,
      subjectElective6, gradeElectives6, pointsElectives6, subjectAcademic1, gradeAcademic1, pointsAcademic1,
      subjectAcademic2, gradeAcademic2, pointsAcademic2, subjectAcademic3, gradeAcademic3, pointsAcademic3,
      subjectAcademic4, gradeAcademic4, pointsAcademic4, subjectAcademic5, gradeAcademic5, pointsAcademic5,
      subjectAcademic6, gradeAcademic6, pointsAcademic6, overall, verbal, english, quant, degreeCredits,
      degreeAverage, pmath, pphysics, penglish, pscience, email, rows
    } = req.body;
  
    db.beginTransaction((err) => {
      if (err) {
        console.error('Error starting transaction:', err);
        return res.status(500).json({ error: "Failed to start database transaction" });
      }
  
      const bagrutQuery = `
        INSERT INTO bagrut (englishGrade, englishUnits, literatureGrade, literatureUnits, mathGrade, mathUnits, tanachGrade,
          tanachUnits, civicsGrade, civicsUnits, hebrewGrade, hebrewUnits, historyGrade, historyUnits, hebrewForArabicSpeakersGrade, 
          hebrewForArabicSpeakersUnits, arabicGrade, arabicUnits, socialStudiesGrade, socialStudiesUnits, druzeChristianHistoryGrade, 
          druzeChristianHistoryUnits, \`historyOfArabs&IslamGrade\`, \`historyOfArabs&IslamUnits\`, judaicThoughtGrade, judaicThoughtUnits,
          elective1Id, elective1Grade, elective1Units, elective2Id, elective2Grade, elective2Units, elective3Id, elective3Grade, 
          elective3Units, elective4Id, elective4Grade, elective4Units, elective5Id, elective5Grade, elective5Units, elective6Id,  
          elective6Grade, elective6Units
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
    
      const bagrutValues = [
        gradeEnglish, pointsEnglish, gradeLit, pointsLit, gradeMath, pointsMath, gradeTanach, pointsTanach,
        gradeCiv, pointsCiv, gradeHeb, pointsHeb, gradeHistory, pointsHistory, gradeHebAra, pointsHebAra,
        gradeArabic, pointsArabic, gradeSocial, pointsSocial, gradeHisDruze, pointsHisDruze, gradeHisArab,
        pointsHisArab, gradeJewish, pointsJewish, subjectElective1, gradeElectives1, pointsElectives1,
        subjectElective2, gradeElectives2, pointsElectives2, subjectElective3, gradeElectives3, pointsElectives3,
        subjectElective4, gradeElectives4, pointsElectives4, subjectElective5, gradeElectives5, pointsElectives5,
        subjectElective6, gradeElectives6, pointsElectives6
      ];
  
      db.query(bagrutQuery, bagrutValues, (err, bagrutResult) => {
        if (err) {
          return db.rollback(() => {
            console.error('Error inserting data into bagrut table:', err);
            return res.status(500).json({ error: "Failed to insert data into bagrut table" });
          });
        }
  
        const bagrutId = bagrutResult.insertId;
  
        const academicCoursesQuery = `
          INSERT INTO academiccoursesholder (
            courseId1, grade1, points1, courseId2, grade2, points2, courseId3, grade3, points3, courseId4, grade4, points4,
            courseId5, grade5, points5, courseId6, grade6, points6
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    
        const academicCoursesValues = [
          subjectAcademic1, gradeAcademic1, pointsAcademic1, subjectAcademic2, gradeAcademic2, pointsAcademic2,
          subjectAcademic3, gradeAcademic3, pointsAcademic3, subjectAcademic4, gradeAcademic4, pointsAcademic4,
          subjectAcademic5, gradeAcademic5, pointsAcademic5, subjectAcademic6, gradeAcademic6, pointsAcademic6
        ];
  
        db.query(academicCoursesQuery, academicCoursesValues, (err, academicCoursesResult) => {
          if (err) {
            return db.rollback(() => {
              console.error('Error inserting data into academiccoursesholder table:', err);
              return res.status(500).json({ error: "Failed to insert data into academiccoursesholder table" });
            });
          }
  
          const academicCoursesId = academicCoursesResult.insertId;
  
          const pschQuery = `
            INSERT INTO psychometric_scores (general_grade, verbal_score, english_score, quantitative_score)
            VALUES (?, ?, ?, ?)
          `; 
    
          const pschValues = [overall, verbal, english, quant];
  
          db.query(pschQuery, pschValues, (err, pschResult) => {
            if (err) {
              return db.rollback(() => {
                console.error('Error inserting data into psychometric_scores table:', err);
                return res.status(500).json({ error: "Failed to insert data into psychometric_scores table" });
              });
            }
  
            const psychometricId = pschResult.insertId;
  
            const bachQuery = `
              INSERT INTO degreeholder (numberOfCredits, average)
              VALUES (?, ?)
            `; 
    
            const bachValues = [degreeCredits, degreeAverage];
  
            db.query(bachQuery, bachValues, (err, bachResult) => {
              if (err) {
                return db.rollback(() => {
                  console.error('Error inserting data into degreeholder table:', err);
                  return res.status(500).json({ error: "Failed to insert data into degreeholder table" });
                });
              }
  
              const degreeHolderId = bachResult.insertId;
  
              const prepQuery = `
                INSERT INTO preparatorycourses (mathScore, physicsScore, englishScore, scientificWritingScore)
                VALUES (?, ?, ?, ?)
              `; 
  
              const prepValues = [pmath, pphysics, penglish, pscience];
  
              db.query(prepQuery, prepValues, (err, prepResult) => {
                if (err) {
                  return db.rollback(() => {
                    console.error('Error inserting data into preparatorycourses table:', err);
                    return res.status(500).json({ error: "Failed to insert data into preparatorycourses table" });
                  });
                }
  
                const preparatoryCoursesId = prepResult.insertId;
  
                const subQuery = `
                  INSERT INTO studentsubmission (email, 
                    degreeId1, acceptedInstitutionId1, rejectedInstitutionId1, 
                    degreeId2, acceptedInstitutionId2, rejectedInstitutionId2, 
                    degreeId3, acceptedInstitutionId3, rejectedInstitutionId3,
                    bagrutId, psychometricId, degreeHolderId, preparatoryId,academicCoursesId)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
  
                const subValues = [email];
  
                for (let i = 0; i < 3; i++) {
                  if (rows[i]) {
                    subValues.push(rows[i].degreeId || null);
                    subValues.push(rows[i].acceptedInstitutionId || null);
                    subValues.push(rows[i].rejectedInstitutionId || null);
                  } else {
                    subValues.push(null, null, null);
                  }
                }
  
                subValues.push(bagrutId, psychometricId, degreeHolderId, preparatoryCoursesId, academicCoursesId);
  
                db.query(subQuery, subValues, (err, subResult) => {
                  if (err) {
                    return db.rollback(() => {
                      console.error('Error inserting data into studentsubmission table:', err);
                      return res.status(500).json({ error: "Failed to insert data into studentsubmission table" });
                    });
                  }
  
                  db.commit((err) => {
                    if (err) {
                      return db.rollback(() => {
                        console.error('Error committing transaction:', err);
                        return res.status(500).json({ error: "Failed to commit transaction" });
                      });
                    }
  
                    return res.status(200).json({
                      success: true,
                      data: {
                        bagrut: bagrutResult,
                        psych: pschResult,
                        academicCourses: academicCoursesResult,
                        bach: bachResult,
                        prep: prepResult,
                        sub: subResult
                      }
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
  
  


app.delete("/institution/:id", (req, res) => {
    const id = req.params.id; // Extract ID from the URL parameters

    // Construct the DELETE query
    const q = "DELETE FROM institution WHERE ID = ?";
    
    // Execute the query with the specified ID
    db.query(q, [id], (err, result) => {
        if (err) {
            console.error(err); 
            return res.status(500).json({ error: "Failed to delete data from the database" });
        }
        
        // Check if any rows were affected by the deletion
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No matching entry found for deletion" });
        }
        
        // Return success response
        return res.status(200).json({ success: true });
    });
});


app.listen(8800, () => {
    console.log("Connected to backend!!!");
});
