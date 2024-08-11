import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";

import { Activity, Strength } from "@/types";
import ActivityElem from "./ActivityElem";

export default function StrengthElem({
  strength,
  setActiveStrength,
  setActiveActivity,
  setStrength,
  setCurrentStrengthName,
  setAddActivityVisible,
  setEditActivityVisible,
}: {
  strength: Strength;
  setActiveStrength: Dispatch<SetStateAction<Strength | null>>;
  setActiveActivity: Dispatch<SetStateAction<Activity | null>>;
  setStrength: (strength: Strength) => void;
  setCurrentStrengthName: Dispatch<SetStateAction<string>>;
  setAddActivityVisible: Dispatch<SetStateAction<boolean>>;
  setEditActivityVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div>
      <div className="font-medium px-4">
        <h2 className="text-lg font-Calistoga mb-3">
          {`${strength.name} Activities`}
        </h2>
      </div>
      <ul className="lg:grid lg:grid-cols-2 gap-3">
        {(Object.values(strength?.activities || {}) as Activity[]).map(
          (activity) => (
            <ActivityElem
              key={activity.uuid}
              activity={activity}
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

                  if (
                    newStrength.activities &&
                    activity.uuid in newStrength.activities
                  ) {
                    delete newStrength.activities[activity.uuid];
                  }

                  setStrength(newStrength);
                }
              }}
            />
          )
        )}
      </ul>
      <button
        className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
        onClick={() => {
          setActiveStrength(strength);
          setAddActivityVisible(true);
          setCurrentStrengthName(strength.name || "");
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-1" />
        Add a {strength.name.toLocaleLowerCase()} activity
      </button>
    </div>
  );
}
