import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

type CourseProps = {
  onEdit: () => void;
  onTrash: () => void;
};

export default function Course(props: CourseProps) {
  return (
    <div className="flex gap-2.5 absolute top-3 right-4 text-right float-right">
      <button
        onClick={(e) => {
          props.onEdit?.(); // calls props.onEdit if it exists
          e.preventDefault();
        }}
      >
        <FontAwesomeIcon
          icon={faPen}
          className="text-black/30 hover:text-black/50 active:text-black/70 transition"
        />
      </button>
      <button
        onClick={(e) => {
          props.onTrash?.(); // calls props.onTrash if it exists
          e.preventDefault();
        }}
      >
        <FontAwesomeIcon
          icon={faTrash}
          className="text-black/30 hover:text-red-500 active:text-red-600 transition"
        />
      </button>
    </div>
  );
}
