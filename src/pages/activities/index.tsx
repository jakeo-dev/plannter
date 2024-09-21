import { Dispatch, SetStateAction, useState } from "react";

import CommonHead from "@/components/CommonHead";

import StrengthElem from "@/components/activities/StrengthElem";
import { Activity, Strength, Strengths } from "@/types";
import AddActivityModal from "@/components/activities/modals/AddActivityModal";
import EditActivityModal from "@/components/activities/modals/EditActivityModal";

export default function Activities({
  strengths,
  setStrengths,
}: {
  strengths: Strengths;
  setStrengths: Dispatch<SetStateAction<Strengths>>;
}) {
  const [activeStrength, setActiveStrength] = useState<Strength | null>(null);
  const [activeActivity, setActiveActivity] = useState<Activity | null>(null);

  const [addActivityVisible, setAddActivityVisible] = useState(false);
  const [editActivityVisible, setEditActivityVisible] = useState(false);

  return (
    <>
      <CommonHead>
        <title>Plannter: Activities</title>
      </CommonHead>

      <AddActivityModal
        addActivityVisible={addActivityVisible}
        setAddActivityVisible={setAddActivityVisible}
        addActivity={(newActivity: Activity) => {
          if (!activeStrength) return;

          const newStrengths = JSON.parse(
            JSON.stringify(strengths)
          ) as Strengths; // make a deep copy
          const currentStrength = newStrengths[activeStrength.name];

          if (!currentStrength.activities) {
            currentStrength.activities = {};
          }
          currentStrength.activities[newActivity.uuid] = newActivity;

          setStrengths(newStrengths);
          localStorage.setItem("strengths", JSON.stringify(newStrengths));
        }}
        strengths={strengths}
        activeStrength={activeStrength}
      />

      <EditActivityModal
        editActivityVisible={editActivityVisible}
        setEditActivityVisible={setEditActivityVisible}
        activity={activeActivity}
        saveActivity={(updatedActivity: Activity) => {
          if (!activeStrength) return;
          if (!activeActivity) return;

          const newStrengths = JSON.parse(
            JSON.stringify(strengths)
          ) as Strengths; // make a deep copy
          const currentStrength = newStrengths[activeStrength.name];
          if (!currentStrength.activities) return;

          currentStrength.activities[activeActivity.uuid] = updatedActivity;
          setStrengths(newStrengths);
          localStorage.setItem("strengths", JSON.stringify(newStrengths));
        }}
      />

      <div className="w-full overflow-y-scroll px-4 md:px-8 lg:px-16 xl:px-32 md:pt-28 md:pb-28 mt-8 md:mt-0 flex flex-col gap-12">
        {(Object.values(strengths) as Strength[]).map((strength) => (
          <StrengthElem
            key={strength.name}
            strength={strength}
            setActiveStrength={setActiveStrength}
            setActiveActivity={setActiveActivity}
            setAddActivityVisible={setAddActivityVisible}
            setEditActivityVisible={setEditActivityVisible}
            setStrength={(strength: Strength) => {
              const newStrengths = JSON.parse(
                JSON.stringify(strengths)
              ) as Strengths; // make a deep copy

              newStrengths[strength.name] = strength;
              setStrengths(newStrengths);
              localStorage.setItem("strengths", JSON.stringify(newStrengths));
            }}
          />
        ))}
      </div>
    </>
  );
}
