import { AddCourseModalProps, Course } from "@/types";
import { getLetter } from "@/utility";
import {
  faChevronRight,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

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
    <div
      className={`bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto ${
        addCourseVisible ? "visibleFade" : "invisibleFade"
      }`}
    >
      <div className="bg-gray-100 dark:bg-gray-900 relative rounded-xl w-11/12 md:max-w-2xl shadow-md px-8 py-8 md:px-11 md:py-10">
        <button
          className="absolute top-6 right-7 text-lg hover:text-gray-500 transition"
          onClick={() => {
            setAddCourseVisible(false);
            revertToDefault();
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h1 className="text-xl font-medium mb-6">Add course</h1>

        <div className="md:flex gap-2 mb-4 md:mb-6">
          <div className="flex-1">
            <label className="modalSubtext">
              Course name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input md:mb-0"
              value={nameInput}
              onInput={(e) => setNameInput(e.currentTarget.value)}
              autoComplete="off"
              maxLength={80}
              required
            />
          </div>

          <div className="flex-1">
            <label className="modalSubtext">Advancement level</label>
            <select
              onChange={(e) => setAdvLevelInput(e.currentTarget.value)}
              value={advLevelInput}
              className="input darkArrowsSelect dark:lightArrowsSelect mb-0"
            >
              <optgroup label="Select an advancement level">
                <option value="1">None</option>
                <option value="2">Advanced</option>
                <option value="2.01">Accelerated</option>
                <option value="3">Honors</option>
                <option value="3.5">College Prep</option>
                <option value="3.51">Dual Enrollment</option>
                <option value="4">Advanced Placement (AP)</option>
                <option value="5">International Baccalaureate (IB)</option>
              </optgroup>
            </select>
          </div>
        </div>

        <label className="modalSubtext">
          Subject<span className="text-red-500">*</span>
        </label>
        <select
          onChange={(e) => setSubjectInput(e.currentTarget.value)}
          value={subjectInput}
          className="input darkArrowsSelect dark:lightArrowsSelect"
          required
        >
          <optgroup label="Select a subject">
            <option value="History">History</option>
            <option value="English">English</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="Foreign Language">Foreign Language</option>
            <option value="Technology">Technology</option>
            <option value="Visual Arts">Visual Arts</option>
            <option value="Performing Arts">Performing Arts</option>
            <option value="PE">Physical Education</option>
            <option value="Other">Other</option>
          </optgroup>
        </select>

        <div className="md:flex gap-2 mb-4 md:mb-6">
          <div className="flex-1">
            <label className="modalSubtext">Letter grade (Semester 1)</label>
            <div className="flex gap-2 mb-4 md:mb-0">
              <select
                onChange={(e) => {
                  setGrade1Input(e.currentTarget.value);
                  if (e.currentTarget.value != "Use percent")
                    setPercentGrade1Input("");
                }}
                value={grade1Input}
                className="input darkArrowsSelect dark:lightArrowsSelect m-0"
              >
                <optgroup label="Select a letter grade">
                  <option value="none">None</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="D+">D+</option>
                  <option value="D">D</option>
                  <option value="D-">D-</option>
                  <option value="F">F</option>
                  <option value="Use percent">Use percent</option>
                </optgroup>
              </select>

              <input
                type="number"
                className={`input m-0 ${
                  grade1Input == "Use percent" ? "" : "hidden"
                }`}
                value={percentGrade1Input}
                onInput={(e) => setPercentGrade1Input(e.currentTarget.value)}
                min={0}
                max={100}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="modalSubtext">Letter grade (Semester 2)</label>
            <div className="flex gap-2 mb-4 md:mb-0">
              <select
                onChange={(e) => {
                  setGrade2Input(e.currentTarget.value);
                  if (e.currentTarget.value != "Use percent")
                    setPercentGrade2Input("");
                }}
                value={grade2Input}
                className="input darkArrowsSelect dark:lightArrowsSelect m-0"
              >
                <optgroup label="Select a letter grade">
                  <option value="none">None</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="D+">D+</option>
                  <option value="D">D</option>
                  <option value="D-">D-</option>
                  <option value="F">F</option>
                  <option value="Use percent">Use percent</option>
                </optgroup>
              </select>

              <input
                type="number"
                className={`input m-0 ${
                  grade2Input == "Use percent" ? "" : "hidden"
                }`}
                value={percentGrade2Input}
                onInput={(e) => setPercentGrade2Input(e.currentTarget.value)}
                min={0}
                max={100}
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        <div className="block w-full">
          <button
            className="text-sm md:text-base text-left text-gray-600 hover:text-gray-500 active:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:active:text-gray-600 transition px-2 mb-4"
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
        </div>

        <div className={moreOptionsVis ? "" : "hidden"}>
          <label className="modalSubtext">Specific difficulty</label>
          <select
            onChange={(e) => setDifficultyInput(e.currentTarget.value)}
            value={difficultyInput}
            className="input darkArrowsSelect dark:lightArrowsSelect"
          >
            <optgroup label="Select a difficulty">
              <option value="0.25">Effortless</option>
              <option value="0.5">Easy</option>
              <option value="1">Regular (default)</option>
              <option value="1.5">Difficult</option>
              <option value="1.75">Challenging</option>
            </optgroup>
          </select>
        </div>

        <button
          className="buttonPrimary"
          onClick={(e) => {
            if (nameInput == "") {
              alert("Enter the name of this course");
            } else if (
              grade1Input == "Use percent" &&
              (Number(percentGrade1Input) > 100 ||
                Number(percentGrade1Input) < 0)
            ) {
              alert(
                "Enter a number between 0 and 100 for your first semester grade"
              );
            } else if (
              grade2Input == "Use percent" &&
              (Number(percentGrade2Input) > 100 ||
                Number(percentGrade2Input) < 0)
            ) {
              alert(
                "Enter a number between 0 and 100 for your second semester grade"
              );
            } else {
              const newCourse: Course = {
                uuid: crypto.randomUUID(),
                name: nameInput,
                advancementLevel: Number(advLevelInput),
                difficulty: Number(difficultyInput),
                subject: subjectInput,
                scores: {
                  firstSemester: {
                    letterGrade:
                      grade1Input == "Use percent"
                        ? getLetter(Number(percentGrade1Input))
                        : grade1Input,
                    percentGrade:
                      percentGrade1Input != ""
                        ? Math.round(Number(percentGrade1Input) * 100) / 100
                        : -1,
                  },
                  secondSemester: {
                    letterGrade:
                      grade2Input == "Use percent"
                        ? getLetter(Number(percentGrade2Input))
                        : grade2Input,
                    percentGrade:
                      percentGrade2Input != ""
                        ? Math.round(Number(percentGrade2Input) * 100) / 100
                        : -1,
                  },
                },
              };

              addCourse(newCourse);
              setAddCourseVisible(false);
              revertToDefault();
            }
            e.preventDefault();
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1 md:mr-1.5" />
          Add {currentStageName.toLocaleLowerCase()} course
        </button>

        <button
          className="buttonSecondary"
          onClick={() => {
            setAddCourseVisible(false);
            revertToDefault();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
