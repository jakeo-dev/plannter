import ItemOptions from "@/components/ItemOptions";
import { College } from "@/types";
import { deadlineClassName, deadlineText, statusColor } from "@/utility";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function CollegeElem({
  college,
  onStatusChange,
  onStatusClicked,
  onEdit,
  onTrash,
}: {
  college: College;
  onStatusChange: (college: College) => void;
  onStatusClicked: () => void;
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

  const [statusInput, setStatusInput] = useState(
    college?.status || "Considering"
  );

  useEffect(() => {
    setStatusInput(college?.status || "Considering");
  }, [college]);

  useEffect(() => {
    const updatedCollege: College = {
      uuid: college.uuid,
      name: college.name,
      location: college.location,
      chance: college.chance,
      deadline: {
        day: college.deadline.day,
        month: college.deadline.month,
        year: college.deadline.year,
      },
      status: statusInput,
    };

    onStatusChange(updatedCollege);
  }, [statusInput]);

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
          (college.status == "Considering" || college.status == "Applying") &&
          college.deadline.day != -1 &&
          college.deadline.month != -1 &&
          college.deadline.year != -1
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
        <select
          onClick={onStatusClicked}
          onChange={(e) => setStatusInput(e.currentTarget.value)}
          value={statusInput}
          className={`${statusColor(
            statusInput
          )} lightArrowsSelect dark:darkArrowsSelect text-sm text-gray-100 dark:text-gray-900 rounded-md pl-2.5 pr-3.5 py-[0.1875rem] transition`}
        >
          <optgroup label="Select a category">
            <option value="Considering">Considering</option>
            <option value="Applying">Applying</option>
            <option value="Applied">Applied</option>
            <option value="Accepted">Accepted</option>
            <option value="Deferred">Deferred</option>
            <option value="Waitlisted">Waitlisted</option>
            <option value="Denied">Denied</option>
          </optgroup>
        </select>
      </div>

      <ItemOptions onEdit={onEdit} onTrash={onTrash} />
    </li>
  );
}
