import CommonHead from "@/components/CommonHead";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import Course from "@/components/Course";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronRight,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

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
    }
  }, []);

  const [nameInput, setNameInput] = useState("");
  const [grade1Input, setGrade1Input] = useState("none");
  const [grade2Input, setGrade2Input] = useState("none");
  const [percentGrade1Input, setPercentGrade1Input] = useState("");
  const [percentGrade2Input, setPercentGrade2Input] = useState("");
  const [advLevelInput, setAdvLevelInput] = useState("1");
  const [gradeLevelInput, setGradeLevelInput] = useState("09");
  const [difficultyInput, setDifficultyInput] = useState("1");
  const [subjectInput, setSubjectInput] = useState("history");

  const [addModalVis, setAddModalVis] = useState("invisibleFade");
  const [editModalVis, setEditModalVis] = useState("invisibleFade");
  const [smallScreenMenuVis, setSmallScreenMenuVis] = useState("invisibleFade");
  const [moreOptionsVis, setMoreOptionsVis] = useState("hidden");

  const [gpa09, setGpa09] = useState(-1);
  const [weightedGpa09, setWeightedGpa09] = useState(-1);
  const [difficulty09, setDifficulty09] = useState(-1);
  const [gpa10, setGpa10] = useState(-1);
  const [weightedGpa10, setWeightedGpa10] = useState(-1);
  const [difficulty10, setDifficulty10] = useState(-1);
  const [gpa11, setGpa11] = useState(-1);
  const [weightedGpa11, setWeightedGpa11] = useState(-1);
  const [difficulty11, setDifficulty11] = useState(-1);
  const [gpa12, setGpa12] = useState(-1);
  const [weightedGpa12, setWeightedGpa12] = useState(-1);
  const [difficulty12, setDifficulty12] = useState(-1);
  const [gpa13, setGpa13] = useState(-1);
  const [weightedGpa13, setWeightedGpa13] = useState(-1);
  const [difficulty13, setDifficulty13] = useState(-1);

  const [selectedCourse, setSelectedCourse] = useState({
    id: -1,
    name: "",
    grade1: "",
    grade2: "",
    percentGrade1: "",
    percentGrade2: "",
    advLevel: "",
    gradeLevel: "",
    difficulty: "",
    subject: "",
  });

  interface Course {
    // define the Course type
    id: number;
    name: string;
    grade1: string;
    grade2: string;
    percentGrade1: string;
    percentGrade2: string;
    advLevel: string;
    gradeLevel: string;
    difficulty: string;
    subject: string;
  }

  const [courses09, setCourses09] = useState<Course[]>([] as Course[]);
  const [courses10, setCourses10] = useState<Course[]>([] as Course[]);
  const [courses11, setCourses11] = useState<Course[]>([] as Course[]);
  const [courses12, setCourses12] = useState<Course[]>([] as Course[]);
  const [courses13, setCourses13] = useState<Course[]>([] as Course[]);

  useEffect(() => {
    setCourses09(
      JSON.parse(localStorage.getItem("courseList09") || "[]") as Course[]
    );
    setCourses10(
      JSON.parse(localStorage.getItem("courseList10") || "[]") as Course[]
    );
    setCourses11(
      JSON.parse(localStorage.getItem("courseList11") || "[]") as Course[]
    );
    setCourses12(
      JSON.parse(localStorage.getItem("courseList12") || "[]") as Course[]
    );
    setCourses13(
      JSON.parse(localStorage.getItem("courseList13") || "[]") as Course[]
    );
  }, []);

  function openAddCourse(gradeLevel: string) {
    setAddModalVis("visibleFade");
    setGradeLevelInput(gradeLevel);
  }

  function calcUnweightedGPAs() {
    // remember to potentially account for + and - on grades
  }

  function calcWeightedGPAs() {
    // remember to account for the different and adjustable weights of the different advancement levels, and the potential for + and - on grades to be accounted for
  }

  function handleEscapeClick() {
    setAddModalVis("invisibleFade");
    setEditModalVis("invisibleFade");
    setNameInput("");
    setGrade1Input("");
    setGrade2Input("");
    setPercentGrade1Input("");
    setPercentGrade2Input("");
    setAdvLevelInput("1");
    setDifficultyInput("1");
    setSubjectInput("history");
    setMoreOptionsVis("hidden");
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleEscapeClick();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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

        <div className="w-full overflow-y-scroll px-4 md:px-8 lg:px-16 xl:px-40 md:pt-28 md:pb-14 mt-8 md:mt-0">
          <div className="mb-12">
            <div className="font-medium px-4">
              <h2 className="text-lg font-Calistoga">Grade 9 (Freshman)</h2>
              <div className="block mb-3">
                <button
                  className="listAttr gpa hidden" // 9th grade UNweighted gpa
                >
                  {gpa09}
                </button>
                <button
                  className="listAttr wGpa hidden" // 9th grade WEIGHTED gpa
                >
                  {weightedGpa09}
                </button>
                <button
                  className="listAttr hidden" // 9th grade difficulty
                >
                  {difficulty09}
                </button>
              </div>
            </div>
            <ul>
              {courses09.map((course: Course) => (
                <Course
                  id={course.id}
                  name={course.name}
                  grade1={course.grade1}
                  grade2={course.grade2}
                  percentGrade1={course.percentGrade1}
                  percentGrade2={course.percentGrade2}
                  advLevel={course.advLevel}
                  gradeLevel={course.gradeLevel}
                  difficulty={course.difficulty}
                  subject={course.subject}
                  onEdit={() => {
                    setEditModalVis("visibleFade");
                    setSelectedCourse(course);
                    setNameInput(course.name);
                    setGrade1Input(course.grade1);
                    setGrade2Input(course.grade2);
                    setPercentGrade1Input(course.percentGrade1);
                    setPercentGrade2Input(course.percentGrade2);
                    setAdvLevelInput(course.advLevel);
                    setGradeLevelInput(course.gradeLevel);
                    setDifficultyInput(course.difficulty);
                    setSubjectInput(course.subject);
                    if (course.difficulty != "1") setMoreOptionsVis("");
                  }}
                  onTrash={() => {
                    if (confirm("Delete " + course.name + "?")) {
                      const updatedCourses = [...courses09];
                      updatedCourses.splice(courses09.indexOf(course), 1);
                      setCourses09(updatedCourses);

                      localStorage.setItem(
                        "courseList09",
                        JSON.stringify(updatedCourses)
                      );
                    }
                  }}
                />
              ))}
            </ul>
            <button
              className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
              onClick={() => openAddCourse("09")}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add a freshman course
            </button>
          </div>

          <div className="mb-12">
            <div className="font-medium px-4">
              <h2 className="text-lg font-Calistoga">Grade 10 (Sophomore)</h2>
              <div className="block mb-3">
                <button
                  className="listAttr gpa hidden" // 10th grade UNweighted gpa
                >
                  {gpa10}
                </button>
                <button
                  className="listAttr wGpa hidden" // 10th grade WEIGHTED gpa
                >
                  {weightedGpa10}
                </button>
                <button
                  className="listAttr hidden" // 10th grade difficulty
                >
                  {difficulty10}
                </button>
              </div>
            </div>
            <ul>
              {courses10.map((course: Course) => (
                <Course
                  id={course.id}
                  name={course.name}
                  grade1={course.grade1}
                  grade2={course.grade2}
                  percentGrade1={course.percentGrade1}
                  percentGrade2={course.percentGrade2}
                  advLevel={course.advLevel}
                  gradeLevel={course.gradeLevel}
                  difficulty={course.difficulty}
                  subject={course.subject}
                  onEdit={() => {
                    setEditModalVis("visibleFade");
                    setSelectedCourse(course);
                    setNameInput(course.name);
                    setGrade1Input(course.grade1);
                    setGrade2Input(course.grade2);
                    setPercentGrade1Input(course.percentGrade1);
                    setPercentGrade2Input(course.percentGrade2);
                    setAdvLevelInput(course.advLevel);
                    setGradeLevelInput(course.gradeLevel);
                    setDifficultyInput(course.difficulty);
                    setSubjectInput(course.subject);
                    if (course.difficulty != "1") setMoreOptionsVis("");
                  }}
                  onTrash={() => {
                    if (confirm("Delete " + course.name + "?")) {
                      const updatedCourses = [...courses10];
                      updatedCourses.splice(courses10.indexOf(course), 1);
                      setCourses10(updatedCourses);

                      localStorage.setItem(
                        "courseList10",
                        JSON.stringify(updatedCourses)
                      );
                    }
                  }}
                />
              ))}
            </ul>
            <button
              className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
              onClick={() => openAddCourse("10")}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add a sophomore course
            </button>
          </div>

          <div className="mb-12">
            <div className="font-medium px-4">
              <h2 className="text-lg font-Calistoga">Grade 11 (Junior)</h2>
              <div className="block mb-3">
                <button
                  className="listAttr gpa hidden" // 11th grade UNweighted gpa
                >
                  {gpa11}
                </button>
                <button
                  className="listAttr wGpa hidden" // 11th grade WEIGHTED gpa
                >
                  {weightedGpa11}
                </button>
                <button
                  className="listAttr hidden" // 11th grade difficulty
                >
                  {difficulty11}
                </button>
              </div>
            </div>
            <ul>
              {courses11.map((course: Course) => (
                <Course
                  id={course.id}
                  name={course.name}
                  grade1={course.grade1}
                  grade2={course.grade2}
                  percentGrade1={course.percentGrade1}
                  percentGrade2={course.percentGrade2}
                  advLevel={course.advLevel}
                  gradeLevel={course.gradeLevel}
                  difficulty={course.difficulty}
                  subject={course.subject}
                  onEdit={() => {
                    setEditModalVis("visibleFade");
                    setSelectedCourse(course);
                    setNameInput(course.name);
                    setGrade1Input(course.grade1);
                    setGrade2Input(course.grade2);
                    setPercentGrade1Input(course.percentGrade1);
                    setPercentGrade2Input(course.percentGrade2);
                    setAdvLevelInput(course.advLevel);
                    setGradeLevelInput(course.gradeLevel);
                    setDifficultyInput(course.difficulty);
                    setSubjectInput(course.subject);
                    if (course.difficulty != "1") setMoreOptionsVis("");
                  }}
                  onTrash={() => {
                    if (confirm("Delete " + course.name + "?")) {
                      const updatedCourses = [...courses11];
                      updatedCourses.splice(courses11.indexOf(course), 1);
                      setCourses11(updatedCourses);

                      localStorage.setItem(
                        "courseList11",
                        JSON.stringify(updatedCourses)
                      );
                    }
                  }}
                />
              ))}
            </ul>
            <button
              className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
              onClick={() => openAddCourse("11")}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add a junior course
            </button>
          </div>

          <div className="mb-12">
            <div className="font-medium px-4">
              <h2 className="text-lg font-Calistoga">Grade 12 (Senior)</h2>
              <div className="block mb-3">
                <button
                  className="listAttr gpa hidden" // 12th grade UNweighted gpa
                >
                  {gpa12}
                </button>
                <button
                  className="listAttr wGpa hidden" // 12th grade WEIGHTED gpa
                >
                  {weightedGpa12}
                </button>
                <button
                  className="listAttr hidden" // 12th grade difficulty
                >
                  {difficulty12}
                </button>
              </div>
            </div>
            <ul>
              {courses12.map((course: Course) => (
                <Course
                  id={course.id}
                  name={course.name}
                  grade1={course.grade1}
                  grade2={course.grade2}
                  percentGrade1={course.percentGrade1}
                  percentGrade2={course.percentGrade2}
                  advLevel={course.advLevel}
                  gradeLevel={course.gradeLevel}
                  difficulty={course.difficulty}
                  subject={course.subject}
                  onEdit={() => {
                    setEditModalVis("visibleFade");
                    setSelectedCourse(course);
                    setNameInput(course.name);
                    setGrade1Input(course.grade1);
                    setGrade2Input(course.grade2);
                    setPercentGrade1Input(course.percentGrade1);
                    setPercentGrade2Input(course.percentGrade2);
                    setAdvLevelInput(course.advLevel);
                    setGradeLevelInput(course.gradeLevel);
                    setDifficultyInput(course.difficulty);
                    setSubjectInput(course.subject);
                    if (course.difficulty != "1") setMoreOptionsVis("");
                  }}
                  onTrash={() => {
                    if (confirm("Delete " + course.name + "?")) {
                      const updatedCourses = [...courses12];
                      updatedCourses.splice(courses12.indexOf(course), 1);
                      setCourses12(updatedCourses);

                      localStorage.setItem(
                        "courseList12",
                        JSON.stringify(updatedCourses)
                      );
                    }
                  }}
                />
              ))}
            </ul>
            <button
              className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
              onClick={() => openAddCourse("12")}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add a senior course
            </button>
          </div>

          <div className="mb-12">
            <div className="font-medium px-4">
              <h2 className="text-lg font-Calistoga">Other Courses</h2>
              <div className="block mb-3">
                <button
                  className="listAttr gpa hidden" // other courses UNweighted gpa
                >
                  {gpa13}
                </button>
                <button
                  className="listAttr wGpa hidden" // other courses WEIGHTED gpa
                >
                  {weightedGpa13}
                </button>
                <button
                  className="listAttr hidden" // other courses difficulty
                >
                  {difficulty13}
                </button>
              </div>
            </div>
            <ul>
              {courses13.map((course: Course) => (
                <Course
                  id={course.id}
                  name={course.name}
                  grade1={course.grade1}
                  grade2={course.grade2}
                  percentGrade1={course.percentGrade1}
                  percentGrade2={course.percentGrade2}
                  advLevel={course.advLevel}
                  gradeLevel={course.gradeLevel}
                  difficulty={course.difficulty}
                  subject={course.subject}
                  onEdit={() => {
                    setEditModalVis("visibleFade");
                    setSelectedCourse(course);
                    setNameInput(course.name);
                    setGrade1Input(course.grade1);
                    setGrade2Input(course.grade2);
                    setPercentGrade1Input(course.percentGrade1);
                    setPercentGrade2Input(course.percentGrade2);
                    setAdvLevelInput(course.advLevel);
                    setGradeLevelInput(course.gradeLevel);
                    setDifficultyInput(course.difficulty);
                    setSubjectInput(course.subject);
                    if (course.difficulty != "1") setMoreOptionsVis("");
                  }}
                  onTrash={() => {
                    if (confirm("Delete " + course.name + "?")) {
                      const updatedCourses = [...courses13];
                      updatedCourses.splice(courses13.indexOf(course), 1);
                      setCourses13(updatedCourses);

                      localStorage.setItem(
                        "courseList13",
                        JSON.stringify(updatedCourses)
                      );
                    }
                  }}
                />
              ))}
            </ul>
            <button
              className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
              onClick={() => openAddCourse("13")}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add another course
            </button>
          </div>
        </div>
      </div>

      {/* add course modal */}
      <div
        className={`${addModalVis} bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto`}
      >
        <div className="bg-gray-100 dark:bg-gray-800 relative rounded-xl w-11/12 md:max-w-2xl shadow-md px-8 py-8 md:px-11 md:py-10">
          <button
            className="absolute top-6 right-7 text-lg hover:text-gray-500 transition"
            onClick={() => {
              setAddModalVis("invisibleFade");
              setNameInput("");
              setGrade1Input("");
              setGrade2Input("");
              setPercentGrade1Input("");
              setPercentGrade2Input("");
              setAdvLevelInput("1");
              setDifficultyInput("1");
              setSubjectInput("history");
              setMoreOptionsVis("hidden");
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
            Grade level<span className="text-red-500">*</span>
          </label>
          <select
            onChange={(e) => setGradeLevelInput(e.currentTarget.value)}
            value={gradeLevelInput}
            className="input darkArrowsSelect dark:lightArrowsSelect"
            required
          >
            <optgroup label="Select a grade level">
              <option value="09">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
              <option value="13">Other</option>
            </optgroup>
          </select>

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

          <button
            className="block w-full text-sm md:text-base text-left text-gray-600 hover:text-gray-500 active:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:active:text-gray-600 transition px-2 mb-4"
            onClick={() => {
              if (moreOptionsVis == "hidden") setMoreOptionsVis("");
              else if (moreOptionsVis == "") setMoreOptionsVis("hidden");
            }}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className={`${
                moreOptionsVis == "" ? "rotate-90" : ""
              } mr-2 transition`}
            />
            More options
          </button>

          <div className={moreOptionsVis}>
            <label className="modalSubtext">Specific difficulty</label>
            <select
              onChange={(e) => setDifficultyInput(e.currentTarget.value)}
              value={difficultyInput}
              className="input darkArrowsSelect dark:lightArrowsSelect"
            >
              <optgroup label="Select a difficulty">
                <option value="0.25">Effortless</option>
                <option value="0.5">Easy</option>
                <option value="1" selected>
                  Regular (default)
                </option>
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
              } else {
                const newCourse = {
                  id: Math.floor(Math.random() * 10000000000),
                  name: nameInput,
                  grade1: grade1Input,
                  grade2: grade2Input,
                  percentGrade1: String(
                    Math.round(Number(percentGrade1Input) * 100) / 100
                  ),
                  percentGrade2: String(
                    Math.round(Number(percentGrade2Input) * 100) / 100
                  ),
                  advLevel: advLevelInput,
                  gradeLevel: gradeLevelInput,
                  difficulty: difficultyInput,
                  subject: subjectInput,
                };

                if (gradeLevelInput == "09") courses09.push(newCourse);
                else if (gradeLevelInput == "10") courses10.push(newCourse);
                else if (gradeLevelInput == "11") courses11.push(newCourse);
                else if (gradeLevelInput == "12") courses12.push(newCourse);
                else if (gradeLevelInput == "13") courses13.push(newCourse);

                localStorage.setItem("courseList09", JSON.stringify(courses09));
                localStorage.setItem("courseList10", JSON.stringify(courses10));
                localStorage.setItem("courseList11", JSON.stringify(courses11));
                localStorage.setItem("courseList12", JSON.stringify(courses12));
                localStorage.setItem("courseList13", JSON.stringify(courses13));

                setAddModalVis("invisibleFade");
                setNameInput("");
                setGrade1Input("");
                setGrade2Input("");
                setPercentGrade1Input("");
                setPercentGrade2Input("");
                setAdvLevelInput("1");
                setDifficultyInput("1");
                setSubjectInput("history");
                setMoreOptionsVis("hidden");
              }
              e.preventDefault();
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1 md:mr-1.5" />
            Add course
          </button>

          <button
            className="buttonSecondary"
            onClick={() => {
              setAddModalVis("invisibleFade");
              setNameInput("");
              setGrade1Input("");
              setGrade2Input("");
              setPercentGrade1Input("");
              setPercentGrade2Input("");
              setAdvLevelInput("1");
              setDifficultyInput("1");
              setSubjectInput("history");
              setMoreOptionsVis("hidden");
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* edit course modal */}
      <div
        className={`${editModalVis} bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto`}
      >
        <div className="bg-gray-100 dark:bg-gray-800 relative rounded-xl w-11/12 md:max-w-2xl shadow-md px-8 py-8 md:px-11 md:py-10">
          <button
            className="absolute top-6 right-7 text-lg hover:text-gray-500 transition"
            onClick={() => {
              setEditModalVis("invisibleFade");
              setNameInput("");
              setGrade1Input("");
              setGrade2Input("");
              setPercentGrade1Input("");
              setPercentGrade2Input("");
              setAdvLevelInput("1");
              setDifficultyInput("1");
              setSubjectInput("history");
              setMoreOptionsVis("hidden");
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

          <h1 className="text-xl font-medium mb-6">Edit course</h1>

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
            Grade level<span className="text-red-500">*</span>
          </label>
          <select
            onChange={(e) => setGradeLevelInput(e.currentTarget.value)}
            value={gradeLevelInput}
            className="input darkArrowsSelect dark:lightArrowsSelect"
            required
          >
            <optgroup label="Select a grade level">
              <option value="09">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
              <option value="13">Other</option>
            </optgroup>
          </select>

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

          <button
            className="block w-full text-sm md:text-base text-left text-gray-600 hover:text-gray-500 active:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:active:text-gray-600 transition px-2 mb-4"
            onClick={() => {
              if (moreOptionsVis == "hidden") setMoreOptionsVis("");
              else if (moreOptionsVis == "") setMoreOptionsVis("hidden");
            }}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className={`${
                moreOptionsVis == "" ? "rotate-90" : ""
              } mr-2 transition`}
            />
            More options
          </button>

          <div className={moreOptionsVis}>
            <label className="modalSubtext">Specific difficulty</label>
            <select
              onChange={(e) => setDifficultyInput(e.currentTarget.value)}
              value={difficultyInput}
              className="input darkArrowsSelect dark:lightArrowsSelect"
            >
              <optgroup label="Select a difficulty">
                <option value="0.25">Effortless</option>
                <option value="0.5">Easy</option>
                <option value="1" selected>
                  Regular (default)
                </option>
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
              } else {
                let oldGradeLevel = selectedCourse.gradeLevel;
                let oldSelectedCourse = selectedCourse;

                selectedCourse.name = nameInput;
                selectedCourse.grade1 = grade1Input;
                selectedCourse.grade2 = grade2Input;
                selectedCourse.percentGrade1 = String(
                  Math.round(Number(percentGrade1Input) * 100) / 100
                );
                selectedCourse.percentGrade2 = String(
                  Math.round(Number(percentGrade2Input) * 100) / 100
                );
                selectedCourse.advLevel = advLevelInput;
                selectedCourse.gradeLevel = gradeLevelInput;
                selectedCourse.difficulty = difficultyInput;
                selectedCourse.subject = subjectInput;

                if (selectedCourse.gradeLevel != oldGradeLevel) {
                  if (gradeLevelInput == "09") {
                    courses09.push(selectedCourse);
                    localStorage.setItem(
                      "courseList09",
                      JSON.stringify(courses09)
                    );
                  } else if (gradeLevelInput == "10") {
                    courses10.push(selectedCourse);
                    localStorage.setItem(
                      "courseList10",
                      JSON.stringify(courses10)
                    );
                  } else if (gradeLevelInput == "11") {
                    courses11.push(selectedCourse);
                    localStorage.setItem(
                      "courseList11",
                      JSON.stringify(courses11)
                    );
                  } else if (gradeLevelInput == "12") {
                    courses12.push(selectedCourse);
                    localStorage.setItem(
                      "courseList12",
                      JSON.stringify(courses12)
                    );
                  } else if (gradeLevelInput == "13") {
                    courses13.push(selectedCourse);
                    localStorage.setItem(
                      "courseList13",
                      JSON.stringify(courses13)
                    );
                  }

                  if (oldGradeLevel == "09") {
                    const updatedCourses = [...courses09];
                    updatedCourses.splice(
                      courses09.indexOf(oldSelectedCourse),
                      1
                    );
                    setCourses09(updatedCourses);
                    localStorage.setItem(
                      "courseList09",
                      JSON.stringify(updatedCourses)
                    );
                  } else if (oldGradeLevel == "10") {
                    const updatedCourses = [...courses10];
                    updatedCourses.splice(
                      courses10.indexOf(oldSelectedCourse),
                      1
                    );
                    setCourses10(updatedCourses);
                    localStorage.setItem(
                      "courseList10",
                      JSON.stringify(updatedCourses)
                    );
                  } else if (oldGradeLevel == "11") {
                    const updatedCourses = [...courses11];
                    updatedCourses.splice(
                      courses11.indexOf(oldSelectedCourse),
                      1
                    );
                    setCourses11(updatedCourses);
                    localStorage.setItem(
                      "courseList11",
                      JSON.stringify(updatedCourses)
                    );
                  } else if (oldGradeLevel == "12") {
                    const updatedCourses = [...courses12];
                    updatedCourses.splice(
                      courses12.indexOf(oldSelectedCourse),
                      1
                    );
                    setCourses12(updatedCourses);
                    localStorage.setItem(
                      "courseList12",
                      JSON.stringify(updatedCourses)
                    );
                  } else if (oldGradeLevel == "13") {
                    const updatedCourses = [...courses13];
                    updatedCourses.splice(
                      courses13.indexOf(oldSelectedCourse),
                      1
                    );
                    setCourses13(updatedCourses);
                    localStorage.setItem(
                      "courseList13",
                      JSON.stringify(updatedCourses)
                    );
                  }
                } else {
                  localStorage.setItem(
                    "courseList09",
                    JSON.stringify(courses09)
                  );
                  localStorage.setItem(
                    "courseList10",
                    JSON.stringify(courses10)
                  );
                  localStorage.setItem(
                    "courseList11",
                    JSON.stringify(courses11)
                  );
                  localStorage.setItem(
                    "courseList12",
                    JSON.stringify(courses12)
                  );
                  localStorage.setItem(
                    "courseList13",
                    JSON.stringify(courses13)
                  );
                }

                setEditModalVis("invisibleFade");
                setNameInput("");
                setGrade1Input("");
                setGrade2Input("");
                setPercentGrade1Input("");
                setPercentGrade2Input("");
                setAdvLevelInput("1");
                setDifficultyInput("1");
                setSubjectInput("history");
                setMoreOptionsVis("hidden");
              }
              e.preventDefault();
            }}
          >
            <FontAwesomeIcon icon={faFloppyDisk} className="mr-1.5 md:mr-2" />
            Save course
          </button>

          <button
            className="border-2 border-gray-300 hover:bg-gray-200 active:bg-gray-300 text-left rounded-md px-3 py-2 transition ml-3"
            onClick={() => {
              setEditModalVis("invisibleFade");
              setNameInput("");
              setGrade1Input("");
              setGrade2Input("");
              setPercentGrade1Input("");
              setPercentGrade2Input("");
              setAdvLevelInput("1");
              setDifficultyInput("1");
              setSubjectInput("history");
              setMoreOptionsVis("hidden");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
