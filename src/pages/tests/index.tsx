import { Dispatch, SetStateAction, useState } from "react";

import CommonHead from "@/components/CommonHead";

import GroupElem from "@/components/tests/GroupElem";
import { Test, Group, Groups } from "@/types";
import AddTestModal from "@/components/tests/modals/AddTestModal";
import EditTestModal from "@/components/tests/modals/EditTestModal";

export default function Extracurriculars({
  groups,
  setGroups,
}: {
  groups: Groups;
  setGroups: Dispatch<SetStateAction<Groups>>;
}) {
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [activeTest, setActiveTest] = useState<Test | null>(null);

  const [addTestVisible, setAddTestVisible] = useState(false);
  const [editTestVisible, setEditTestVisible] = useState(false);

  return (
    <>
      <CommonHead>
        <title>Plannter: Tests</title>
      </CommonHead>

      <AddTestModal
        addTestVisible={addTestVisible}
        setAddTestVisible={setAddTestVisible}
        addTest={(newTest: Test) => {
          if (!activeGroup) return;

          const newGroups = JSON.parse(
            JSON.stringify(groups)
          ) as Groups; // make a deep copy
          const currentGroup = newGroups[activeGroup.name];

          if (!currentGroup.tests) {
            currentGroup.tests = {};
          }
          currentGroup.tests[newTest.uuid] = newTest;

          setGroups(newGroups);
          localStorage.setItem("groups", JSON.stringify(newGroups));
        }}
      />

      <EditTestModal
        editTestVisible={editTestVisible}
        setEditTestVisible={setEditTestVisible}
        test={activeTest}
        saveTest={(updatedTest: Test) => {
          if (!activeGroup) return;
          if (!activeTest) return;

          const newGroups = JSON.parse(
            JSON.stringify(groups)
          ) as Groups; // make a deep copy
          const currentGroup = newGroups[activeGroup.name];
          if (!currentGroup.tests) return;

          currentGroup.tests[activeTest.uuid] = updatedTest;
          setGroups(newGroups);
          localStorage.setItem("groups", JSON.stringify(newGroups));
        }}
      />

      <div className="w-full overflow-y-scroll px-4 md:px-8 lg:px-16 xl:px-32 md:pt-28 md:pb-28 mt-8 md:mt-0 flex flex-col gap-12">
        {(Object.values(groups) as Group[]).map((group) => (
          <GroupElem
            key={group.name}
            group={group}
            setActiveGroup={setActiveGroup}
            setActiveTest={setActiveTest}
            setAddTestVisible={setAddTestVisible}
            setEditTestVisible={setEditTestVisible}
            setGroup={(group: Group) => {
              const newGroups = JSON.parse(
                JSON.stringify(groups)
              ) as Groups; // make a deep copy

              newGroups[group.name] = group;
              setGroups(newGroups);
              localStorage.setItem("groups", JSON.stringify(newGroups));
            }}
          />
        ))}
      </div>
    </>
  );
}
