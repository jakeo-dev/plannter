import { Activity } from "@/types";
import { getActivityIcon } from "@/utility";
import {
  faArrowCircleDown,
  faArrowCircleUp,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActivityElem({
  activity,
  numActivities,
  onMoveUp,
  onMoveDown,
  onEdit,
  onTrash,
}: {
  activity: Activity;
  numActivities: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
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
      className="item border-t-2 rounded-t-md border-b-2 rounded-b-md mb-3"
    >
      <span className="block pr-20 md:pr-20">
        <FontAwesomeIcon
          icon={getActivityIcon(activity.category)}
          className="mr-2"
          aria-label={activity.category}
          aria-hidden="true"
        />
        {activity.name}
      </span>
      <span
        className={`block text-gray-600 dark:text-gray-400 text-sm break-words whitespace-pre-wrap ${
          activity.description != "" ? "mt-1" : ""
        }`}
      >
        {activity.description}
      </span>

      <div
        className={`text-gray-600 dark:text-gray-400 text-sm gap-2 mt-1 ${
          activity.hoursPerWeek &&
          activity.weeksPerYear &&
          activity.hoursPerWeek != -1 &&
          activity.weeksPerYear != -1
            ? "flex items-center"
            : "hidden"
        }`}
      >
        <span className="block break-words">{activity.hoursPerWeek} hr/wk</span>
        <span>•</span>
        <span className="block break-words">{activity.weeksPerYear} wk/yr</span>
      </div>

      {/* item options */}
      <div className="flex gap-2.5 items-center absolute top-4 right-4 text-right float-right">
        {/* <div className="flex leading-none text-gray-600 dark:text-gray-400">
          {activity.order != null ? activity.order + 1 : ""}
        </div> */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp();
          }}
          className={activity.order < 1 ? "hidden" : "flex"}
        >
          <FontAwesomeIcon
            icon={faArrowCircleUp}
            className="text-lg leading-none text-black/30 dark:text-white/30 hover:text-gray-500 dark:hover:text-gray-400 active:text-gray-600 dark:active:text-gray-300 transition"
          />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown();
          }}
          className={activity.order > numActivities - 2 ? "hidden" : "flex"}
        >
          <FontAwesomeIcon
            icon={faArrowCircleDown}
            className="text-lg leading-none text-black/30 dark:text-white/30 hover:text-gray-500 dark:hover:text-gray-400 active:text-gray-600 dark:active:text-gray-300 transition"
          />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTrash();
          }}
          className="flex"
        >
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="text-lg leading-none text-black/30 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 active:text-red-600 dark:active:text-red-500 transition"
          />
        </button>
      </div>
    </div>
  );
}
