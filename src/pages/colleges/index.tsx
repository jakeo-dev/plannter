import { Dispatch, SetStateAction, useState } from "react";

import CommonHead from "@/components/CommonHead";

import RankElem from "@/components/colleges/RankElem";
import { College, Rank, Ranks } from "@/types";
import AddCollegeModal from "@/components/colleges/modals/AddCollegeModal";
import EditCollegeModal from "@/components/colleges/modals/EditCollegeModal";

export default function Colleges({
  ranks,
  setRanks,
}: {
  ranks: Ranks;
  setRanks: Dispatch<SetStateAction<Ranks>>;
}) {
  const [activeRank, setActiveRank] = useState<Rank | null>(null);
  const [activeCollege, setActiveCollege] = useState<College | null>(null);

  const [currentRankName, setCurrentRankName] = useState("");

  const [addCollegeVisible, setAddCollegeVisible] = useState(false);
  const [editCollegeVisible, setEditCollegeVisible] = useState(false);

  return (
    <>
      <CommonHead>
        <title>Plannter: Colleges</title>
      </CommonHead>

      <AddCollegeModal
        addCollegeVisible={addCollegeVisible}
        setAddCollegeVisible={setAddCollegeVisible}
        currentRankName={currentRankName}
        addCollege={(newCollege: College) => {
          if (!activeRank) return;

          const newRanks = JSON.parse(
            JSON.stringify(ranks)
          ) as Ranks; // make a deep copy
          const currentRank = newRanks[activeRank.name];

          if (!currentRank.colleges) {
            currentRank.colleges = {};
          }
          currentRank.colleges[newCollege.uuid] = newCollege;

          setRanks(newRanks);
          localStorage.setItem("ranks", JSON.stringify(newRanks));
        }}
      />

      <EditCollegeModal
        editCollegeVisible={editCollegeVisible}
        setEditCollegeVisible={setEditCollegeVisible}
        currentRankName={currentRankName}
        college={activeCollege}
        saveCollege={(updatedCollege: College) => {
          if (!activeRank) return;
          if (!activeCollege) return;

          const newRanks = JSON.parse(
            JSON.stringify(ranks)
          ) as Ranks; // make a deep copy
          const currentRank = newRanks[activeRank.name];
          if (!currentRank.colleges) return;

          currentRank.colleges[activeCollege.uuid] = updatedCollege;
          setRanks(newRanks);
          localStorage.setItem("ranks", JSON.stringify(newRanks));
        }}
      />

      <div className="w-full overflow-y-scroll px-4 md:px-8 lg:px-16 xl:px-32 md:pt-28 md:pb-20 mt-8 md:mt-0 flex flex-col gap-12">
        {(Object.values(ranks) as Rank[]).map((rank) => (
          <RankElem
            key={rank.name}
            rank={rank}
            setActiveRank={setActiveRank}
            setActiveCollege={setActiveCollege}
            setAddCollegeVisible={setAddCollegeVisible}
            setEditCollegeVisible={setEditCollegeVisible}
            setCurrentRankName={setCurrentRankName}
            setRank={(rank: Rank) => {
              const newRanks = JSON.parse(
                JSON.stringify(ranks)
              ) as Ranks; // make a deep copy

              newRanks[rank.name] = rank;
              setRanks(newRanks);
              localStorage.setItem("ranks", JSON.stringify(newRanks));
            }}
          />
        ))}
      </div>
    </>
  );
}
