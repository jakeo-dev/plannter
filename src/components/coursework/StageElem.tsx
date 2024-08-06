import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Course, GPASettings, Grade, Stage } from "@/types";
import CourseElem from "./CourseElem";

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

  useEffect(() => {
    function calculateGPAForGrade(grade: string, usePlusMinus: boolean) {
      let gpa = 0;

      if (usePlusMinus) {
        if (["A+", "A"].includes(grade)) gpa = 4.0;
        else if (grade === "A-") gpa = 3.7;
        else if (["B+", "B"].includes(grade)) gpa = 3.0;
        else if (grade === "B-") gpa = 2.7;
        else if (["C+", "C"].includes(grade)) gpa = 2.0;
        else if (grade === "C-") gpa = 1.7;
        else if (["D+", "D"].includes(grade)) gpa = 1.0;
        else if (grade === "D-") gpa = 0.7;
        else if (grade === "F") gpa = 0.0;
      } else {
        if (grade.includes("A")) gpa = 4.0;
        else if (grade.includes("B")) gpa = 3.0;
        else if (grade.includes("C")) gpa = 2.0;
        else if (grade.includes("D")) gpa = 1.0;
        else if (grade.includes("F")) gpa = 0.0;
      }

      return gpa;
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

    function calculateWeights(advancementLevel: number) {
      const ADVANCED = 2;
      const ACCELERATED = 2.01;
      const HONORS = 3;
      const COLLEGE_PREP = 3.5;
      const DUAL_ENROLLMENT = 3.51;
      const AP = 4;
      const IB = 5;

      if (advancementLevel == ADVANCED || advancementLevel == ACCELERATED) {
        return gpaSettings["advancedWeight"];
      } else if (advancementLevel == HONORS) {
        return gpaSettings["honorsWeight"];
      } else if (
        advancementLevel == COLLEGE_PREP ||
        advancementLevel == DUAL_ENROLLMENT
      ) {
        return gpaSettings["collegeWeight"];
      } else if (advancementLevel == AP) {
        return gpaSettings["apWeight"];
      } else if (advancementLevel == IB) {
        return gpaSettings["ibWeight"];
      } else {
        return 0;
      }
    }

    if (stage.courses && Object.keys(stage.courses).length > 0) {
      let unweightedSum = 0;
      let weightedSum = 0;
      let numSemesters = 0;
      for (const course of Object.values(stage.courses)) {
        if (course.scores?.firstSemester) {
          if (course.scores?.firstSemester.letterGrade == "Use percent") {
            const firstSemUnweightedGPA = calculateGPAForGrade(
              getLetter(course.scores?.firstSemester.percentGrade || 0),
              gpaSettings["usePlusMinus"]
            );

            unweightedSum += firstSemUnweightedGPA;
            weightedSum +=
              firstSemUnweightedGPA + calculateWeights(course.advancementLevel);
          } else {
            const firstSemUnweightedGPA = calculateGPAForGrade(
              course.scores?.firstSemester.letterGrade,
              gpaSettings["usePlusMinus"]
            );

            unweightedSum += firstSemUnweightedGPA;
            weightedSum +=
              firstSemUnweightedGPA + calculateWeights(course.advancementLevel);
          }

          numSemesters++;
        }

        if (course.scores?.secondSemester) {
          if (course.scores?.secondSemester.letterGrade == "Use percent") {
            const secondSemUnweightedGPA = calculateGPAForGrade(
              getLetter(course.scores?.secondSemester.percentGrade || 0),
              gpaSettings["usePlusMinus"]
            );
            unweightedSum += secondSemUnweightedGPA;
            weightedSum +=
              secondSemUnweightedGPA +
              calculateWeights(course.advancementLevel);
          } else {
            const secondSemUnweightedGPA = calculateGPAForGrade(
              course.scores?.secondSemester.letterGrade,
              gpaSettings["usePlusMinus"]
            );
            unweightedSum += secondSemUnweightedGPA;
            weightedSum +=
              secondSemUnweightedGPA +
              calculateWeights(course.advancementLevel);
          }
          numSemesters++;
        }
      }

      setUnweightedGPA(unweightedSum / numSemesters);
      setWeightedGPA(weightedSum / numSemesters);
    } else {
      setWeightedGPA(0);
      setUnweightedGPA(0);
    }
  }, [stage.courses, gpaSettings]);


  return (
    <div className="mb-12">
      <div className="font-medium px-4">
        <h2 className="text-lg font-Calistoga">
          Grade {stage.gradeLevel} ({stage.name})
        </h2>
        <div className="block mb-3">
          {unweightedGPA ? (
            <button className="text-sm text-left bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md break-words transition px-2 py-[0.055rem] mr-0.5 md:mr-1 mt-2">
              {unweightedGPA.toFixed(2)} GPA
            </button>
          ) : (
            <></>
          )}

          {weightedGPA ? (
            <button className="text-sm text-left bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md break-words transition px-2 py-[0.055rem] mr-0.5 md:mr-1 mt-2">
              {weightedGPA.toFixed(2)} Weighted GPA
            </button>
          ) : (
            <></>
          )}

          {stage?.difficulty ? (
            <button className="text-sm text-left bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md break-words transition px-2 py-[0.055rem] mr-0.5 md:mr-1 mt-2">
              {stage?.difficulty.toFixed(2)} Difficulty
            </button>
          ) : (
            <></>
          )}
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
