import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

type ItemOptionsProps = {
  onEdit: () => void;
  onTrash: (event: React.MouseEvent) => void;
};

export default function ItemOptions(props: ItemOptionsProps) {
  return (
    <div className="flex gap-2.5 items-center absolute top-4 right-4 text-right float-right">
      {/* <button
        onClick={(e) => {
          props.onEdit?.(); // calls props.onEdit if it exists
          e.preventDefault();
        }}
      >
        <FontAwesomeIcon
          icon={faPen}
          className="text-black/30 dark:text-white/30 hover:text-black/50 dark:hover:text-white/50 active:text-black/70 dark:active:text-white/70 transition"
        />
      </button> */}
      <button
        onClick={(e) => {
          props.onTrash?.(e); // calls props.onTrash if it exists
        }}
        className="flex"
      >
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="text-lg leading-none text-black/30 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 active:text-red-600 dark:active:text-red-500 transition"
        />
      </button>
    </div>
  );
}
