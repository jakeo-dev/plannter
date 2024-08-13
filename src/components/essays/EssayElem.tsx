import ItemOptions from "@/components/ItemOptions";
import { Essay } from "@/types";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EssayElem({
  essay,
  onEdit,
  onTrash,
}: {
  essay: Essay;
  onEdit: () => void;
  onTrash: () => void;
}) {
  return (
    <li className="item">
      <span className="block pr-12 md:pr-11">
        <FontAwesomeIcon
          icon={faPaperclip}
          className="mr-2"
        />
        {essay.name}
      </span>
      <span
        className="block whitespace-pre-wrap text-gray-600 dark:text-gray-400 text-sm md:text-sm break-words mt-1"
      >
        {essay.paper}
      </span>

      <ItemOptions onEdit={onEdit} onTrash={onTrash} />
    </li>
  );
}
