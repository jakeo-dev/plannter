import Link from "next/link";

export default function LargeSideMenu() {
  return (
    <>
      <div
        id="menuDiv"
        className="invisibleFade md:visibleFade fixed overflow-y-scroll md:overflow-y-clip bg-gray-100 dark:bg-gray-900 text-lg font-extrabold border-r-2 border-gray-300 md:border-gray-200 dark:border-gray-700 md:dark:border-gray-800 shadow-2xl h-full z-20  pt-8 pb-36 md:pb-0 md:static md:top-28 md:bg-transparent md:shadow-none md:z-auto md:block md:w-[29%] md:pt-28"
      >
        <div className="font-Calistoga pr-4">
          <h2 className="text-sm text-gray-500 px-6 md:px-7 mb-2">
            High School
          </h2>
          <Link
            className="planBtns block w-full text-left text-gray-700 dark:text-gray-300 bg-emerald-600/30 rounded-r-full px-6 py-3 md:px-7 transition"
            href={`/coursework`}
          >
            <span>Coursework</span>
          </Link>
          <Link
            className="planBtns block w-full text-left text-gray-600 dark:text-gray-400 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
            href={`/tests`}
          >
            <span>Tests</span>
          </Link>
          <Link
            className="planBtns block w-full text-left text-gray-600 dark:text-gray-400 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
            href={`/extracurriculars`}
          >
            <span>Extracurriculars</span>
          </Link>
          <h2 className="text-sm text-gray-500 px-6 md:px-7 mb-2 mt-6">
            Application
          </h2>
          <Link
            className="planBtns block w-full text-left text-gray-600 dark:text-gray-400 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
            href={`/essays`}
          >
            <span>Essays</span>
          </Link>
          <Link
            className="planBtns block w-full text-left text-gray-600 dark:text-gray-400 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
            href={`/colleges`}
          >
            <span>Colleges</span>
          </Link>
        </div>

        <div className="border-t-2 border-gray-300 md:border-gray-200 dark:border-gray-700 md:dark:border-gray-800 my-4"></div>

        <div className="block w-min font-medium px-6 md:px-7 mt-0">
          <button
            className="cumAttr hidden"
            /* onclick="openGPA()" */
          ></button>
          <button
            className="cumAttr hidden"
            /* onclick="openGPA()" */
          ></button>
          <button
            className="cumAttr hidden"
            /* onclick="openDiff()" */
          ></button>
          <button
            className="cumAttr hidden"
            /* onclick="openECStrength()" */
          ></button>
          <button
            className="cumAttr hidden"
            /* onclick="openFavoredTest()" */
          ></button>
          <button
            className="hidden font-normal text-xs bg-gray-300/70 hover:bg-gray-300 dark:bg-gray-700/60 dark:hover:bg-gray-700 hover:shadow-sm active:shadow-none rounded-md px-2 py-1 mt-2 md:mt-3 transition"
            /* onclick="openDoesGPANotLookRight()" */
          >
            Does your GPA not look right?
          </button>
        </div>

        <div className="block md:hidden border-t-2 border-gray-300 md:border-gray-200 dark:border-gray-700 md:dark:border-gray-800 my-4"></div>

        <div className="block md:hidden text-base md:text-lg font-medium pr-4">
          <button
            className="block w-full text-left text-gray-600 dark:text-gray-400/80 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 mt-4 transition"
            /* onclick="openCD()" */
            id="countdownSm"
          >
            <i
              className="fa-solid fa-hourglass-half mr-2"
              aria-label="Edit countdown"
            ></i>
            Edit countdown
          </button>
          <button
            className="block w-full text-left text-gray-600 dark:text-gray-400/80 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
            /* onclick="toggleDark()" */
            id="toggleDarkSm"
          >
            <i
              className="fa-solid fa-sun mr-2"
              aria-label="Toggle dark mode"
            ></i>
            <span className="dark:hidden">Toggle dark mode</span>
            <span className="hidden dark:inline">Toggle light mode</span>
          </button>
          <button
            className="block w-full text-left text-gray-600 dark:text-gray-400/80 hover:bg-gray-400/30 dark:hover:bg-gray-600/30 active:bg-gray-400/50 dark:active:bg-gray-600/50 rounded-r-full px-6 py-3 md:px-7 transition"
            /* onclick="openChangeGPACalc()" */
            id="changeWeightsSm"
          >
            <i
              className="fa-solid fa-wrench mr-2"
              aria-label="Change GPA calculation"
            ></i>
            Change GPA calculation
          </button>
        </div>
      </div>
    </>
  );
}
