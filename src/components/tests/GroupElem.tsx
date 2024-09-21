import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";

import { Test, Group } from "@/types";
import TestElem from "./TestElem";

function sortTests(a: Test, b: Test) {
  const getTypeLevel = (type: string) => {
    if (type == "ACT") return 6;
    else if (type == "SAT") return 5;
    else if (type == "PreACT") return 4;
    else if (type == "PSAT") return 3;
    else if (type == "AP") return 2;
    else if (type == "IB") return 1;
    else return 0; // other
  };

  // act > sat > preact > psat > ap > ib > other
  if (getTypeLevel(a.type) !== getTypeLevel(b.type)) {
    return getTypeLevel(b.type) - getTypeLevel(a.type);
  }

  // sort alphabetically
  return a.subType.localeCompare(b.subType);
}

export default function GroupElem({
  group,
  setActiveGroup,
  setActiveTest,
  setGroup,
  setAddTestVisible,
  setEditTestVisible,
}: {
  group: Group;
  setActiveGroup: Dispatch<SetStateAction<Group | null>>;
  setActiveTest: Dispatch<SetStateAction<Test | null>>;
  setGroup: (group: Group) => void;
  setAddTestVisible: Dispatch<SetStateAction<boolean>>;
  setEditTestVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div>
      <div className="font-medium px-4">
        <h2 className="text-lg font-Calistoga mb-3">Tests</h2>
      </div>
      <ul>
        {(Object.values(group?.tests || {}) as Test[])
          .sort(sortTests)
          .map((test) => (
            <TestElem
              key={test.uuid}
              test={test}
              onEdit={() => {
                setActiveTest(test);
                setActiveGroup(group);
                setEditTestVisible(true);
              }}
              onTrash={() => {
                if (
                  confirm("Are you sure you want to remove " + test.name + "?")
                ) {
                  const newGroup = JSON.parse(JSON.stringify(group)) as Group;

                  if (newGroup.tests && test.uuid in newGroup.tests) {
                    delete newGroup.tests[test.uuid];
                  }

                  setGroup(newGroup);
                }
              }}
            />
          ))}
      </ul>
      <button
        className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
        onClick={() => {
          setActiveGroup(group);
          setAddTestVisible(true);
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-1" />
        Add a test
      </button>
    </div>
  );
}
