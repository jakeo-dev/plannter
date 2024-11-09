import ItemOptions from "@/components/ItemOptions";
import { Test } from "@/types";

export default function TestElem({
  test,
  onEdit,
  onTrash,
}: {
  test: Test;
  onEdit: () => void;
  onTrash: () => void;
}) {
  return (
    <div
      onClick={onEdit}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onEdit();
      }}
      role="button"
      tabIndex={0}
      className="item"
    >
      <div className="block pr-7 md:pr-6">
        <div
          className={`attr ${
            test.score != -1 ? "" : "hidden"
          } bg-gray-500 text-gray-100 rounded-md px-2 mr-2 mt-0`}
        >
          {test.score}
        </div>
        <span>
          {test.type != "Other" ? test.type : ""}
          {/* if type isn't other, show the type */}
          {test.type != "Other" && test.subType != "" ? " " : ""}
          {/* if type isn't other and a sub type exists, put a space between them */}
          {test.subType != "" ? test.subType : ""} ({test.month} {test.year})
          {/* if a sub type exists, show the sub type; also show the month and year */}
        </span>
      </div>
      <div
        className={`${
          test.readScore != -1 ? "block" : "hidden"
        } text-gray-600 dark:text-gray-400 text-sm p-0 m-0 mt-1`}
      >
        Reading: {test.readScore}
      </div>
      <div
        className={`${
          test.mathScore != -1 ? "block" : "hidden"
        } text-gray-600 dark:text-gray-400 text-sm p-0 m-0 mt-1`}
      >
        Math: {test.mathScore}
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
