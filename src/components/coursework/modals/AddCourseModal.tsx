import Dropdown from "@/components/generic/Dropdown";
import Modal from "@/components/generic/Modal";
import TextInput from "@/components/generic/TextInput";
import { AddCourseModalProps, Course } from "@/types";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function AddCourseModal({
  addCourseVisible,
  setAddCourseVisible,
  currentStageName,
  addCourse,
}: AddCourseModalProps) {
  const [nameInput, setNameInput] = useState("");
  const [grade1Input, setGrade1Input] = useState("none");
  const [grade2Input, setGrade2Input] = useState("none");
  const [percentGrade1Input, setPercentGrade1Input] = useState("");
  const [percentGrade2Input, setPercentGrade2Input] = useState("");
  const [advLevelInput, setAdvLevelInput] = useState("1");
  const [difficultyInput, setDifficultyInput] = useState("1");
  const [subjectInput, setSubjectInput] = useState("history");
  const [moreOptionsVis, setMoreOptionsVis] = useState(false);

  function revertToDefault() {
    setNameInput("");
    setGrade1Input("none");
    setGrade2Input("none");
    setPercentGrade1Input("");
    setPercentGrade2Input("");
    setAdvLevelInput("1");
    setDifficultyInput("1");
    setSubjectInput("history");
    setMoreOptionsVis(false);
  }

  return (
    <Modal
      modalVisible={addCourseVisible}
      onSubmit={() => {
        if (nameInput == "") {
          alert("Enter the name of this course");
        } else {
          const newCourse: Course = {
            uuid: crypto.randomUUID(),
            name: nameInput,
            advancementLevel: Number(advLevelInput),
            difficulty: Number(difficultyInput),
            subject: subjectInput,
            scores: {
              firstSemester: {
                letterGrade: grade1Input,
                percentGrade: Number(percentGrade1Input),
              },
              secondSemester: {
                letterGrade: grade2Input,
                percentGrade: Number(percentGrade2Input),
              },
            },
          };

          setAddCourseVisible(false);
          addCourse(newCourse);
          revertToDefault();
        }
      }}
      onClose={() => {
        setAddCourseVisible(false);
        revertToDefault();
      }}
      title={`Add ${capitalize(currentStageName)} Course`}
    >
      <div className="flex flex-col gap-4">
        <div className="md:flex gap-2">
          <div className="flex-1">
            <TextInput
              label="Course Name"
              value={nameInput}
              setValue={setNameInput}
            ></TextInput>
          </div>

          <div className="flex-1">
            <Dropdown
              label="Advancement level"
              value={advLevelInput}
              setValue={setAdvLevelInput}
              options={{
                "1": "None",
                "2": "Advanced",
                "2.01": "Accelerated",
                "3": "Honors",
                "3.5": "College Prep",
                "3.51": "Dual Enrollment",
                "4": "Advanced Placement (AP)",
                "5": "International Baccalaureate (IB)",
              }}
            ></Dropdown>
          </div>
        </div>

        <div>
          <Dropdown
            label="Subject"
            value={subjectInput}
            setValue={setSubjectInput}
            options={{
              History: "History",
              English: "English",
              Math: "Math",
              Science: "Science",
              "Foreign Language": "Foreign Language",
              Technology: "Technology",
              "Visual Arts": "Visual Arts",
              "Performing Arts": "Performing Arts",
              PE: "Physical Education",
              Other: "Other",
            }}
          ></Dropdown>
        </div>

        <div className="md:flex gap-2">
          <div
            className={`flex-1 ${
              grade1Input == "Use percent" ? " flex gap-2" : ""
            }`}
          >
            <div>
              <Dropdown
                label="Letter grade (Semester 1)"
                value={grade1Input}
                setValue={setGrade1Input}
                options={{
                  none: "None",
                  "A+": "A+",
                  A: "A",
                  "A-": "A-",
                  "B+": "B+",
                  B: "B",
                  "B-": "B-",
                  "C+": "C+",
                  C: "C",
                  "C-": "C-",
                  "D+": "D+",
                  D: "D",
                  "D-": "D-",
                  F: "F",
                  "Use percent": "Use percent",
                }}
              ></Dropdown>
            </div>

            <div className={grade1Input == "Use percent" ? "" : "hidden"}>
              <TextInput
                label=""
                value={nameInput}
                setValue={setNameInput}
              ></TextInput>
            </div>
          </div>

          <div
            className={`flex-1 ${
              grade1Input == "Use percent" ? " flex gap-2" : ""
            }`}
          >
            <div>
              <Dropdown
                label="Letter grade (Semester 2)"
                value={grade2Input}
                setValue={setGrade2Input}
                options={{
                  none: "None",
                  "A+": "A+",
                  A: "A",
                  "A-": "A-",
                  "B+": "B+",
                  B: "B",
                  "B-": "B-",
                  "C+": "C+",
                  C: "C",
                  "C-": "C-",
                  "D+": "D+",
                  D: "D",
                  "D-": "D-",
                  F: "F",
                  "Use percent": "Use percent",
                }}
              ></Dropdown>
            </div>

            <div className={grade2Input == "Use percent" ? "" : "hidden"}>
              <TextInput
                label=""
                value={nameInput}
                setValue={setNameInput}
              ></TextInput>
            </div>
          </div>
        </div>

        <div>
          <button
            className="block w-full text-sm md:text-base text-left text-gray-600 hover:text-gray-500 active:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:active:text-gray-600 transition px-2 mb-4"
            onClick={() => {
              setMoreOptionsVis(!moreOptionsVis);
            }}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className={`${moreOptionsVis ? "rotate-90" : ""} mr-2 transition`}
            />
            More options
          </button>

          <div className={moreOptionsVis ? "" : "hidden"}>
            <Dropdown
              label="Specific Difficulty"
              value={difficultyInput}
              setValue={setDifficultyInput}
              options={{
                "0.25": "Effortless",
                "0.5": "Easy",
                "1": "Regular (default)",
                "1.5": "Difficult",
                "1.75": "Challenging",
              }}
            ></Dropdown>
          </div>
        </div>
      </div>
    </Modal>
  );
}
