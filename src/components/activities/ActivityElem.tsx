import ItemOptions from "@/components/ItemOptions";
import { Activity } from "@/types";
import { getActivityIcon } from "@/utility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActivityElem({
  activity,
  onEdit,
  onTrash,
}: {
  activity: Activity;
  onEdit: () => void;
  onTrash: () => void;
}) {
  return (
    <li className="item lg:bg-gray-100 lg:odd:bg-gray-100 lg:[&:nth-child(4n)]:bg-gray-200 lg:[&:nth-child(4n+1)]:bg-gray-200 lg:hover:bg-gray-300 lg:hover:[&:nth-child(4n)]:bg-gray-300 lg:hover:[&:nth-child(4n+1)]:bg-gray-300 dark:lg:bg-gray-900 dark:lg:odd:bg-gray-900 dark:lg:[&:nth-child(4n)]:bg-gray-800 dark:lg:[&:nth-child(4n+1)]:bg-gray-800 dark:lg:hover:bg-gray-700 dark:lg:hover:odd:bg-gray-700 dark:lg:hover:[&:nth-child(4n)]:bg-gray-700 dark:lg:hover:[&:nth-child(4n+1)]:bg-gray-700 lg:rounded-t-md lg:rounded-b-md lg:border-t-2 lg:border-b-2 last:odd:mb-3 last:even:mb-3 lg:[&:nth-last-child(2)]:odd:mb-3">
      <span className="block pr-12 md:pr-11">
        <FontAwesomeIcon
          icon={getActivityIcon(activity.category)}
          className="mr-2"
          aria-label={activity.category}
          aria-hidden="true"
        />
        {activity.name}
      </span>
      <span className="block text-gray-600 dark:text-gray-400 text-sm md:text-sm break-words mt-1">
        {activity.description}
      </span>

      <ItemOptions onEdit={onEdit} onTrash={onTrash} />
    </li>
  );
}
