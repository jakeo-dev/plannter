import ItemOptions from "@/components/ItemOptions";
import { Course } from "@/types";
import {
  getAdvLevelColor,
  getAdvLevelText,
  getIndividualDifficultyText,
} from "@/utility";

export default function CourseElem({
  course,
  onEdit,
  onTrash,
}: {
  course: Course;
  onEdit: () => void;
  onTrash: () => void;
}) {
  return (
    <li className="item pr-16">
      <div
        className={`attr ${
          course.scores?.firstSemester.letterGrade == "none" ? "hidden" : ""
        } bg-gray-500 text-gray-100 rounded-md px-2 mx-0 mr-2 mt-0`}
      >
        {course.scores?.firstSemester.letterGrade == "Use percent"
          ? course.scores?.firstSemester.percentGrade + "%"
          : course.scores?.firstSemester.letterGrade}
      </div>
      <div
        className={`attr ${
          course.scores?.secondSemester.letterGrade == "none" ? "hidden" : ""
        } bg-gray-500 text-gray-100 rounded-md px-2 mx-0 mr-2 mt-0`}
      >
        {course.scores?.secondSemester.letterGrade == "Use percent"
          ? course.scores?.secondSemester.percentGrade + "%"
          : course.scores?.secondSemester.letterGrade}
      </div>
      <span className="">{course.name}</span>
      <div
        className={`attr bg-transparent dark:bg-transparent ${getAdvLevelColor(
          String(course.advancementLevel)
        )} p-0 mt-0`}
      >
        {getAdvLevelText(String(course.advancementLevel))}
      </div>
      {/* <div className="attr block bg-transparent dark:bg-transparent text-gray-700 dark:text-gray-400 p-0 ml-0 mt-1">
        {props.subject.charAt(0).toUpperCase() + props.subject.slice(1)}
      </div> */}
      <div className="attr bg-transparent dark:bg-transparent text-gray-700 dark:text-gray-400 p-0 mt-0">
        {getIndividualDifficultyText(String(course.difficulty))}
      </div>

      <ItemOptions onEdit={onEdit} onTrash={onTrash} />
    </li>
  );
}
