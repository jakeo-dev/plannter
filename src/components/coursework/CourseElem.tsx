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
    <div onClick={onEdit} className="item pr-16">
      <div
        className={`attr ${
          course.scores?.firstSemester.letterGrade == "none" ? "hidden" : ""
        } bg-gray-500 text-gray-100 rounded-md px-2 mx-0 mr-2 mt-0`}
      >
        {course.scores?.firstSemester.letterGrade}{" "}
        {course.scores?.firstSemester.percentGrade != -1
          ? course.scores?.firstSemester.percentGrade + "%"
          : ""}
      </div>
      <div
        className={`attr ${
          course.scores?.secondSemester.letterGrade == "none" ? "hidden" : ""
        } bg-gray-500 text-gray-100 rounded-md px-2 mx-0 mr-2 mt-0`}
      >
        {course.scores?.secondSemester.letterGrade}{" "}
        {course.scores?.secondSemester.percentGrade != -1
          ? course.scores?.secondSemester.percentGrade + "%"
          : ""}
      </div>
      <span className="">{course.name}</span>
      <div
        className={`attr bg-transparent dark:bg-transparent ${getAdvLevelColor(
          String(course.advancementLevel)
        )} p-0 mt-0`}
      >
        {getAdvLevelText(String(course.advancementLevel))}
      </div>
      <div className="attr bg-transparent dark:bg-transparent text-gray-700 dark:text-gray-400 p-0 mt-0">
        {getIndividualDifficultyText(String(course.difficulty))}
      </div>
      {/* <div
        className={`attr ${
          course.subject ? "block" : "hidden"
        } bg-transparent dark:bg-transparent text-gray-700 dark:text-gray-400 p-0 ml-0 mt-1`}
      >
        {course.subject
          ? course.subject.charAt(0).toUpperCase() + course.subject.slice(1)
          : ""}
      </div> */}

      <ItemOptions
        onEdit={onEdit}
        onTrash={(e) => {
          e.stopPropagation();
          onTrash();
        }}
      />
    </div>
  );
}
