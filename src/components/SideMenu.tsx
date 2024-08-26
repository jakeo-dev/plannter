import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport,
  faHourglassHalf,
  faSun,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Course,
  GPASettings,
  Grade,
  Stages,
  Activity,
  Strengths,
  Test,
  Groups,
  Folders,
  Ranks,
} from "@/types";
import {
  calculateWeights,
  getLetter,
  getOverallDifficultyText,
  letterToGPA,
} from "@/utility";

type SideMenuProps = {
  stages: Stages;
  strengths: Strengths;
  groups: Groups;
  folders: Folders;
  ranks: Ranks;
  gpaSettings: GPASettings;
  smallScreenMenuVis: string;
  setChangeGPAVis: Dispatch<SetStateAction<boolean>>;
};

function Statistic({
  number,
  title,
  decimal = true,
}: {
  number: number;
  title: string;
  decimal?: boolean;
}) {
  if (!number) return <></>;

  return (
    <button className="inline-block whitespace-nowrap w-full text-sm text-left bg-transparent hover:bg-gray-300 dark:hover:bg-gray-800 rounded-md text-gray-700 dark:text-gray-400 transition pl-2 pr-4 py-[0.055rem] my-1.5 -ml-2">
      <span className="text-base font-bold">
        {decimal ? number.toFixed(2) : number}
      </span>
      {` ${title}`}
    </button>
  );
}

