import ItemOptions from "@/components/ItemOptions";
import { Essay } from "@/types";
import { wordCount, monthName } from "@/utility";
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
    <li className="item border-t-2 rounded-t-md border-b-2 rounded-b-md mb-3">
      <span className="block pr-12 md:pr-11">
        <FontAwesomeIcon icon={faPaperclip} className="mr-2" />
        {essay.name.substring(0, 150).trim()}
        {essay.name.length > 150 ? "..." : ""}
      </span>
      <span
        className={`${
          essay.name.length > 150 || essay.paper.length > 300 ? "" : "pr-16"
        } ${
          essay.paper.trim().length < 1 ? "italic" : ""
        } block whitespace-pre-wrap text-gray-600 dark:text-gray-400 text-sm md:text-sm break-words mt-1`}
      >
        {essay.paper.trim().length > 0
          ? essay.paper.substring(0, 300).trim()
          : "You haven't written anything yet"}
        {essay.paper.length > 300 ? "..." : ""}
      </span>

      <div
        className={`${
          essay.name.length > 150 || essay.paper.length > 300
            ? "bottom-4"
            : "bottom-3"
        }  flex text-xs text-gray-600 dark:text-gray-400 gap-2 mt-3`}
      >
        <span>{essay.status}</span>
        <span>•</span>
        <span>
          {wordCount(essay.paper)} word{wordCount(essay.paper) != 1 ? "s" : ""}
        </span>
        <span>•</span>
        <span>
          {`Edited ${monthName(essay.lastEdited?.month || -1)?.substring(0, 3)} 
        ${essay.lastEdited?.day}, 
        ${essay.lastEdited?.year}`}
        </span>
      </div>

      <ItemOptions onEdit={onEdit} onTrash={onTrash} />
    </li>
  );
}
