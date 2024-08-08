import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Lexend } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect, useState } from "react";

import { GPASettings } from "@/types";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import ChangeGPAModal from "@/components/ChangeGPAModal";
config.autoAddCss = false;

const lexend = Lexend({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [smallScreenMenuVis, setSmallScreenMenuVis] = useState("invisibleFade");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // set theme on page load
      if (
        localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      if (typeof localStorage.getItem("gpaWeights") === "string") {
        setGPASettings(
          JSON.parse(localStorage.getItem("gpaWeights") as string)
        );
      }
    }
  }, []);

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
          setChangeGPAVis={setChangeGPAVis}
        />
        <Component {...pageProps} gpaSettings={gpaSettings} />
      </div>
    </main>
  );
}
