import ItemOptions from "@/components/ItemOptions";
import { Essay } from "@/types";
import { wordCount, monthName } from "@/utility";
import {
  faChevronDown,
  faChevronUp,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function EssayElem({
  essay,
  onEdit,
  onTrash,
}: {
  essay: Essay;
  onEdit: () => void;
  onTrash: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="item border-t-2 rounded-t-md border-b-2 rounded-b-md mb-3">
      <span className="block pr-12 md:pr-11">
        <FontAwesomeIcon icon={faPaperclip} className="mr-2" />
        {expanded ? essay.name : `${essay.name.substring(0, 150).trim()}`}
        {essay.name.length > 150 && !expanded ? "..." : ""}
      </span>
      <span
        className={`${
          essay.name.length > 150 || essay.paper.length > 300 ? "" : "pr-16"
        } block whitespace-pre-wrap text-gray-600 dark:text-gray-400 text-sm md:text-sm break-words mt-1`}
      >
        {expanded ? essay.paper : `${essay.paper.substring(0, 300).trim()}`}
        {essay.paper.length > 300 && !expanded ? "..." : ""}
      </span>

      {/* <button
        onClick={() => (expanded ? setExpanded(false) : setExpanded(true))}
        className={`${
          essay.name.length > 150 || essay.paper.length > 300 ? "" : "hidden"
        } hover:bg-gray-400 active:bg-gray-500 dark:hover:bg-gray-600 dark:active:bg-gray-500 rounded-full text-sm text-left text-sky-800 hover:text-gray-100 active:text-gray-100 dark:text-sky-300/80 transition px-2.5 py-1 mt-3`}
      >
        <FontAwesomeIcon
          icon={expanded ? faChevronUp : faChevronDown}
          className="mr-1.5"
        />
        {expanded ? "Collapse essay" : "Expand essay"}
      </button> */}

      <div
        className={` ${
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
