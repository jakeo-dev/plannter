import ItemOptions from "@/components/ItemOptions";
import { College } from "@/types";
import { deadlineClassName, deadlineText, statusColor } from "@/utility";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CollegeElem({
  college,
  onEdit,
  onTrash,
}: {
  college: College;
  onEdit: () => void;
  onTrash: () => void;
}) {
  const currentYear = new Date().getFullYear();
  const currentMonth = Number(
    String(new Date().getMonth() + 1).padStart(2, "0")
  );
  const currentDay = Number(String(new Date().getDate()).padStart(2, "0"));
  const currentDate = new Date(currentYear, currentMonth - 1, currentDay);
  const oneDay = 24 * 60 * 60 * 1000; // hours * mins * secs * millisecs

  const deadline = new Date(
    college.deadline?.year,
    college.deadline?.month,
    college.deadline?.day
  );
  let daysTilDeadline = Math.round(
    Math.abs((deadline.getTime() - currentDate.getTime()) / oneDay)
  );

  return (
    <li className="item border-t-2 rounded-t-md border-b-2 rounded-b-md pr-14 md:pr-16 mb-3">
      <FontAwesomeIcon icon={faBuildingColumns} className="mr-2" />
      <span>{college.name}</span>
      <span className="block md:inline text-gray-600 dark:text-gray-400 text-sm p-0 m-0 md:ml-2 mt-1">
        {college.location}
      </span>
      <span
        className={`${
          college.chance && college.chance >= 0 ? "block" : "hidden"
        } text-gray-600 dark:text-gray-400 text-sm p-0 m-0 mt-1`}
      >
        {college.chance}% chance
      </span>
      <span
        className={`${deadlineClassName(
          daysTilDeadline,
          deadline.getTime(),
          currentDate.getTime()
        )} ${
          college.status == "Considering" || college.status == "Applying"
            ? "block"
            : "hidden"
        } text-gray-600 dark:text-gray-400 text-sm p-0 m-0 mt-1`}
      >
        {deadlineText(
          daysTilDeadline,
          deadline.getTime(),
          currentDate.getTime()
        )}
      </span>
      <div className="block mt-2">
        <span
          className={`${statusColor(
            college.status
          )} text-sm text-gray-100 dark:text-gray-900 rounded-md px-2.5 py-1 transition`}
        >
          {college.status}
        </span>
      </div>

      <ItemOptions onEdit={onEdit} onTrash={onTrash} />
    </li>
  );
}
