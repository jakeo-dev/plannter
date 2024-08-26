import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Lexend } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect, useState } from "react";

import { GPASettings, Stages, Strengths, Groups, Folders, Ranks } from "@/types";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import ChangeGPAModal from "@/components/ChangeGPAModal";
config.autoAddCss = false;

const lexend = Lexend({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [smallScreenMenuVis, setSmallScreenMenuVis] = useState("invisibleFade");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDarkMode =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    if (typeof localStorage.getItem("gpaWeights") === "string") {
      setGPASettings(JSON.parse(localStorage.getItem("gpaWeights") as string));
    }

    if (typeof localStorage.getItem("stages") === "string") {
      setStages(JSON.parse(localStorage.getItem("stages") as string));
    }

    if (typeof localStorage.getItem("strengths") === "string") {
      setStrengths(JSON.parse(localStorage.getItem("strengths") as string));
    }

    if (typeof localStorage.getItem("groups") === "string") {
      setGroups(JSON.parse(localStorage.getItem("groups") as string));
    }

    if (typeof localStorage.getItem("folders") === "string") {
      setFolders(JSON.parse(localStorage.getItem("folders") as string));
    }

    if (typeof localStorage.getItem("ranks") === "string") {
      setRanks(JSON.parse(localStorage.getItem("ranks") as string));
    }
  }, []);

  const [stages, setStages] = useState<Stages>({
    Freshman: {
      name: "Freshman",
      gradeLevel: 9,
    },
    Sophomore: { name: "Sophomore", gradeLevel: 10 },
    Junior: { name: "Junior", gradeLevel: 11 },
    Senior: { name: "Senior", gradeLevel: 12 },
    Other: { name: "Other", gradeLevel: 13 },
  });

  const [strengths, setStrengths] = useState<Strengths>({
    Major: {
      name: "Major",
      level: 1,
    },
    Moderate: { name: "Moderate", level: 2 },
    Minor: { name: "Minor", level: 3 },
  });

  const [groups, setGroups] = useState<Groups>({
    All: {
      name: "All",
      level: 1,
    },
  });

  const [folders, setFolders] = useState<Folders>({
    All: {
      name: "All",
      level: 1,
    },
  });

  const [ranks, setRanks] = useState<Ranks>({
    Reach: {
      name: "Reach",
      level: 1,
    },
    Target: { name: "Target", level: 2 },
    Safety: { name: "Safety", level: 3 },
  });

  const [gpaSettings, setGPASettings] = useState<GPASettings>({
    usePlusMinus: false,
    noneWeight: 0,
    advancedWeight: 0,
    acceleratedWeight: 0,
    honorsWeight: 0.5,
    collegeWeight: 0,
    dualWeight: 0,
    apWeight: 1,
    ibWeight: 1,
  });

  const [changeGPAVis, setChangeGPAVis] = useState(false);

  return (
    <main className={lexend.className}>
      <Header
        onSmallScreenMenuClick={() => {
          if (smallScreenMenuVis == "invisibleFade")
            setSmallScreenMenuVis("visibleFade");
          else if (smallScreenMenuVis == "visibleFade")
            setSmallScreenMenuVis("invisibleFade");
        }}
        setChangeGPAVis={setChangeGPAVis}
      />

      <ChangeGPAModal
        changeGPAVisible={changeGPAVis}
        setChangeGPAVisible={setChangeGPAVis}
        gpaSettings={gpaSettings}
        saveGPASettings={(updatedGPASettings: GPASettings) => {
          const newGPASettings = JSON.parse(
            JSON.stringify(updatedGPASettings)
          ) as GPASettings; // make a deep copy

          localStorage.setItem("gpaWeights", JSON.stringify(newGPASettings));
          setGPASettings(newGPASettings);
        }}
      />

      <div className="flex h-full md:h-screen">
        <SideMenu
          smallScreenMenuVis={smallScreenMenuVis}
          stages={stages}
          strengths={strengths}
          groups={groups}
          folders={folders}
          ranks={ranks}
          gpaSettings={gpaSettings}
          setChangeGPAVis={setChangeGPAVis}
        />
        <Component
          {...pageProps}
          stages={stages}
          setStages={setStages}
          strengths={strengths}
          setStrengths={setStrengths}
          groups={groups}
          setGroups={setGroups}
          folders={folders}
          setFolders={setFolders}
          ranks={ranks}
          setRanks={setRanks}
          gpaSettings={gpaSettings}
        />
      </div>
    </main>
  );
}
