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
  Strengths,
  Test,
  Groups,
  Folders,
  Ranks,
  GradDate,
} from "@/types";
import {
  calculateWeights,
  getLetter,
  getOverallDifficultyText,
  indexOfGreatestNumber,
  letterToGPA,
} from "@/utility";

type SideMenuProps = {
  stages: Stages;
  strengths: Strengths;
  groups: Groups;
  folders: Folders;
  ranks: Ranks;
  gpaSettings: GPASettings;
  gradDate: GradDate;
  smallScreenMenuVis: string;
  setChangeGPAVis: Dispatch<SetStateAction<boolean>>;
  setImportDataVis: Dispatch<SetStateAction<boolean>>;
  setEditGradDateVis: Dispatch<SetStateAction<boolean>>;
};

function Statistic({
  number,
  title,
  decimals,
}: {
  number: number;
  title: string;
  decimals: number;
}) {
  if (!number) return <></>;

  return (
    <div
      className={`${
        number > 0 ? `inline-block` : `hidden`
      } whitespace-nowrap w-full text-sm text-left bg-transparent rounded-md text-gray-700 dark:text-gray-400 transition pl-2 pr-4 my-1.5 -ml-2`}
    >
      <span className="text-base font-bold">{number.toFixed(decimals)}</span>
      {` ${title}`}
    </div>
  );
}

export default function SideMenu(props: SideMenuProps) {
  const router = useRouter();
  const [unweightedGPA, setUnweightedGPA] = useState(0);
  const [weightedGPA, setWeightedGPA] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [bestSAT, setBestSAT] = useState(0);
  const [bestACT, setBestACT] = useState(0);
  const [favoredTest, setFavoredTest] = useState(0);

  const [graduationText, setGraduationText] = useState("Edit countdown");

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = Number(
      String(new Date().getMonth() + 1).padStart(2, "0")
    );
    const currentDay = Number(String(new Date().getDate()).padStart(2, "0"));
    const currentDate = new Date(currentYear, currentMonth - 1, currentDay);
    const oneDay = 24 * 60 * 60 * 1000; // hours * mins * secs * millisecs

    const gradDateObject = new Date(
      props.gradDate?.year,
      props.gradDate?.month,
      props.gradDate?.day
    );
    let daysTilGrad = Math.round(
      (gradDateObject.getTime() - currentDate.getTime()) / oneDay
    );

    if (daysTilGrad < 0) setGraduationText("Edit countdown");
    else if (daysTilGrad == 0) setGraduationText("Happy graduation!");
    else if (daysTilGrad > 0) setGraduationText(daysTilGrad + " days");
  }, [props.gradDate]);

  function Tab(props: { name: string; url: string }) {
    const styles =
      router.pathname === props.url
        ? "bg-emerald-600/30"
        : "hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/60 dark:active:bg-gray-600/50";

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

    if (!props.groups || Object.keys(props.groups).length == 0) {
      setBestSAT(0);
      setBestACT(0);
      setFavoredTest(0);
      return;
    }

    // calculate cumulative unweighted gpa, weighted gpa, and difficulty
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

    // find highest test
    const findFavoredTest = (satScore: number, actScore: number) => {
      // returns 0 if SAT is favored, 1 if ACT is favored
      let convertedACT =
        0.000047 * actScore ** 5 -
        0.0047 * actScore ** 4 +
        0.1955 * actScore ** 3 -
        4.61 * actScore ** 2 +
        98.3 * actScore -
        45.8;
      // equation generated by chatgpt based on data from https://compassprep.com/concordance-and-conversion-sat-and-act-scores/

      if (satScore < 550 && actScore < 8) return 0;
      else if (satScore > convertedACT) return 0;
      else if (satScore < convertedACT) return 1;
      else return -1;
    };

    for (const groupKey in props.groups) {
      const group = props.groups[groupKey as keyof Groups];

      let allSATs = [] as number[];
      let allACTs = [] as number[];

      if (group.tests && Object.keys(group.tests).length > 0) {
        for (const test of Object.values(group.tests)) {
          if (test.type == "SAT") allSATs.push(test.score);
          else if (test.type == "ACT") allACTs.push(test.score);
        }

        let highestSAT = allSATs[indexOfGreatestNumber(allSATs)];
        let highestACT = allACTs[indexOfGreatestNumber(allACTs)];
        setBestSAT(highestSAT);
        setBestACT(highestACT);
        setFavoredTest(findFavoredTest(highestSAT || 0, highestACT || 0));
      }
    }
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
          <Tab name="Activities" url="/activities" />
          <h2 className="text-sm text-gray-500 px-6 md:px-7 mb-2 mt-6">
            Application
          </h2>
          <Tab name="Essays" url="/essays" />
          <Tab name="Colleges" url="/colleges" />
        </div>

        <div className="border-t-2 border-gray-300 md:border-gray-200 dark:border-gray-700 md:dark:border-gray-800 my-4"></div>

        <div className="block w-min font-medium px-6 md:px-7 mt-0">
          <Statistic
            number={unweightedGPA}
            title="GPA (Cumulative)"
            decimals={2}
          />
          <Statistic
            number={weightedGPA}
            title="Weighted GPA (Cumulative)"
            decimals={2}
          />
          <Statistic
            number={difficulty}
            title={getOverallDifficultyText(difficulty)}
            decimals={2}
          />
          <Statistic
            number={
              favoredTest == 1 ? bestACT : favoredTest == 0 ? bestSAT : -1
            }
            title={favoredTest == 1 ? "ACT" : favoredTest == 0 ? "SAT" : ""}
            decimals={0}
          />
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
            className="block w-full text-left text-gray-600 dark:text-gray-400/80 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/60 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 mt-4 transition"
            onClick={() => {
              props.setEditGradDateVis(true);
            }}
          >
            <FontAwesomeIcon
              icon={faHourglassHalf}
              aria-label="Edit graduation countdown"
              title="Edit graduation countdown"
              className="mr-2"
            />
            <span>{graduationText}</span>
          </button>
          <button
            className="block w-full text-left text-gray-600 dark:text-gray-400/80 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/60 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
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
            className="block w-full text-left text-gray-600 dark:text-gray-400/80 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/60 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
            onClick={() => {
              props.setChangeGPAVis(true);
            }}
          >
            <FontAwesomeIcon icon={faWrench} className="mr-2" />
            <span>Change GPA calculation</span>
          </button>
          <button
            className="block w-full text-left text-gray-600 dark:text-gray-400/80 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/60 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
            onClick={() => {
              props.setImportDataVis(true);
            }}
          >
            <FontAwesomeIcon icon={faFileImport} className="mr-2" />
            <span>Import data</span>
          </button>
        </div>
      </div>
    </>
  );
}
