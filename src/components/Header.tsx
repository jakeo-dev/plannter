import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEllipsisVertical,
  faHourglassHalf,
  faSun,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Header() {
  return (
    <div className="font-Calistoga text-2xl text-gray-100 dark:text-gray-900 bg-gray-200 dark:bg-gray-800 flex sticky md:absolute w-full top-0 z-10 border-b-2 border-gray-300 dark:border-gray-700 shadow-sm px-6 py-4">
      <button
        className="block md:hidden text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-600 transition mr-6"
        /* onClick={ toggle visibility of side menu on small screens } */
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <h1 className="flex items-center text-transparent bg-clip-text font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 dark:from-emerald-500 dark:via-teal-500 dark:to-sky-500">
        <Image
          src="/plannter-icon-dark.png"
          alt="Planter icon"
          width={500}
          height={500}
          className="w-7 inline dark:hidden mr-2.5"
        />
        <Image
          src="/plannter-icon-light.png"
          alt="Planter icon"
          width={500}
          height={500}
          className="w-7 hidden dark:inline mr-2.5"
        />
        Plannter
      </h1>

      <div className="hidden md:block font-LexendDeca font-medium ml-auto">
        <button
          className="text-lg text-gray-600 hover:bg-gray-300 active:bg-gray-400 dark:text-gray-400 dark:hover:bg-gray-700 dark:active:bg-gray-600 rounded-md px-3 py-1 transition"
          /* onClick={ open countdown editor } */
        >
          <FontAwesomeIcon
            icon={faHourglassHalf}
            aria-label="Edit countdown"
            title="Edit countdown"
          />
        </button>

        <div className="relative inline-block">
          <button
            className="text-xl text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 px-2 pt-1 transition"
            /* onClick={ toggle visibility of settings on big screens } */
          >
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              aria-label="Open settings"
              title="Open settings"
            />
          </button>
          <div className="invisibleFade absolute right-0 w-80 bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-md shadow-lg p-3 mt-2">
            <button
              className="optBtn"
              /* onClick={ toggle dark mode } */
            >
              <FontAwesomeIcon
                icon={faSun}
                className="mr-1"
                aria-label="Toggle dark mode"
              />
              <span className="optBtnSpan dark:hidden">Toggle dark mode</span>
              <span className="optBtnSpan hidden dark:inline">
                Toggle light mode
              </span>
            </button>
            <button
              className="optBtn"
              /* onClick={ open change gpa calc editor } */
            >
              <FontAwesomeIcon
                icon={faWrench}
                className="mr-1"
                aria-label="Change GPA calculation"
              />
              <span className="optBtnSpan">Change GPA calculation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
