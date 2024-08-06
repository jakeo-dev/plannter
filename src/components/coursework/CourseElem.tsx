import ItemOptions from "@/components/ItemOptions";
import { Course } from "@/types";

export default function CourseElem({
  course,
  onEdit,
  onTrash,
}: {
  course: Course;
  onEdit: () => void;
  onTrash: () => void;
}) {
  function getAdvLevelClass(advLevel: string) {
    if (advLevel == "2" || advLevel == "2.01") {
      return "text-indigo-800/80 dark:text-indigo-300";
    } else if (advLevel == "3") {
      return "text-amber-700/90 dark:text-amber-300";
    } else if (advLevel == "3.5" || advLevel == "3.51") {
      return "text-red-800/80 dark:text-red-300";
    } else if (advLevel == "4") {
      return "text-blue-800/80 dark:text-blue-400";
    } else if (advLevel == "5") {
      return "text-sky-800/80 dark:text-sky-400";
    } else {
      return "hidden";
    }
  }

  function getAdvLevelText(advLevel: string) {
    if (advLevel == "2") {
      return "Advanced";
    } else if (advLevel == "2.01") {
      return "Accelerated";
    } else if (advLevel == "3") {
      return "Honors";
    } else if (advLevel == "3.5") {
      return "College Prep";
    } else if (advLevel == "3.51") {
      return "Dual Enrollment";
    } else if (advLevel == "4") {
      return "AP";
    } else if (advLevel == "5") {
      return "IB";
    } else {
      return "";
    }
  }

  function getDifficultyText(difficulty: string) {
    if (difficulty == "0.25") {
      return "Effortless";
    } else if (difficulty == "0.5") {
      return "Easy";
    } else if (difficulty == "1.5") {
      return "Difficult";
    } else if (difficulty == "1.75") {
      return "Challenging";
    } else {
      return "";
    }
  }

  return (
    <li className="item">
      <div
        className={`attr ${
          !course.scores?.firstSemester ? "hidden" : ""
        }bg-gray-500 text-gray-100 rounded-md px-2 mx-0 mr-2 mt-0`}
      >
        {course.scores?.firstSemester.letterGrade == "Use percent"
          ? course.scores?.firstSemester.percentGrade + "%"
          : course.scores?.firstSemester.letterGrade}
      </div>
      <div
        className={`attr ${
          !course.scores?.secondSemester ? "hidden" : ""
        } bg-gray-500 text-gray-100 rounded-md px-2 mx-0 mr-2 mt-0`}
      >
        {course.scores?.secondSemester.letterGrade == "Use percent"
          ? course.scores?.secondSemester.percentGrade + "%"
          : course.scores?.secondSemester.letterGrade}
      </div>
      <span className="">{course.name}</span>
      <div
        className={`attr bg-transparent dark:bg-transparent ${getAdvLevelClass(
          String(course.advancementLevel)
        )} p-0 mt-0`}
      >
        {getAdvLevelText(String(course.advancementLevel))}
      </div>
      {/* <div className="attr block bg-transparent dark:bg-transparent text-gray-700 dark:text-gray-400 p-0 ml-0 mt-1">
        {props.subject.charAt(0).toUpperCase() + props.subject.slice(1)}
      </div> */}
      <div className="attr bg-transparent dark:bg-transparent text-gray-700 dark:text-gray-400 p-0 mt-0">
        {getDifficultyText(String(course.difficulty))}
      </div>

      <ItemOptions onEdit={onEdit} onTrash={onTrash} />
    </li>
  );
}
