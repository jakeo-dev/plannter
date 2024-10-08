import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction, useState } from "react";

import { College, Rank, Ranks } from "@/types";
import CollegeElem from "./CollegeElem";

export default function RankElem({
  rank,
  setActiveRank,
  setActiveCollege,
  setRank,
  setCurrentRankName,
  activeRank,
  setRanks,
  ranks,
  setAddCollegeVisible,
  setEditCollegeVisible,
}: {
  rank: Rank;
  setActiveRank: Dispatch<SetStateAction<Rank | null>>;
  setActiveCollege: Dispatch<SetStateAction<College | null>>;
  setRank: (rank: Rank) => void;
  setCurrentRankName: Dispatch<SetStateAction<string>>;
  activeRank: Rank | null;
  setRanks: Dispatch<SetStateAction<Ranks>>;
  ranks: Ranks;
  setAddCollegeVisible: Dispatch<SetStateAction<boolean>>;
  setEditCollegeVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div>
      <div className="font-medium px-4">
        <h2 className="text-lg font-Calistoga mb-3">
          {`${rank.name} Colleges`}
        </h2>
      </div>
      <ul>
        {(Object.values(rank?.colleges || {}) as College[]).map((college) => (
          <CollegeElem
            key={college.uuid}
            college={college}
            onStatusChange={(updatedCollege: College) => {
              if (!activeRank) return;

              const newRanks = JSON.parse(JSON.stringify(ranks)) as Ranks; // make a deep copy
              const currentRank = newRanks[activeRank.name];
              if (!currentRank.colleges) return;

              currentRank.colleges[updatedCollege.uuid] = updatedCollege;
              setRanks(newRanks);
              localStorage.setItem("ranks", JSON.stringify(newRanks));
            }}
            onStatusClicked={() => {
              setActiveRank(rank);
            }}
            onEdit={() => {
              setActiveCollege(college);
              setActiveRank(rank);
              setEditCollegeVisible(true);
            }}
            onTrash={() => {
              if (
                confirm("Are you sure you want to remove " + college.name + "?")
              ) {
                const newRank = JSON.parse(JSON.stringify(rank)) as Rank;

                if (newRank.colleges && college.uuid in newRank.colleges) {
                  delete newRank.colleges[college.uuid];
                }

                setRank(newRank);
              }
            }}
          />
        ))}
      </ul>
      <button
        className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
        onClick={() => {
          setActiveRank(rank);
          setAddCollegeVisible(true);
          setCurrentRankName(rank.name || "");
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-1" />
        Add a {rank.name.toLocaleLowerCase()} college
      </button>
    </div>
  );
}
