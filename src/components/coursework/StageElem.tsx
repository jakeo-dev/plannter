import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Course, GPASettings, Grade, Stage } from "@/types";
import CourseElem from "./CourseElem";

// Utility Functions
function calculateGPAForGrade(grade: string, usePlusMinus: boolean): number {
  if (usePlusMinus) {
    if (["A+", "A"].includes(grade)) return 4;
    if (grade === "A-") return 3.7;
    if (["B+", "B"].includes(grade)) return 3;
    if (grade === "B-") return 2.7;
    if (["C+", "C"].includes(grade)) return 2;
    if (grade === "C-") return 1.7;
    if (["D+", "D"].includes(grade)) return 1;
    if (grade === "D-") return 0.7;
    if (grade === "F") return 0;
  } else {
    if (grade.includes("A")) return 4;
    if (grade.includes("B")) return 3;
    if (grade.includes("C")) return 2;
    if (grade.includes("D")) return 1;
    if (grade.includes("F")) return 0;
  }

  return 0;
}

function getLetter(percentGrade: number) {
  if (percentGrade >= 93) {
    return "A";
  } else if (percentGrade >= 90) {
    return "A-";
  } else if (percentGrade >= 87) {
    return "B+";
  } else if (percentGrade >= 83) {
    return "B";
  } else if (percentGrade >= 80) {
    return "B-";
  } else if (percentGrade >= 77) {
    return "C+";
  } else if (percentGrade >= 73) {
    return "C";
  } else if (percentGrade >= 70) {
    return "C-";
  } else if (percentGrade >= 67) {
    return "D+";
  } else if (percentGrade >= 63) {
    return "D";
  } else if (percentGrade >= 60) {
    return "D-";
  } else {
    return "F";
  }
}

function getDifficultyText(difficulty: string) {
  if (difficulty == "0.25") {
    return "Effortless";
  } else if (difficulty == "0.50") {
    return "Easy";
  } else if (difficulty == "1.00") {
    return "Normal";
  } else if (difficulty == "1.50") {
    return "Difficult";
  } else if (difficulty == "1.75") {
    return "Challenging";
  } else {
    return "";
  }
}

function GPADisplay({name, gpa}: { name: string, gpa: number | undefined }) {
  if (!gpa) return <></>

  return (
    <button className="text-sm text-left bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md break-words transition px-2 py-[0.055rem] mr-1 md:mr-2 mt-2">
      {gpa.toFixed(2)} {name}
    </button>
  );
}

export default function StageElem({
  stage,
  gpaSettings,
  setActiveStage,
  setActiveCourse,
  setStage,
  setAddCourseVisible,
  setEditCourseVisible,
}: {
  stage: Stage;
  gpaSettings: GPASettings;
  setActiveStage: Dispatch<SetStateAction<Stage | null>>;
  setActiveCourse: Dispatch<SetStateAction<Course | null>>;
  setStage: (stage: Stage) => void;
  setAddCourseVisible: Dispatch<SetStateAction<boolean>>;
  setEditCourseVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const [unweightedGPA, setUnweightedGPA] = useState(0);
  const [weightedGPA, setWeightedGPA] = useState(0);
  const [difficulty, setDifficulty] = useState(0);

  useEffect(() => {
    function calculateWeights(advancementLevel: number) {
      const weights: { [key: string]: keyof GPASettings } = {
        "2.00": "advancedWeight",
        "2.01": "advancedWeight",
        "3.00": "honorsWeight",
        "3.50": "collegeWeight",
        "3.51": "collegeWeight",
        "4.00": "apWeight",
        "5.00": "ibWeight",
      };

      return (gpaSettings[weights[advancementLevel.toFixed(2)]] || 0) as number;
    }

    if (stage.courses && Object.keys(stage.courses).length > 0) {
      let unweightedSum = 0;
      let weightedSum = 0;
      let difficultyProduct = 1;
      let numSemesters = 0;

      const processSemester = (course: Course, semester: Grade | undefined) => {
        if (!semester?.letterGrade) return;

        const letterGrade =
          semester.letterGrade === "Use percent"
            ? getLetter(semester.percentGrade || 0)
            : semester.letterGrade;

        const gpa = calculateGPAForGrade(
          letterGrade,
          gpaSettings["usePlusMinus"]
        );

        unweightedSum += gpa;
        weightedSum += gpa + calculateWeights(course.advancementLevel);
        difficultyProduct *= Math.sqrt(course.difficulty);

        numSemesters++;
      };

      for (const course of Object.values(stage.courses)) {
        processSemester(course, course.scores?.firstSemester);
        processSemester(course, course.scores?.secondSemester);
      }

      setUnweightedGPA(unweightedSum / numSemesters);
      setWeightedGPA(weightedSum / numSemesters);
      setDifficulty(difficultyProduct);
    } else {
      setUnweightedGPA(0);
      setWeightedGPA(0);
      setDifficulty(0);
    }
  }, [stage.courses, gpaSettings]);

  return (
    <div>
      <div className="font-medium px-4">
        <h2 className="text-lg font-Calistoga">
          Grade {stage.gradeLevel} ({stage.name})
        </h2>
        <div className="block mb-3">
          <GPADisplay name="Unweighted" gpa={unweightedGPA} />
          <GPADisplay name="Weighted" gpa={weightedGPA} />
          <GPADisplay
            name={`${getDifficultyText(difficulty.toFixed(2))} Coursework`}
            gpa={difficulty}
          />
        </div>
      </div>
      <ul>
        {(Object.values(stage?.courses || {}) as Course[]).map((course) => (
          <CourseElem
            key={course.uuid}
            course={course}
            onEdit={() => {
              setActiveCourse(course);
              setActiveStage(stage);
              setEditCourseVisible(true);
            }}
            onTrash={() => {
              if (
                confirm("Are you sure you want to remove " + course.name + "?")
              ) {
                const newStage = JSON.parse(JSON.stringify(stage)) as Stage;

                if (newStage.courses && course.uuid in newStage.courses) {
                  delete newStage.courses[course.uuid];
                }

                setStage(newStage);
              }
            }}
          ></CourseElem>
        ))}
      </ul>
      <button
        className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
        onClick={() => {
          setActiveStage(stage);
          setAddCourseVisible(true);
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-1" />
        Add a {stage.name.toLocaleLowerCase()} course
      </button>
    </div>
  );
}
