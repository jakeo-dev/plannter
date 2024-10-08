import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Course, GPASettings, Grade, Stage, StageNames } from "@/types";
import {
  letterToGPA,
  getLetter,
  getDifficultyColor,
  getOverallDifficultyText,
  calculateWeights,
} from "@/utility";
import CourseElem from "./CourseElem";

function ListAttribute({
  name,
  calculation,
  classN,
}: {
  name: string;
  calculation: number | undefined;
  classN: string;
}) {
  if (!calculation) return <></>;

  return (
    <div
      className={`${classN} inline-flex text-sm text-left bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md break-words transition px-2 py-[0.075rem] mr-1 md:mr-2 mt-2`}
    >
      {calculation.toFixed(2)} {name}
    </div>
  );
}

function sortCourses(a: Course, b: Course) {
  // weighted classes are above unweighted classes
  if (a.advancementLevel !== b.advancementLevel) {
    return b.advancementLevel - a.advancementLevel;
  }

  const calculateGradeScore = (scores: Course["scores"]) => {
    let gradeScore = 0;

    if (scores?.firstSemester) {
      const firstSemesterGrade =
        scores.firstSemester.percentGrade !== -1
          ? getLetter(scores.firstSemester.percentGrade)
          : scores.firstSemester.letterGrade;
      gradeScore += letterToGPA(firstSemesterGrade, true);
    }

    if (scores?.secondSemester) {
      const secondSemesterGrade =
        scores.secondSemester.percentGrade !== -1
          ? getLetter(scores.secondSemester.percentGrade)
          : scores.secondSemester.letterGrade;
      gradeScore += letterToGPA(secondSemesterGrade, true);
    }

    return gradeScore;
  };

  const gradeScoreA = calculateGradeScore(a.scores);
  const gradeScoreB = calculateGradeScore(b.scores);

  // sort by highest grade score first (more semesters and higher grade = higher score)
  if (gradeScoreA !== gradeScoreB) {
    return gradeScoreB - gradeScoreA;
  }

  // sort alphabetically
  return a.name.localeCompare(b.name);
}

export default function StageElem({
  stage,
  gpaSettings,
  setActiveStage,
  setActiveCourse,
  setStage,
  setCurrentStageName,
  setAddCourseVisible,
  setEditCourseVisible,
}: {
  stage: Stage;
  gpaSettings: GPASettings;
  setActiveStage: Dispatch<SetStateAction<Stage | null>>;
  setActiveCourse: Dispatch<SetStateAction<Course | null>>;
  setStage: (stage: Stage) => void;
  setCurrentStageName: Dispatch<SetStateAction<StageNames>>;
  setAddCourseVisible: Dispatch<SetStateAction<boolean>>;
  setEditCourseVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const [unweightedGPA, setUnweightedGPA] = useState(0);
  const [weightedGPA, setWeightedGPA] = useState(0);
  const [difficulty, setDifficulty] = useState(0);

  useEffect(() => {
    if (stage.courses && Object.keys(stage.courses).length > 0) {
      let unweightedSum = 0;
      let weightedSum = 0;
      let difficultySum = 0;
      let numGrades = 0;
      let numSemesters = 0;

      const processSemester = (course: Course, semester: Grade | undefined) => {
        if (semester?.letterGrade && semester.letterGrade != "none") {
          const letterGrade =
            semester.percentGrade !== -1
              ? getLetter(semester.percentGrade)
              : semester.letterGrade;

          const gpa = letterToGPA(letterGrade, gpaSettings["usePlusMinus"]);

          unweightedSum += gpa;
          weightedSum +=
            gpa + calculateWeights(gpaSettings, course.advancementLevel);
          numGrades++;
        }
        if (numSemesters % 2 == 0)
          difficultySum += course.advancementLevel * course.difficulty;
        numSemesters++;
      };

      for (const course of Object.values(stage.courses)) {
        processSemester(course, course.scores?.firstSemester);
        processSemester(course, course.scores?.secondSemester);
      }

      setUnweightedGPA(unweightedSum / numGrades);
      setWeightedGPA(weightedSum / numGrades);
      setDifficulty(
        (difficultySum + 1.175 ** Object.keys(stage.courses).length) / 6
      );
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
          {`${
            stage.gradeLevel != 13
              ? `Grade ${stage.gradeLevel} (${stage.name})`
              : "Other Courses"
          }`}
        </h2>
        <div className="block mb-3">
          <ListAttribute name="GPA" calculation={unweightedGPA} classN="" />
          <ListAttribute
            name="Weighted GPA"
            calculation={weightedGPA}
            classN=""
          />
          <ListAttribute
            name={getOverallDifficultyText(Number(difficulty.toFixed(2)))}
            calculation={difficulty}
            classN={getDifficultyColor(difficulty)}
          />
        </div>
      </div>
      <ul>
        {(Object.values(stage?.courses || {}) as Course[])
          .sort(sortCourses)
          .map((course) => (
            <CourseElem
              key={course.uuid}
              course={course}
              onEdit={() => {
                setActiveCourse(course);
                setActiveStage(stage);
                setCurrentStageName(stage.name || "");
                setEditCourseVisible(true);
              }}
              onTrash={() => {
                if (
                  confirm(
                    "Are you sure you want to remove " + course.name + "?"
                  )
                ) {
                  const newStage = JSON.parse(JSON.stringify(stage)) as Stage;

                  if (newStage.courses && course.uuid in newStage.courses) {
                    delete newStage.courses[course.uuid];
                  }

                  setStage(newStage);
                }
              }}
            />
          ))}
      </ul>
      <button
        className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
        onClick={() => {
          setActiveStage(stage);
          setAddCourseVisible(true);
          setCurrentStageName(stage.name || "");
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-1" />
        {stage.gradeLevel != 13
          ? `Add a ${stage.name.toLocaleLowerCase()} course`
          : "Add another course"}
      </button>
    </div>
  );
}
