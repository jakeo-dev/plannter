import ItemOptions from "@/components/ItemOptions";

type CourseProps = {
  id: number;
  name: string;
  grade1: string;
  grade2: string;
  percentGrade1: string;
  percentGrade2: string;
  advLevel: string;
  gradeLevel: string;
  difficulty: string;
  subject: string;
  onEdit: () => void;
  onTrash: () => void;
};

export default function Course(props: CourseProps) {
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
          props.grade1 == "none" || props.grade1 == "" ? "hidden" : ""
        } bg-gray-500 text-gray-100 rounded-md px-2 mx-0 mr-2 mt-0`}
      >
        {props.grade1 == "Use percent"
          ? props.percentGrade1 + "%"
          : props.grade1}
      </div>
      <div
        className={`attr ${
          props.grade2 == "none" || props.grade2 == "" ? "hidden" : ""
        } bg-gray-500 text-gray-100 rounded-md px-2 mx-0 mr-2 mt-0`}
      >
        {props.grade2 == "Use percent"
          ? props.percentGrade2 + "%"
          : props.grade2}
      </div>
      <span className="">{props.name}</span>
      <div
        className={`attr bg-transparent dark:bg-transparent ${getAdvLevelClass(
          props.advLevel
        )} p-0 mt-0`}
      >
        {getAdvLevelText(props.advLevel)}
      </div>
      {/* <div className="attr block bg-transparent dark:bg-transparent text-gray-700 dark:text-gray-400 p-0 ml-0 mt-1">
        {props.subject.charAt(0).toUpperCase() + props.subject.slice(1)}
      </div> */}
      <div className="attr bg-transparent dark:bg-transparent text-gray-700 dark:text-gray-400 p-0 mt-0">
        {getDifficultyText(props.difficulty)}
      </div>

      <ItemOptions onEdit={props.onEdit} onTrash={props.onTrash} />
    </li>
  );
}
