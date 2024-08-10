import { Test, EditTestModalProps } from "@/types";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function EditTestModal({
  editTestVisible,
  setEditTestVisible,
  saveTest,
  test,
}: EditTestModalProps) {
  const [typeInput, setTypeInput] = useState(test?.type || "");
  const [subTypeInput, setSubTypeInput] = useState(test?.subType || "");
  const [monthInput, setMonthInput] = useState(test?.month || "");
  const [yearInput, setYearInput] = useState(String(test?.year) || "");
  const [scoreInput, setScoreInput] = useState(String(test?.score) || "");
  const [readScoreInput, setReadScoreInput] = useState(
    String(test?.readScore) || ""
  );
  const [mathScoreInput, setMathScoreInput] = useState(
    String(test?.mathScore) || ""
  );

  useEffect(() => {
    setTypeInput(test?.type || "ACT");
    setSubTypeInput(test?.subType || "");
    setMonthInput(test?.month || "Jan");
    setYearInput(String(test?.year) || "");
    setScoreInput(String(test?.score) || "");
    setReadScoreInput(String(test?.readScore) || "");
    setMathScoreInput(String(test?.mathScore) || "");
  }, [test]);

  if (test === null) return <></>;

  return (
    <div
      className={`bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto ${
        editTestVisible ? "visibleFade" : "invisibleFade"
      }`}
    >
      <div className="bg-gray-100 dark:bg-gray-800 relative rounded-xl w-11/12 md:max-w-2xl shadow-md px-8 py-8 md:px-11 md:py-10">
        <button
          className="absolute top-6 right-7 text-lg hover:text-gray-500 transition"
          onClick={() => {
            setEditTestVisible(false);
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
              const updatedTest: Test = {
                uuid: test.uuid,
                name: `${typeInput != "Other" ? typeInput : ""}${
                  typeInput != "Other" && subTypeInput != "" ? " " : ""
                }${
                  subTypeInput != "" ? subTypeInput : ""
                } (${monthInput} ${yearInput})`,
                type: typeInput,
                subType: subTypeInput,
                month: monthInput,
                year: yearInput != "" ? Number(yearInput) : -1,
                score: scoreInput != "" ? Number(scoreInput) : -1,
                readScore: readScoreInput != "" ? Number(readScoreInput) : -1,
                mathScore: mathScoreInput != "" ? Number(mathScoreInput) : -1,
              };

              saveTest(updatedTest);
              setEditTestVisible(false);
            }
            e.preventDefault();
          }}
        >
          <FontAwesomeIcon icon={faFloppyDisk} className="mr-1.5 md:mr-2" />
          Save test
        </button>

        <button
          className="buttonSecondary"
          onClick={() => {
            setEditTestVisible(false);
          }}
        >
          Cancel
        </button>
      </div>
      ;
    </div>
  );
}
