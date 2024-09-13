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
  let linkedCollegesText = "";
  if (essay.linkedColleges && essay.linkedColleges.length > 0) {
    for (let i = 0; i < essay?.linkedColleges.length; i++) {
      linkedCollegesText += essay?.linkedColleges[i].label + ", ";
    }
    linkedCollegesText = linkedCollegesText.slice(0, -2);
  }

  return (
    <div
      onClick={onEdit}
      className="item h-[13.1rem] lg:h-[15.5rem] xl:h-[13.1rem] lg:bg-gray-100 lg:odd:bg-gray-100 lg:[&:nth-child(4n)]:bg-gray-200 lg:[&:nth-child(4n+1)]:bg-gray-200 lg:hover:bg-gray-300 lg:hover:[&:nth-child(4n)]:bg-gray-300 lg:hover:[&:nth-child(4n+1)]:bg-gray-300 dark:lg:bg-gray-900 dark:lg:odd:bg-gray-900 dark:lg:[&:nth-child(4n)]:bg-gray-800 dark:lg:[&:nth-child(4n+1)]:bg-gray-800 dark:lg:hover:bg-gray-700 dark:lg:hover:odd:bg-gray-700 dark:lg:hover:[&:nth-child(4n)]:bg-gray-700 dark:lg:hover:[&:nth-child(4n+1)]:bg-gray-700 rounded-t-md rounded-b-md border-t-2 border-b-2 last:odd:mb-3 last:even:mb-3 mb-3 lg:mb-0 lg:[&:nth-last-child(2)]:odd:mb-3"
    >
      <span className="line-clamp-2 overflow-ellipsis break-words pr-7 md:pr-6">
        <FontAwesomeIcon icon={faPaperclip} className="mr-2" />
        {essay.name.trim()}
      </span>
      <span
        className={`line-clamp-3 overflow-ellipsis ${
          essay.paper.trim().length < 1 ? "italic" : ""
        } text-gray-600 dark:text-gray-400 text-sm md:text-sm break-words mt-1`}
      >
        {essay.paper.trim().length > 0
          ? essay.paper.trim()
          : "You haven't written anything yet"}
      </span>

      <div className="absolute bottom-3 text-xs text-gray-600 dark:text-gray-400 pr-3.5 md:pr-4 mt-3">
        <span
          className={`line-clamp-2 overflow-ellipsis break-words mb-2 ${
            linkedCollegesText ? "" : "italic"
          }`}
        >
          {linkedCollegesText ? linkedCollegesText : ""}
        </span>

        <div className="flex lg:block xl:flex leading-5 items-center gap-2">
          <span
            className={`${essay.status ? "" : "hidden"} ${
              essay.status == "Finished"
                ? "text-white dark:text-black bg-emerald-700/80 dark:bg-emerald-400/80 rounded-[0.25rem] px-[0.35rem] md:py-0 lg:py-[0.08rem] xl:py-0"
                : ""
            }`}
          >
            {essay.status}
          </span>
          <span className={essay.status ? "lg:hidden xl:block" : "hidden"}>
            •
          </span>
          <div>
            <span>{essay.min && essay.min != -1 ? `${essay.min} / ` : ""}</span>
            <span
              className={
                (wordCount(essay.paper) > essay.max && essay.max != -1) ||
                (wordCount(essay.paper) < essay.min && essay.min != -1)
                  ? "text-red-700 dark:text-red-400"
                  : ""
              }
            >
              {wordCount(essay.paper)} word
              {wordCount(essay.paper) != 1 ? "s" : ""}
            </span>
            <span>{essay.max && essay.max != -1 ? ` / ${essay.max}` : ""}</span>
          </div>
          <span className={essay.lastEdited ? "lg:hidden xl:block" : "hidden"}>
            •
          </span>
          <span className={essay.lastEdited ? "" : "hidden"}>
            {`Edited ${monthName(essay.lastEdited?.month || -1)?.substring(
              0,
              3
            )} 
        ${essay.lastEdited?.day}, 
        ${essay.lastEdited?.year}`}
          </span>
        </div>
      </div>

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
