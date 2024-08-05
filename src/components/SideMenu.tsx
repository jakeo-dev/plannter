import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassHalf,
  faSun,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type SideMenuProps = {
  smallScreenMenuVis: string;
};

export default function SideMenu(props: SideMenuProps) {
  return (
    <>
      <div
        id="menuDiv"
        className={`${props.smallScreenMenuVis} md:visibleFade fixed overflow-y-scroll md:overflow-y-clip bg-gray-100 dark:bg-gray-900 text-lg font-extrabold border-r-2 border-gray-300 md:border-gray-200 dark:border-gray-700 md:dark:border-gray-800 shadow-2xl h-full z-20 pt-8 pb-36 md:pb-0 md:static md:top-28 md:bg-transparent md:shadow-none md:z-auto md:block w-3/4 md:w-[29%] md:pt-28`}
      >
        <div className="font-Calistoga pr-4">
          <h2 className="text-sm text-gray-500 px-6 md:px-7 mb-2">
            High School
          </h2>
          <Link
            className="planBtns block w-full text-left text-gray-700 dark:text-gray-300 bg-emerald-600/30 rounded-r-full px-6 py-3 md:px-7 transition"
            href="/coursework"
          >
            <span>Coursework</span>
          </Link>
          <Link
            className="planBtns block w-full text-left text-gray-600 dark:text-gray-400 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
            href="/tests"
          >
            <span>Tests</span>
          </Link>
          <Link
            className="planBtns block w-full text-left text-gray-600 dark:text-gray-400 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
            href="/extracurriculars"
          >
            <span>Extracurriculars</span>
          </Link>
          <h2 className="text-sm text-gray-500 px-6 md:px-7 mb-2 mt-6">
            Application
          </h2>
          <Link
            className="planBtns block w-full text-left text-gray-600 dark:text-gray-400 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
            href="/essays"
          >
            <span>Essays</span>
          </Link>
          <Link
            className="planBtns block w-full text-left text-gray-600 dark:text-gray-400 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
            href="/colleges"
          >
            <span>Colleges</span>
          </Link>
        </div>

        <div className="border-t-2 border-gray-300 md:border-gray-200 dark:border-gray-700 md:dark:border-gray-800 my-4"></div>

        <div className="block w-min font-medium px-6 md:px-7 mt-0">
          <button
            className="cumAttr hidden"
            /* onClick="openGPA()" */
          ></button>
          <button
            className="cumAttr hidden"
            /* onClick="openGPA()" */
          ></button>
          <button
            className="cumAttr hidden"
            /* onClick="openDiff()" */
          ></button>
          <button
            className="cumAttr hidden"
            /* onClick="openECStrength()" */
          ></button>
          <button
            className="cumAttr hidden"
            /* onClick="openFavoredTest()" */
          ></button>
          <button
            className="hidden font-normal text-xs bg-gray-300/70 hover:bg-gray-300 dark:bg-gray-700/60 dark:hover:bg-gray-700 hover:shadow-sm active:shadow-none rounded-md px-2 py-1 mt-2 md:mt-3 transition"
            /* onClick="openDoesGPANotLookRight()" */
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
            /* onClick="openChangeGPACalc()" */
          >
            <FontAwesomeIcon icon={faWrench} className="mr-2" />
            <span>Change GPA calculation</span>
          </button>
        </div>
      </div>
    </>
  );
}
