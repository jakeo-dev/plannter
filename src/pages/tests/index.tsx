import CommonHead from "@/components/CommonHead";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import Test from "@/components/Test";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronRight,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Tests() {
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

  const [typeInput, setTypeInput] = useState("");
  const [subTypeInput, setSubTypeInput] = useState("");
  const [monthInput, setMonthInput] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [scoreInput, setScoreInput] = useState("");
  const [readScoreInput, setReadScoreInput] = useState("");
  const [mathScoreInput, setMathScoreInput] = useState("");

  const [addModalVis, setAddModalVis] = useState("invisibleFade");
  const [editModalVis, setEditModalVis] = useState("invisibleFade");
  const [smallScreenMenuVis, setSmallScreenMenuVis] = useState("invisibleFade");

  const [selectedTest, setSelectedTest] = useState({
    id: -1,
    type: "",
    subType: "",
    month: "",
    year: -1,
    score: -1,
    readScore: -1,
    mathScore: -1,
  });

  interface Test {
    // define the Test type
    id: number;
    type: string;
    subType: string;
    month: string;
    year: number;
    score: number;
    readScore: number;
    mathScore: number;
  }

  const [tests, setTests] = useState<Test[]>([] as Test[]);

  useEffect(() => {
    setTests(JSON.parse(localStorage.getItem("testList") || "[]") as Test[]);
  }, []);

  function handleEscapeClick() {
    setAddModalVis("invisibleFade");
    setEditModalVis("invisibleFade");
    setTypeInput("ACT");
    setSubTypeInput("");
    setMonthInput("Jan");
    setYearInput("");
    setScoreInput("");
    setReadScoreInput("");
    setMathScoreInput("");
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
        <title>Plannter: Tests</title>
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
              <h2 className="text-lg font-Calistoga">Tests</h2>
              <div className="block mb-3">
                <button // best sat score
                  className="listAttr hidden"
                  /* onClick="openBestSAT()" */
                ></button>
                <button // best act score
                  className="listAttr hidden"
                  /* onClick="openBestACT()" */
                ></button>
                <button // which test to favor
                  className="listAttr hidden"
                  /* onClick="openFavoredTest()" */
                ></button>
              </div>
            </div>
            <ul>
              {tests.map((test: Test) => (
                <Test
                  id={test.id}
                  type={test.type}
                  subType={test.subType}
                  month={test.month}
                  year={test.year}
                  score={test.score}
                  readScore={test.readScore}
                  mathScore={test.mathScore}
                  onEdit={() => {
                    setEditModalVis("visibleFade");
                    setSelectedTest(test);
                    setTypeInput(test.type);
                    setSubTypeInput(test.subType);
                    setMonthInput(String(test.month));
                    setYearInput(String(test.year));
                    setScoreInput(String(test.score));
                    setReadScoreInput(String(test.readScore));
                    setMathScoreInput(String(test.mathScore));
                  }}
                  onTrash={() => {
                    if (
                      confirm(
                        "Delete " +
                          test.type +
                          " " +
                          test.subType +
                          " (" +
                          test.month +
                          test.year +
                          ") ?"
                      )
                    ) {
                      const updatedTests = [...tests];
                      updatedTests.splice(tests.indexOf(test), 1);
                      setTests(updatedTests);

                      localStorage.setItem(
                        "testList",
                        JSON.stringify(updatedTests)
                      );
                    }
                  }}
                />
              ))}
            </ul>
            <button
              className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
              onClick={() => setAddModalVis("visibleFade")}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add a test
            </button>
          </div>
        </div>
      </div>

      {/* add test modal */}
      <div
        className={`${addModalVis} bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto`}
      >
        <div className="bg-gray-100 dark:bg-gray-800 relative rounded-xl w-11/12 md:max-w-2xl shadow-md px-8 py-8 md:px-11 md:py-10">
          <button
            className="absolute top-6 right-7 text-lg hover:text-gray-500 transition"
            onClick={() => {
              setAddModalVis("invisibleFade");
              setTypeInput("ACT");
              setSubTypeInput("");
              setMonthInput("Jan");
              setYearInput("");
              setScoreInput("");
              setReadScoreInput("");
              setMathScoreInput("");
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

          <h1 className="text-xl font-medium mb-6">Add test</h1>

          <div className="md:flex gap-2 mb-4 md:mb-6">
            <div className="flex-1">
              <label className="modalSubtext">
                Type<span className="text-red-500">*</span>
              </label>
              <select
                onChange={(e) => setTypeInput(e.currentTarget.value)}
                value={typeInput}
                className="input darkArrowsSelect dark:lightArrowsSelect mb-0"
                required
              >
                <optgroup label="Select a type">
                  <option value="ACT">ACT</option>
                  <option value="PreACT">PreACT</option>
                  <option value="SAT">SAT</option>
                  <option value="PSAT">PSAT</option>
                  <option value="AP">AP</option>
                  <option value="IB">IB</option>
                  <option value="Other">Other</option>
                </optgroup>
              </select>
            </div>

            <div
              className={`${
                typeInput == "AP" || typeInput == "IB" || typeInput == "Other"
                  ? ""
                  : "hidden"
              } flex-1`}
            >
              <label className="modalSubtext">
                Test name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input mb-0"
                value={subTypeInput}
                onInput={(e) => setSubTypeInput(e.currentTarget.value)}
                autoComplete="off"
                maxLength={80}
                required
              />
            </div>
          </div>

          <label className="modalSubtext">
            Date taken<span className="text-red-500">*</span>
            <span className="modalSubtext inline text-xs p-0 ml-1">
              (MM/YYYY)
            </span>
          </label>
          <div className="md:flex gap-2 mb-4 md:mb-6">
            <div className="flex-1">
              <select
                onChange={(e) => setMonthInput(e.currentTarget.value)}
                value={monthInput}
                className="input darkArrowsSelect dark:lightArrowsSelect mb-0"
                required
              >
                <optgroup label="Select a month">
                  <option value="Jan">January</option>
                  <option value="Feb">February</option>
                  <option value="Mar">March</option>
                  <option value="Apr">April</option>
                  <option value="May">May</option>
                  <option value="Jun">June</option>
                  <option value="Jul">July</option>
                  <option value="Aug">August</option>
                  <option value="Sep">September</option>
                  <option value="Oct">October</option>
                  <option value="Nov">November</option>
                  <option value="Dec">December</option>
                </optgroup>
              </select>
            </div>

            <div className="flex-1">
              <input
                type="number"
                className="input mb-0"
                value={yearInput}
                onInput={(e) => setYearInput(e.currentTarget.value)}
                autoComplete="off"
                min={1900}
                required
              />
            </div>
          </div>

          <label className="modalSubtext">Score</label>
          <input
            type="number"
            className="input"
            value={scoreInput}
            onInput={(e) => setScoreInput(e.currentTarget.value)}
            autoComplete="off"
            max={9999}
            required
          />

          <div
            className={`${
              typeInput == "SAT" || typeInput == "PSAT" ? "md:flex" : "hidden"
            } gap-2 mb-4 md:mb-6`}
          >
            <div className="flex-1">
              <label className="modalSubtext">Reading/Writing score</label>
              <input
                type="number"
                className="input mb-0"
                value={readScoreInput}
                onInput={(e) => setReadScoreInput(e.currentTarget.value)}
                autoComplete="off"
                min={0}
                required
              />
            </div>

            <div className="flex-1">
              <label className="modalSubtext">Math score</label>
              <input
                type="number"
                className="input mb-0"
                value={mathScoreInput}
                onInput={(e) => setMathScoreInput(e.currentTarget.value)}
                autoComplete="off"
                min={0}
                required
              />
            </div>
          </div>

          <button
            className="buttonPrimary"
            onClick={(e) => {
              if (
                (typeInput == "AP" ||
                  typeInput == "IB" ||
                  typeInput == "Other") &&
                subTypeInput == ""
              ) {
                alert("Enter the name of this test");
              } else if (
                yearInput == "" ||
                Number(yearInput) < 1900 ||
                Number(yearInput) > 9999
              ) {
                alert("Enter the year that this test was/will be taken");
              } else {
                const testItem = {
                  id: Math.floor(Math.random() * 10000000000),
                  type: typeInput,
                  subType: subTypeInput,
                  month: monthInput,
                  year: Number(yearInput),
                  score: scoreInput != "" ? Number(scoreInput) : -1,
                  readScore: readScoreInput != "" ? Number(readScoreInput) : -1,
                  mathScore: mathScoreInput != "" ? Number(mathScoreInput) : -1,
                };

                tests.push(testItem);

                localStorage.setItem("testList", JSON.stringify(tests));

                setAddModalVis("invisibleFade");
                setTypeInput("ACT");
                setSubTypeInput("");
                setMonthInput("Jan");
                setYearInput("");
                setScoreInput("");
                setReadScoreInput("");
                setMathScoreInput("");
              }
              e.preventDefault();
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1 md:mr-1.5" />
            Add test
          </button>

          <button
            className="buttonSecondary"
            onClick={() => {
              setAddModalVis("invisibleFade");
              setTypeInput("ACT");
              setSubTypeInput("");
              setMonthInput("Jan");
              setYearInput("");
              setScoreInput("");
              setReadScoreInput("");
              setMathScoreInput("");
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* edit test modal */}
      <div
        className={`${editModalVis} bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto`}
      >
        <div className="bg-gray-100 dark:bg-gray-800 relative rounded-xl w-11/12 md:max-w-2xl shadow-md px-8 py-8 md:px-11 md:py-10">
          <button
            className="absolute top-6 right-7 text-lg hover:text-gray-500 transition"
            onClick={() => {
              setEditModalVis("invisibleFade");
              setTypeInput("ACT");
              setSubTypeInput("");
              setMonthInput("Jan");
              setYearInput("");
              setScoreInput("");
              setReadScoreInput("");
              setMathScoreInput("");
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

          <h1 className="text-xl font-medium mb-6">Edit test</h1>

          <div className="md:flex gap-2 mb-4 md:mb-6">
            <div className="flex-1">
              <label className="modalSubtext">
                Type<span className="text-red-500">*</span>
              </label>
              <select
                onChange={(e) => setTypeInput(e.currentTarget.value)}
                value={typeInput}
                className="input darkArrowsSelect dark:lightArrowsSelect mb-0"
                required
              >
                <optgroup label="Select a type">
                  <option value="ACT">ACT</option>
                  <option value="PreACT">PreACT</option>
                  <option value="SAT">SAT</option>
                  <option value="PSAT">PSAT</option>
                  <option value="AP">AP</option>
                  <option value="IB">IB</option>
                  <option value="Other">Other</option>
                </optgroup>
              </select>
            </div>

            <div
              className={`${
                typeInput == "AP" || typeInput == "IB" || typeInput == "Other"
                  ? ""
                  : "hidden"
              } flex-1`}
            >
              <label className="modalSubtext">
                Test name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input mb-0"
                value={subTypeInput}
                onInput={(e) => setSubTypeInput(e.currentTarget.value)}
                autoComplete="off"
                maxLength={80}
                required
              />
            </div>
          </div>

          <label className="modalSubtext">
            Date taken<span className="text-red-500">*</span>
            <span className="modalSubtext inline text-xs p-0 ml-1">
              (MM/YYYY)
            </span>
          </label>
          <div className="md:flex gap-2 mb-4 md:mb-6">
            <div className="flex-1">
              <select
                onChange={(e) => setMonthInput(e.currentTarget.value)}
                value={monthInput}
                className="input darkArrowsSelect dark:lightArrowsSelect mb-0"
                required
              >
                <optgroup label="Select a month">
                  <option value="Jan">January</option>
                  <option value="Feb">February</option>
                  <option value="Mar">March</option>
                  <option value="Apr">April</option>
                  <option value="May">May</option>
                  <option value="Jun">June</option>
                  <option value="Jul">July</option>
                  <option value="Aug">August</option>
                  <option value="Sep">September</option>
                  <option value="Oct">October</option>
                  <option value="Nov">November</option>
                  <option value="Dec">December</option>
                </optgroup>
              </select>
            </div>

            <div className="flex-1">
              <input
                type="number"
                className="input mb-0"
                value={yearInput}
                onInput={(e) => setYearInput(e.currentTarget.value)}
                autoComplete="off"
                min={1900}
                required
              />
            </div>
          </div>

          <label className="modalSubtext">Score</label>
          <input
            type="number"
            className="input"
            value={scoreInput}
            onInput={(e) => setScoreInput(e.currentTarget.value)}
            autoComplete="off"
            max={9999}
            required
          />

          <div
            className={`${
              typeInput == "SAT" || typeInput == "PSAT" ? "md:flex" : "hidden"
            } gap-2 mb-4 md:mb-6`}
          >
            <div className="flex-1">
              <label className="modalSubtext">Reading/Writing score</label>
              <input
                type="number"
                className="input mb-0"
                value={readScoreInput}
                onInput={(e) => setReadScoreInput(e.currentTarget.value)}
                autoComplete="off"
                min={0}
                required
              />
            </div>

            <div className="flex-1">
              <label className="modalSubtext">Math score</label>
              <input
                type="number"
                className="input mb-0"
                value={mathScoreInput}
                onInput={(e) => setMathScoreInput(e.currentTarget.value)}
                autoComplete="off"
                min={0}
                required
              />
            </div>
          </div>

          <button
            className="buttonPrimary"
            onClick={(e) => {
              if (
                (typeInput == "AP" ||
                  typeInput == "IB" ||
                  typeInput == "Other") &&
                subTypeInput == ""
              ) {
                alert("Enter the name of this test");
              } else if (
                yearInput == "" ||
                Number(yearInput) < 1900 ||
                Number(yearInput) > 9999
              ) {
                alert("Enter the year that this test was/will be taken");
              } else {
                selectedTest.type = typeInput;
                selectedTest.subType = subTypeInput;
                selectedTest.month = monthInput;
                selectedTest.year = Number(yearInput);
                selectedTest.score = scoreInput != "" ? Number(scoreInput) : -1;
                selectedTest.readScore =
                  readScoreInput != "" ? Number(readScoreInput) : -1;
                selectedTest.mathScore =
                  mathScoreInput != "" ? Number(mathScoreInput) : -1;

                localStorage.setItem("testList", JSON.stringify(tests));

                setEditModalVis("invisibleFade");
                setTypeInput("ACT");
                setSubTypeInput("");
                setMonthInput("Jan");
                setYearInput("");
                setScoreInput("");
                setReadScoreInput("");
                setMathScoreInput("");
              }
              e.preventDefault();
            }}
          >
            <FontAwesomeIcon icon={faFloppyDisk} className="mr-1.5 md:mr-2" />
            Save test
          </button>

          <button
            className="border-2 border-gray-300 hover:bg-gray-200 active:bg-gray-300 text-left rounded-md px-3 py-2 transition ml-3"
            onClick={() => {
              setEditModalVis("invisibleFade");
              setTypeInput("ACT");
              setSubTypeInput("");
              setMonthInput("Jan");
              setYearInput("");
              setScoreInput("");
              setReadScoreInput("");
              setMathScoreInput("");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
