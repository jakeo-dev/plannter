import ItemOptions from "@/components/ItemOptions";

type CourseProps = {
  id: number;
  type: string;
  subType: string;
  month: string;
  year: number;
  score: number;
  readScore: number;
  mathScore: number;
  onEdit: () => void;
  onTrash: () => void;
};

export default function Course(props: CourseProps) {
  return (
    <li className="item">
      <div
        className={`attr ${
          props.score != -1 ? "" : "hidden"
        } bg-gray-500 text-gray-100 rounded-md px-2 mr-2 mt-0`}
      >
        {props.score}
      </div>
      <span>
        {props.type != "Other" ? props.type : ""}
        {/* if type isn't other, show the type */}
        {props.type != "Other" && props.subType != "" ? " " : ""}
        {/* if type isn't other and a sub type exists, put a space between them */}
        {props.subType != "" ? props.subType : ""} ({props.month} {props.year})
        {/* if a sub type exists, show the sub type; also show the month and year */}
      </span>
      <div
        className={`${
          props.readScore != -1 ? "block" : "hidden"
        } text-gray-600 dark:text-gray-400 text-sm p-0 m-0 mt-1`}
      >
        Reading: {props.readScore}
      </div>
      <div
        className={`${
          props.mathScore != -1 ? "block" : "hidden"
        } text-gray-600 dark:text-gray-400 text-sm p-0 m-0 mt-1`}
      >
        Math: {props.mathScore}
      </div>

      <ItemOptions onEdit={props.onEdit} onTrash={props.onTrash} />
    </li>
  );
}