export default function SideMenu(props: SideMenuProps) {
  const router = useRouter();
  const [unweightedGPA, setUnweightedGPA] = useState(0);
  const [weightedGPA, setWeightedGPA] = useState(0);
  const [difficulty, setDifficulty] = useState(0);

  function Tab(props: { name: string; url: string }) {
    const styles =
      router.pathname === props.url
        ? "bg-emerald-600/30"
        : "hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50";

    return (
      <Link
        className={
          "planBtns block w-full text-left text-gray-600 dark:text-gray-400 rounded-r-full px-6 py-3 md:px-7 transition " +
          styles
        }
        href={props.url}
      >
        <span>{props.name}</span>
      </Link>
    );
  }

  useEffect(() => {
    if (!props.stages || Object.keys(props.stages).length == 0) {
      setUnweightedGPA(0);
      setWeightedGPA(0);
      setDifficulty(0);
      return;
    }

    let unweightedSum = 0;
    let weightedSum = 0;
    let numGrades = 0;
    let numSemesters = 0;
    let numFilledStages = 0;
    let cumStageDifficultySum = 0;

    for (const stageKey in props.stages) {
      const stage = props.stages[stageKey as keyof Stages];

      let difficultySum = 0;

      if (stage.courses && Object.keys(stage.courses).length > 0) {
        const processSemester = (
          course: Course,
          semester: Grade | undefined
        ) => {
          if (semester?.letterGrade && semester.letterGrade != "none") {
            const letterGrade =
              semester.percentGrade !== -1
                ? getLetter(semester.percentGrade)
                : semester.letterGrade;

            const gpa = letterToGPA(
              letterGrade,
              props.gpaSettings["usePlusMinus"]
            );

            unweightedSum += gpa;
            weightedSum +=
              gpa +
              calculateWeights(props.gpaSettings, course.advancementLevel);
            numGrades++;
          }
          if (numSemesters % 2 == 0)
            difficultySum += course.advancementLevel * course.difficulty;
          numSemesters++;
        };

        for (const course of Object.values(stage.courses)) {
          processSemester(course, course.scores?.firstSemester);
          processSemester(course, course.scores?.secondSemester);
        }

        if (Object.keys(stage.courses).length != 0) numFilledStages++;

        cumStageDifficultySum +=
          (difficultySum + 1.175 ** Object.keys(stage.courses).length) / 6;
      }
    }

    setUnweightedGPA(unweightedSum / numGrades);
    setWeightedGPA(weightedSum / numGrades);
    setDifficulty(cumStageDifficultySum / numFilledStages);
  }, [
    props.gpaSettings,
    props.stages,
    props.strengths,
    props.groups,
    props.folders,
    props.ranks,
  ]);

  return (
    <>
      <div
        id="menuDiv"
        className={`${props.smallScreenMenuVis} md:visibleFade fixed overflow-y-scroll md:overflow-y-clip bg-gray-100 dark:bg-gray-900 text-lg font-extrabold border-r-2 border-gray-300 md:border-gray-200 dark:border-gray-700 md:dark:border-gray-800 shadow-2xl h-full z-20 pt-8 pb-36 md:pb-0 md:static md:top-28 md:bg-transparent md:shadow-none md:z-auto md:block w-3/4 md:w-1/3 lg:w-[29%] md:pt-28`}
      >
        <div className="font-Calistoga pr-4">
          <h2 className="text-sm text-gray-500 px-6 md:px-7 mb-2">
            High School
          </h2>
          <Tab name="Coursework" url="/coursework" />
          <Tab name="Tests" url="/tests" />
          <Tab name="Extracurriculars" url="/extracurriculars" />
          <h2 className="text-sm text-gray-500 px-6 md:px-7 mb-2 mt-6">
            Application
          </h2>
          <Tab name="Essays" url="/essays" />
          <Tab name="Colleges" url="/colleges" />
        </div>

        <div className="border-t-2 border-gray-300 md:border-gray-200 dark:border-gray-700 md:dark:border-gray-800 my-4"></div>

        <div className="block w-min font-medium px-6 md:px-7 mt-0">
          <Statistic number={unweightedGPA} title="GPA (Cumulative)" />
          <Statistic number={weightedGPA} title="Weighted GPA (Cumulative)" />
          <Statistic
            number={difficulty}
            title={getOverallDifficultyText(difficulty)}
          />

          {/* <Statistic number={} title="Extracurriculars" />
          <Statistic number={} title="Test Scores" /> */}
          <button
            className={`${
              unweightedGPA ? "" : "hidden "
            } font-normal text-xs text-left bg-gray-300/70 hover:bg-gray-300 dark:bg-gray-700/60 dark:hover:bg-gray-700 hover:shadow-sm active:shadow-none rounded-md px-2 py-1 mt-2 md:mt-3 transition`}
            onClick={() => props.setChangeGPAVis(true)}
          >
            Does your GPA not look right?
          </button>
        </div>

        <div className="block md:hidden border-t-2 border-gray-300 md:border-gray-200 dark:border-gray-700 md:dark:border-gray-800 my-4"></div>

        <div className="block md:hidden text-base md:text-lg font-medium pr-4">
          <button
            className="block w-full text-left text-gray-600 dark:text-gray-400/80 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 mt-4 transition"
            /* onClick="openCD()" */
          >
            <FontAwesomeIcon icon={faHourglassHalf} className="mr-2" />
            <span>Edit countdown</span>
          </button>
          <button
            className="block w-full text-left text-gray-600 dark:text-gray-400/80 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
            onClick={() => {
              if (localStorage.getItem("theme") === "dark") {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
              } else {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
              }
            }}
          >
            <FontAwesomeIcon icon={faSun} className="mr-2" />
            <span className="dark:hidden">Toggle dark mode</span>
            <span className="hidden dark:inline">Toggle light mode</span>
          </button>
          <button
            className="block w-full text-left text-gray-600 dark:text-gray-400/80 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
            onClick={() => {
              props.setChangeGPAVis(true);
            }}
          >
            <FontAwesomeIcon icon={faWrench} className="mr-2" />
            <span>Change GPA calculation</span>
          </button>
          <button
            className="block w-full text-left text-gray-600 dark:text-gray-400/80 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
            /* onClick={} */
          >
            <FontAwesomeIcon icon={faFileImport} className="mr-2" />
            <span>Import data from old Plannter</span>
          </button>
        </div>
      </div>
    </>
  );
}
