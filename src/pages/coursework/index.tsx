import { useEffect, useState } from "react";

import CommonHead from "@/components/CommonHead";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";

import StageElem from "@/components/coursework/StageElem";
import { Course, GPASettings, Stage, Stages } from "@/types";
import AddCourseModal from "@/components/coursework/modals/AddCourseModal";
import EditCourseModal from "@/components/coursework/modals/EditCourseModal";

export default function Coursework() {
  // set theme on page load
  useEffect(() => {
    if (typeof window !== "undefined") {
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

      if (typeof localStorage.getItem("stages") === "string") {
        setStages(JSON.parse(localStorage.getItem("stages") as string));
      }
    }
  }, []);

  const [smallScreenMenuVis, setSmallScreenMenuVis] = useState("invisibleFade");

  const [stages, setStages] = useState<Stages>({
    Freshman: {
      name: "Freshman",
      gradeLevel: 9,
    },
    Sophomore: { name: "Sophomore", gradeLevel: 10 },
    Junior: { name: "Junior", gradeLevel: 11 },
    Senior: { name: "Senior", gradeLevel: 12 },
    Other: { name: "Other", gradeLevel: null },
  });

  const [gpaSettings, setGpaSettings] = useState<GPASettings>({
    usePlusMinus: true,
    advancedWeight: 0,
    honorsWeight: 0.5,
    collegeWeight: 0,
    apWeight: 1,
    ibWeight: 1,
  });

  const [activeStage, setActiveStage] = useState<Stage | null>(null);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  const [addCourseVisible, setAddCourseVisible] = useState(false);
  const [editCourseVisible, setEditCourseVisible] = useState(false);

  return (
    <>
      <CommonHead>
        <title>Plannter: Coursework</title>
      </CommonHead>

      <Header
        onSmallScreenMenuClick={() => {
          if (smallScreenMenuVis == "invisibleFade")
            setSmallScreenMenuVis("visibleFade");
          else if (smallScreenMenuVis == "visibleFade")
            setSmallScreenMenuVis("invisibleFade");
        }}
      />

      <div className="flex h-full md:h-screen">
        <SideMenu smallScreenMenuVis={smallScreenMenuVis} />

        <AddCourseModal
          addCourseVisible={addCourseVisible}
          setAddCourseVisible={setAddCourseVisible}
          addCourse={(course: Course) => {
            if (!activeStage) return;

            const newStages = JSON.parse(JSON.stringify(stages)) as Stages; // make a deep copy
            const currentStage = newStages[activeStage.name];

            if (!currentStage.courses) {
              currentStage.courses = {};
            }
            currentStage.courses[course.uuid] = course;

            setStages(newStages);
            localStorage.setItem("stages", JSON.stringify(newStages));
          }}
        ></AddCourseModal>

        <EditCourseModal
          editCourseVisible={editCourseVisible}
          setEditCourseVisible={setEditCourseVisible}
          editCourse={(course: Course) => {
            if (!activeStage) return;
            if (!activeCourse) return;

            const newStages = JSON.parse(JSON.stringify(stages)) as Stages; // make a deep copy
            const currentStage = newStages[activeStage.name];
            if (!currentStage.courses) {
              return;
            }

            currentStage.courses[activeCourse.uuid] = course;
            setStages(newStages);
            localStorage.setItem("stages", JSON.stringify(newStages));
          }}
          course={activeCourse}
        ></EditCourseModal>

        <div className="w-full overflow-y-scroll px-4 md:px-8 lg:px-16 xl:px-40 md:pt-28 md:pb-14 mt-8 md:mt-0 flex flex-col gap-10">
          {(Object.values(stages) as Stage[]).map((stage) => (
            <StageElem
              key={stage.name}
              stage={stage}
              gpaSettings={gpaSettings}
              setActiveStage={setActiveStage}
              setActiveCourse={setActiveCourse}
              setAddCourseVisible={setAddCourseVisible}
              setEditCourseVisible={setEditCourseVisible}
              setStage={(stage: Stage) => {
                const newStages = JSON.parse(JSON.stringify(stages)) as Stages; // make a deep copy

                newStages[stage.name] = stage;
                setStages(newStages);
                localStorage.setItem("stages", JSON.stringify(newStages));
              }}
            ></StageElem>
          ))}
        </div>
      </div>
    </>
  );
}
