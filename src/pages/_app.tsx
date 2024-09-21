import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Lexend } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect, useState } from "react";

import {
  GPASettings,
  Stages,
  Strengths,
  Groups,
  Folders,
  Ranks,
  GradDate,
} from "@/types";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import ChangeGPAModal from "@/components/ChangeGPAModal";
import ImportDataModal from "@/components/ImportDataModal";
import EditGradDateModal from "@/components/EditGradDateModal";
config.autoAddCss = false;

const lexend = Lexend({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [smallScreenMenuVis, setSmallScreenMenuVis] = useState("invisibleFade");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // convert local storage from old plannter to new plannter
    if (
      typeof window !== "undefined" &&
      typeof localStorage.getItem("stages") !== "string"
    ) {
      console.log("OLD PLANNTER DETECTED, CONVERTING OLD TO NEW");

      const containsNumber = (str: string | null): boolean => {
        return str ? /\d/.test(str) : false;
      };

      /* * * * * * EXPORT COURSEWORK * * * * * */
      const allCoursesData: Record<string, any> = {};

      for (let gradeLevel = 9; gradeLevel <= 13; gradeLevel++) {
        const stageName =
          gradeLevel === 9
            ? "Freshman"
            : gradeLevel === 10
            ? "Sophomore"
            : gradeLevel === 11
            ? "Junior"
            : gradeLevel === 12
            ? "Senior"
            : "Other";
        const currentItems =
          document
            .getElementById(`list${gradeLevel}`)
            ?.getElementsByTagName("li") ?? [];
        const courses: Record<string, any> = {};

        for (let j = 0; j < currentItems.length; j++) {
          const course = currentItems[j];
          const courseId = course.id;
          const newCourseId = crypto.randomUUID();

          const courseData = {
            uuid: newCourseId,
            name: localStorage.getItem(`${courseId}Name`),
            advancementLevel: parseFloat(
              localStorage.getItem(`${courseId}Diff`) ?? "0"
            ),
            difficulty: parseFloat(
              localStorage.getItem(`${courseId}Diff2`) ?? "0"
            ),
            scores: {
              firstSemester: {
                letterGrade:
                  localStorage.getItem(`${courseId}Grade`) === "none"
                    ? "none"
                    : localStorage
                        .getItem(`${courseId}Grade`)
                        ?.substring(0, 2)
                        .trim(),
                percentGrade: containsNumber(
                  localStorage.getItem(`${courseId}Grade`)
                )
                  ? Number(
                      localStorage
                        .getItem(`${courseId}Grade`)
                        ?.slice(-3)
                        .replace("%", "")
                        .trim()
                    )
                  : -1,
              },
              secondSemester: {
                letterGrade:
                  localStorage.getItem(`${courseId}Grade2`) === "none"
                    ? "none"
                    : localStorage
                        .getItem(`${courseId}Grade2`)
                        ?.substring(0, 2)
                        .trim(),
                percentGrade: containsNumber(
                  localStorage.getItem(`${courseId}Grade2`)
                )
                  ? Number(
                      localStorage
                        .getItem(`${courseId}Grade2`)
                        ?.slice(-3)
                        .replace("%", "")
                        .trim()
                    )
                  : -1,
              },
            },
          };

          courses[newCourseId] = courseData;
        }

        allCoursesData[stageName] = {
          name: stageName,
          gradeLevel,
          courses,
        };
      }

      const finalFormattedCourseworkString = JSON.stringify(allCoursesData);

      /* * * * * * EXPORT TESTS * * * * * */
      const allTests: Record<string, any> = {};
      const currentTests =
        document.getElementById("listTests")?.getElementsByTagName("li") ?? [];

      for (let j = 0; j < currentTests.length; j++) {
        const test = currentTests[j];
        const testId = test.id;
        const newTestId = crypto.randomUUID();

        const testData = {
          uuid: newTestId,
          name: localStorage.getItem(`${testId}Name`),
          type: localStorage.getItem(`${testId}Species`),
          subType:
            localStorage.getItem(`${testId}SubSpecies`) ||
            localStorage.getItem(`${testId}SpeciesOther`),
          month: localStorage.getItem(`${testId}Month`),
          year: localStorage.getItem(`${testId}Year`),
          score: parseInt(localStorage.getItem(`${testId}Score`) ?? "-1"),
          readScore: parseInt(
            localStorage.getItem(`${testId}ReadingScore`) ?? "-1"
          ),
          mathScore: parseInt(
            localStorage.getItem(`${testId}MathScore`) ?? "-1"
          ),
        };

        allTests[newTestId] = testData;
      }

      const finalFormattedTestsString = JSON.stringify({
        All: { name: "All", level: 1, tests: allTests },
      });

      /* * * * * * EXPORT ACTIVITIES * * * * * */
      const allActivities: Record<string, any> = {};
      let order = 0;

      for (let strengthLevel = 1; strengthLevel <= 3; strengthLevel++) {
        const currentItems =
          document
            .getElementById(`listActs${strengthLevel}`)
            ?.getElementsByTagName("li") ?? [];

        for (let j = 0; j < currentItems.length; j++) {
          const activity = currentItems[j];
          const activityId = activity.id;
          const newActivityId = crypto.randomUUID();

          const activityData = {
            uuid: newActivityId,
            name: localStorage.getItem(`${activityId}Name`),
            description: localStorage.getItem(`${activityId}Desc`),
            category: localStorage.getItem(`${activityId}Category`),
            order,
          };

          allActivities[newActivityId] = activityData;
          order++;
        }
      }

      const finalFormattedActivitiesString = JSON.stringify({
        All: { name: "All", level: 1, activities: allActivities },
      });

      /* * * * * * EXPORT ESSAYS * * * * * */
      const allEssays: Record<string, any> = {};
      const currentEssays =
        document.getElementById("listEssays")?.getElementsByTagName("li") ?? [];

      for (let j = 0; j < currentEssays.length; j++) {
        const essay = currentEssays[j];
        const essayId = essay.id;
        const newEssayId = crypto.randomUUID();

        const essayData = {
          uuid: newEssayId,
          name: localStorage.getItem(`${essayId}Prompt`),
          paper: localStorage.getItem(`${essayId}EssayText`),
          lastEdited: {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDate(),
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            second: new Date().getSeconds(),
          },
        };

        allEssays[newEssayId] = essayData;
      }

      const finalFormattedEssaysString = JSON.stringify({
        All: { name: "All", level: 1, essays: allEssays },
      });

      /* * * * * EXPORT COLLEGES * * * * * */
      const allColleges: Record<string, any> = {};

      for (let rankLevel = 1; rankLevel <= 3; rankLevel++) {
        const rankName =
          rankLevel === 1 ? "Reach" : rankLevel === 2 ? "Target" : "Safety";
        const currentItems =
          document
            .getElementById(`listColleges${rankLevel}`)
            ?.getElementsByTagName("li") ?? [];
        const colleges: Record<string, any> = {};

        for (let j = 0; j < currentItems.length; j++) {
          const college = currentItems[j];
          const collegeId = college.id;
          const newCollegeId = crypto.randomUUID();

          const collegeData = {
            uuid: newCollegeId,
            name: localStorage.getItem(`${collegeId}Name`),
            location: localStorage.getItem(`${collegeId}Location`),
            chance: localStorage.getItem(`${collegeId}Chances`)
              ? parseFloat(localStorage.getItem(`${collegeId}Chances`) ?? "-1")
              : -1,
            deadline: {
              day: parseInt(localStorage.getItem(`${collegeId}DueDay`) ?? "-1"),
              month:
                parseInt(localStorage.getItem(`${collegeId}DueMonth`) ?? "-1") -
                1,
              year: parseInt(
                localStorage.getItem(`${collegeId}DueYear`) ?? "-1"
              ),
            },
            status:
              (localStorage.getItem(`${collegeId}Status`) ?? "")
                .charAt(0)
                .toUpperCase() +
              (localStorage.getItem(`${collegeId}Status`) ?? "").slice(1),
          };

          colleges[newCollegeId] = collegeData;
        }

        allColleges[rankName] = {
          name: rankName,
          level: rankLevel,
          colleges,
        };
      }

      const finalFormattedCollegesString = JSON.stringify(allColleges);

      /* * * * * EXPORT GPA CALCULATION * * * * * */
      const gpaCalculation = {
        usePlusMinus: localStorage.getItem("gpaPlusMinus"),
        noneWeight: 0,
        advancedWeight: Number(localStorage.getItem("advWeight")),
        honorsWeight: Number(localStorage.getItem("honWeight")),
        collegeWeight: Number(localStorage.getItem("colWeight")),
        apWeight: Number(localStorage.getItem("apWeight")),
        ibWeight: Number(localStorage.getItem("ibWeight")),
      };

      const finalFormattedGpaCalculationString = JSON.stringify(gpaCalculation);

      localStorage.clear();

      localStorage.setItem("stages", finalFormattedCourseworkString);
      setStages(JSON.parse(finalFormattedCourseworkString));

      localStorage.setItem("groups", finalFormattedTestsString);
      setGroups(JSON.parse(finalFormattedTestsString));

      localStorage.setItem("strengths", finalFormattedActivitiesString);
      setStrengths(JSON.parse(finalFormattedActivitiesString));

      localStorage.setItem("folders", finalFormattedEssaysString);
      setFolders(JSON.parse(finalFormattedEssaysString));

      localStorage.setItem("ranks", finalFormattedCollegesString);
      setRanks(JSON.parse(finalFormattedCollegesString));

      localStorage.setItem("gpaWeights", finalFormattedGpaCalculationString);
      setGPASettings(JSON.parse(finalFormattedGpaCalculationString));
    }

    const isDarkMode =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    if (typeof localStorage.getItem("gpaWeights") === "string") {
      setGPASettings(JSON.parse(localStorage.getItem("gpaWeights") as string));
    }

    if (typeof localStorage.getItem("gradDate") === "string") {
      setGradDate(JSON.parse(localStorage.getItem("gradDate") as string));
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
    All: {
      name: "All",
      level: 1,
    },
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

  const [gradDate, setGradDate] = useState<GradDate>({
    year: -1,
    month: 0,
    day: 1,
  });

  const [changeGPAVis, setChangeGPAVis] = useState(false);
  const [importDataVis, setImportDataVis] = useState(false);
  const [editGradDateVis, setEditGradDateVis] = useState(false);

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
        setImportDataVis={setImportDataVis}
        setEditGradDateVis={setEditGradDateVis}
        gradDate={gradDate}
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

      <ImportDataModal
        importDataVisible={importDataVis}
        setImportDataVisible={setImportDataVis}
        setStages={setStages}
        setGroups={setGroups}
        setStrengths={setStrengths}
        setFolders={setFolders}
        setRanks={setRanks}
        setGPASettings={setGPASettings}
      />

      <EditGradDateModal
        editGradDateVisible={editGradDateVis}
        setEditGradDateVisible={setEditGradDateVis}
        gradDate={gradDate}
        saveGradDate={(updatedGradDate: GradDate) => {
          const newGradDate = JSON.parse(
            JSON.stringify(updatedGradDate)
          ) as GradDate; // make a deep copy

          localStorage.setItem("gradDate", JSON.stringify(newGradDate));
          setGradDate(newGradDate);
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
          gradDate={gradDate}
          setChangeGPAVis={setChangeGPAVis}
          setImportDataVis={setImportDataVis}
          setEditGradDateVis={setEditGradDateVis}
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
          gradDate={gradDate}
        />
      </div>
    </main>
  );
}
