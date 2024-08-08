import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEllipsisVertical,
  faHourglassHalf,
  faSun,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ChangeGPAModal from "@/components/ChangeGPAModal";
import { GPASettings } from "@/types";

type HeaderProps = {
  onSmallScreenMenuClick: () => void;
  onGPASettingsChange: () => void;
};

export default function Header(props: HeaderProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (typeof localStorage.getItem("gpaWeights") === "string") {
        setGPASettings(
          JSON.parse(localStorage.getItem("gpaWeights") as string)
        );
      } else {
        localStorage.setItem("gpaWeights", JSON.stringify(gpaSettings));
      }
    }
  }, []);

  const [settingsVis, setSettingsVis] = useState("invisibleFade");

  const settingsDivRef = useRef<HTMLDivElement>(null);
  const settingsBtnRef = useRef<HTMLButtonElement>(null);

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

  function handleOutsideClick(event: MouseEvent) {
    if (
      settingsDivRef.current &&
      settingsBtnRef.current &&
      !settingsDivRef.current.contains(event.target as Element) &&
      !settingsBtnRef.current.contains(event.target as Element)
    )
      setSettingsVis("invisibleFade");
  }

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <>
      <div className="text-2xl text-gray-100 dark:text-gray-900 bg-gray-200 dark:bg-gray-800 flex sticky md:absolute w-full top-0 z-10 border-b-2 border-gray-300 dark:border-gray-700 shadow-sm px-6 py-4">
        <button
          className="block md:hidden text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-600 transition mr-6"
          onClick={props.onSmallScreenMenuClick}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1 className="font-Calistoga flex items-center text-transparent bg-clip-text font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 dark:from-emerald-500 dark:via-teal-500 dark:to-sky-500">
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
              onClick={() => {
                if (settingsVis == "invisibleFade")
                  setSettingsVis("visibleFade");
                else if (settingsVis == "visibleFade")
                  setSettingsVis("invisibleFade");
              }}
              ref={settingsBtnRef}
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                aria-label="Open settings"
                title="Open settings"
              />
            </button>
            <div
              ref={settingsDivRef}
              className={`${settingsVis} absolute right-0 w-80 bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-md shadow-lg p-3 mt-2`}
            >
              <button
                className="block w-full text-base text-left text-gray-600 hover:bg-gray-300 active:bg-gray-400 dark:text-gray-400 dark:hover:bg-gray-700 dark:active:bg-gray-600 transition rounded-md px-3 py-2 mt-1 first:mt-0"
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
                className="block w-full text-base text-left text-gray-600 hover:bg-gray-300 active:bg-gray-400 dark:text-gray-400 dark:hover:bg-gray-700 dark:active:bg-gray-600 transition rounded-md px-3 py-2 mt-1 first:mt-0"
                onClick={() => {
                  setChangeGPAVis(true);
                }}
              >
                <FontAwesomeIcon icon={faWrench} className="mr-2" />
                <span>Change GPA calculation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ChangeGPAModal
        changeGPAVisible={changeGPAVis}
        setChangeGPAVisible={setChangeGPAVis}
        gpaSettings={gpaSettings}
        saveGPASettings={(newGPASettings: GPASettings) => {
          setGPASettings(newGPASettings);
          localStorage.setItem("gpaWeights", JSON.stringify(newGPASettings));
          props.onGPASettingsChange();
        }}
      />
    </>
  );
}
