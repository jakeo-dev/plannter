import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";

import { Essay, Folder } from "@/types";
import EssayElem from "./EssayElem";

function sortEssays(a: Essay, b: Essay) {
  const getStatusLevel = (status: string) => {
    if (status == "Pre-writing") return 5;
    else if (status == "Drafting") return 4;
    else if (status == "Revising") return 3;
    else if (status == "Editing") return 2;
    else if (status == "Proofreading") return 1;
    else if (status == "Finished") return 0;
    else return 6; // not started
  };

  // not started > pre-writing > outlining > drafting > revising > editing > proofreading > finished
  if (getStatusLevel(a.status) !== getStatusLevel(b.status)) {
    return getStatusLevel(b.status) - getStatusLevel(a.status);
  }

  const sortPaperLengths = (paperLengthA: number, paperLengthB: number) => {
    if (paperLengthA > paperLengthB) return 1;
    else if (paperLengthB > paperLengthA) return -1;
    else return 0;
  };

  // sort by length, shortest > longest
  return sortPaperLengths(a.paper.length, b.paper.length);
}

export default function FolderElem({
  folder,
  setActiveFolder,
  setActiveEssay,
  setFolder,
  setEditEssayVisible,
  addEssay,
}: {
  folder: Folder;
  setActiveFolder: Dispatch<SetStateAction<Folder | null>>;
  setActiveEssay: Dispatch<SetStateAction<Essay | null>>;
  setFolder: (folder: Folder) => void;
  setEditEssayVisible: Dispatch<SetStateAction<boolean>>;
  addEssay: (essay: Essay, activeFolder: Folder) => void;
}) {
  return (
    <div>
      <div className="font-medium px-4">
        <h2 className="text-lg font-Calistoga mb-3">Essays</h2>
      </div>
      <ul className="lg:grid lg:grid-cols-2 gap-3">
        {(Object.values(folder?.essays || {}) as Essay[])
          .sort(sortEssays)
          .map((essay) => (
            <EssayElem
              key={essay.uuid}
              essay={essay}
              onEdit={() => {
                setActiveEssay(essay);
                setActiveFolder(folder);
                setEditEssayVisible(true);
              }}
              onTrash={() => {
                if (
                  confirm("Are you sure you want to remove " + essay.name + "?")
                ) {
                  const newFolder = JSON.parse(
                    JSON.stringify(folder)
                  ) as Folder;

                  if (newFolder.essays && essay.uuid in newFolder.essays) {
                    delete newFolder.essays[essay.uuid];
                  }

                  setFolder(newFolder);
                }
              }}
            />
          ))}
      </ul>
      <button
        className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
        onClick={() => {
          setActiveFolder(folder);

          let currentDate = new Date();

          const newEssay: Essay = {
            uuid: crypto.randomUUID(),
            name: "Enter a prompt",
            paper: "",
            status: "Not started",
            notes: "",
            min: -1,
            max: -1,
            linkedColleges: [],
            lastEdited: {
              year: currentDate.getFullYear(),
              month: currentDate.getMonth(),
              day: currentDate.getDate(),
              hour: currentDate.getHours(),
              minute: currentDate.getMinutes(),
              second: currentDate.getSeconds(),
            },
          };

          addEssay(newEssay, folder);
          setActiveEssay(newEssay);

          setEditEssayVisible(true);
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-1" />
        Write an essay
      </button>
    </div>
  );
}
