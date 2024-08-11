import { Dispatch, SetStateAction, useState } from "react";

import CommonHead from "@/components/CommonHead";

import StageElem from "@/components/coursework/StageElem";
import { Course, GPASettings, Stage, Stages } from "@/types";
import AddCourseModal from "@/components/coursework/modals/AddCourseModal";
import EditCourseModal from "@/components/coursework/modals/EditCourseModal";

export default function Coursework({
  gpaSettings,
  stages,
  setStages,
}: {
  gpaSettings: GPASettings;
  stages: Stages;
  setStages: Dispatch<SetStateAction<Stages>>;
}) {
  const [activeStage, setActiveStage] = useState<Stage | null>(null);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  const [currentStageName, setCurrentStageName] = useState("");

  const [addCourseVisible, setAddCourseVisible] = useState(false);
  const [editCourseVisible, setEditCourseVisible] = useState(false);

  return (
    <>
      <CommonHead>
        <title>Plannter: Coursework</title>
      </CommonHead>

      <AddCourseModal
        addCourseVisible={addCourseVisible}
        setAddCourseVisible={setAddCourseVisible}
        currentStageName={currentStageName}
        addCourse={(newCourse: Course) => {
          if (!activeStage) return;

          const newStages = JSON.parse(JSON.stringify(stages)) as Stages; // make a deep copy
          const currentStage = newStages[activeStage.name];

          if (!currentStage.courses) {
            currentStage.courses = {};
          }
          currentStage.courses[newCourse.uuid] = newCourse;

          setStages(newStages);
          localStorage.setItem("stages", JSON.stringify(newStages));
        }}
      />

      <EditCourseModal
        editCourseVisible={editCourseVisible}
        setEditCourseVisible={setEditCourseVisible}
        currentStageName={currentStageName}
        course={activeCourse}
        saveCourse={(updatedCourse: Course) => {
          if (!activeStage) return;
          if (!activeCourse) return;

          const newStages = JSON.parse(JSON.stringify(stages)) as Stages; // make a deep copy
          const currentStage = newStages[activeStage.name];
          if (!currentStage.courses) return;

          currentStage.courses[activeCourse.uuid] = updatedCourse;
          setStages(newStages);
          localStorage.setItem("stages", JSON.stringify(newStages));
        }}
      />

      <div className="w-full overflow-y-scroll px-4 md:px-8 lg:px-16 xl:px-40 md:pt-28 md:pb-20 mt-8 md:mt-0 flex flex-col gap-12">
        {(Object.values(stages) as Stage[]).map((stage) => (
          <StageElem
            key={stage.name}
            stage={stage}
            gpaSettings={gpaSettings}
            setActiveStage={setActiveStage}
            setActiveCourse={setActiveCourse}
            setAddCourseVisible={setAddCourseVisible}
            setEditCourseVisible={setEditCourseVisible}
            setCurrentStageName={setCurrentStageName}
            setStage={(stage: Stage) => {
              const newStages = JSON.parse(JSON.stringify(stages)) as Stages; // make a deep copy

              newStages[stage.name] = stage;
              setStages(newStages);
              localStorage.setItem("stages", JSON.stringify(newStages));
            }}
          />
        ))}
      </div>
    </>
  );
}
