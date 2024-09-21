import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";

import { Activity, Strength } from "@/types";
import ActivityElem from "./ActivityElem";

function sortActivities(a: Activity, b: Activity) {
  // sort by order number
  return a.order - b.order;
}

export default function StrengthElem({
  strength,
  setActiveStrength,
  setActiveActivity,
  setStrength,
  setAddActivityVisible,
  setEditActivityVisible,
}: {
  strength: Strength;
  setActiveStrength: Dispatch<SetStateAction<Strength | null>>;
  setActiveActivity: Dispatch<SetStateAction<Activity | null>>;
  setStrength: (strength: Strength) => void;
  setAddActivityVisible: Dispatch<SetStateAction<boolean>>;
  setEditActivityVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div>
      <div className="font-medium px-4">
        <h2 className="text-lg font-Calistoga mb-3">Activities</h2>
      </div>
      <ul>
        {(Object.values(strength?.activities || {}) as Activity[])
          .sort(sortActivities)
          .map((activity) => (
            <ActivityElem
              key={activity.uuid}
              activity={activity}
              numActivities={
                strength.activities
                  ? Object.values(strength.activities).length
                  : 0
              }
              onMoveUp={() => {
                const newStrength = JSON.parse(
                  JSON.stringify(strength)
                ) as Strength;

                if (newStrength.activities) {
                  // move the activity that is one above the selected activity down by one
                  const activitiesArray = Object.values(
                    newStrength.activities
                  ).sort((a: Activity, b: Activity) => {
                    // sort by order number
                    return a.order - b.order;
                  });
                  newStrength.activities[
                    activitiesArray[activity.order - 1].uuid
                  ].order =
                    newStrength.activities[
                      activitiesArray[activity.order - 1].uuid
                    ].order + 1;

                  // move the selected activity up by one
                  newStrength.activities[activity.uuid].order =
                    newStrength.activities[activity.uuid].order - 1;
                }

                setStrength(newStrength);
              }}
              onMoveDown={() => {
                const newStrength = JSON.parse(
                  JSON.stringify(strength)
                ) as Strength;

                if (newStrength.activities) {
                  // move the activity that is one above the selected activity up by one
                  const activitiesArray = Object.values(
                    newStrength.activities
                  ).sort((a: Activity, b: Activity) => {
                    // sort by order number
                    return a.order - b.order;
                  });
                  newStrength.activities[
                    activitiesArray[activity.order + 1].uuid
                  ].order =
                    newStrength.activities[
                      activitiesArray[activity.order + 1].uuid
                    ].order - 1;

                  // move the selected activity down by one
                  newStrength.activities[activity.uuid].order =
                    newStrength.activities[activity.uuid].order + 1;
                }

                setStrength(newStrength);
              }}
              onEdit={() => {
                setActiveActivity(activity);
                setActiveStrength(strength);
                setEditActivityVisible(true);
              }}
              onTrash={() => {
                if (
                  confirm(
                    "Are you sure you want to remove " + activity.name + "?"
                  )
                ) {
                  const newStrength = JSON.parse(
                    JSON.stringify(strength)
                  ) as Strength;

                  let deletedActivityOrder = 0;

                  if (
                    newStrength.activities &&
                    activity.uuid in newStrength.activities
                  ) {
                    deletedActivityOrder =
                      newStrength.activities[activity.uuid].order;
                    delete newStrength.activities[activity.uuid];
                  }

                  if (newStrength.activities) {
                    const activitiesArray = Object.values(
                      newStrength.activities
                    ).sort((a: Activity, b: Activity) => {
                      // sort by order number
                      return a.order - b.order;
                    });

                    for (
                      let i = deletedActivityOrder + 1;
                      i < activitiesArray.length + 1;
                      i++
                    ) {
                      newStrength.activities[
                        activitiesArray[i - 1].uuid
                      ].order =
                        newStrength.activities[activitiesArray[i - 1].uuid]
                          .order - 1;
                    }
                  }

                  setStrength(newStrength);
                }
              }}
            />
          ))}
      </ul>
      <button
        className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
        onClick={() => {
          setActiveStrength(strength);
          setAddActivityVisible(true);
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-1" />
        Add an activity
      </button>
    </div>
  );
}
