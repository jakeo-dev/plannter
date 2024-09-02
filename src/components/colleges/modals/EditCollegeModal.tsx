import { College, EditCollegeModalProps, Option } from "@/types";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import collegeList from "@/database/colleges.json";
import { reactSelectElemClassNames } from "@/utility";


function fuzzyMatch(pattern: string, text: string): boolean {
  let patternIndex = 0;
  let textIndex = 0;

  while (patternIndex < pattern.length && textIndex < text.length) {
    if (pattern[patternIndex].toLowerCase() === text[textIndex].toLowerCase()) {
      patternIndex++;
    }
    textIndex++;
  }

  return patternIndex === pattern.length;
}

async function filterOptions(inputValue: string): Promise<Option[]> {
  return collegeList
    .filter((i) => fuzzyMatch(inputValue, i))
    .slice(0, 20)
    .map((value) => {
      return { value, label: value };
    });
}

export default function EditCollegeModal({
  editCollegeVisible,
  setEditCollegeVisible,
  saveCollege,
  college,
  currentRankName,
}: EditCollegeModalProps) {
  const [nameInput, setNameInput] = useState(college?.name || "");
  const [locationInput, setLocationInput] = useState(college?.location || "");
  const [chanceInput, setChanceInput] = useState(String(college?.chance) || "");
  const [dayInput, setDayInput] = useState(
    String(college?.deadline?.day) || "1"
  );
  const [monthInput, setMonthInput] = useState(
    String(college?.deadline?.month) || "0"
  );
  const [yearInput, setYearInput] = useState(
    String(college?.deadline?.year) || ""
  );
  const [statusInput, setStatusInput] = useState(
    college?.status || "Considering"
  );

  useEffect(() => {
    setNameInput(college?.name || "");
    setLocationInput(college?.location || "");
    setChanceInput(college?.chance != -1 ? String(college?.chance) : "");
    setDayInput(
      college?.deadline?.day != -1 ? String(college?.deadline?.day) : "1"
    );
    setMonthInput(String(college?.deadline?.month) || "0");
    setYearInput(
      college?.deadline?.year != -1 ? String(college?.deadline?.year) : ""
    );
    setStatusInput(college?.status || "Considering");
  }, [college]);

  if (college === null) return <></>;

  return (
    <div
      className={`bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto ${
        editCollegeVisible ? "visibleFade" : "invisibleFade"
      }`}
    >
      <div className="bg-gray-100 dark:bg-gray-900 relative rounded-xl w-11/12 md:max-w-2xl shadow-md px-8 py-8 md:px-11 md:py-10">
        <button
          className="absolute top-6 right-7 text-lg hover:text-gray-500 transition"
          onClick={() => {
            setEditCollegeVisible(false);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h1 className="text-xl font-medium mb-6">Edit college</h1>

        <label className="modalSubtext">
          College name<span className="text-red-500">*</span>
        </label>
        <AsyncSelect
          loadOptions={filterOptions}
          value={{ value: nameInput, label: nameInput }}
          onChange={(e) => setNameInput(e?.value ?? "")}
          unstyled
          classNamePrefix="select"
          classNames={reactSelectElemClassNames()}
        ></AsyncSelect>

        <label className="modalSubtext">Location</label>
        <input
          type="text"
          className="input"
          value={locationInput}
          onInput={(e) => setLocationInput(e.currentTarget.value)}
          autoComplete="off"
          maxLength={100}
        />

        <label className="modalSubtext">Chance percentage</label>
        <input
          type="number"
          className="input"
          value={chanceInput}
          onInput={(e) => setChanceInput(e.currentTarget.value)}
          autoComplete="off"
          min={0}
          max={100}
        />

        <label className="modalSubtext">
          Application deadline
          <span className="modalSubtext inline text-xs p-0 ml-1">
            (YYYY/MM/DD)
          </span>
        </label>
        <div className="flex gap-2 mb-4 md:mb-6">
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
          <div className="flex-1">
            <select
              onChange={(e) => setMonthInput(e.currentTarget.value)}
              value={monthInput}
              className="input darkArrowsSelect dark:lightArrowsSelect mb-0"
              required
            >
              <optgroup label="Select a month">
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </optgroup>
            </select>
          </div>
          <div className="flex-1">
            <select
              onChange={(e) => setDayInput(e.currentTarget.value)}
              value={dayInput}
              className="input darkArrowsSelect dark:lightArrowsSelect mb-0"
              required
            >
              <optgroup label="Select a day">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </optgroup>
            </select>
          </div>
        </div>

        <label className="modalSubtext">
          Status<span className="text-red-500">*</span>
        </label>
        <select
          onChange={(e) => setStatusInput(e.currentTarget.value)}
          value={statusInput}
          className="input darkArrowsSelect dark:lightArrowsSelect"
          required
        >
          <optgroup label="Select an application status">
            <option value="Considering">Considering</option>
            <option value="Applying">Applying</option>
            <option value="Applied">Applied</option>
            <option value="Accepted">Accepted</option>
            <option value="Deferred">Deferred</option>
            <option value="Waitlisted">Waitlisted</option>
            <option value="Denied">Denied</option>
          </optgroup>
        </select>

        <button
          className="buttonPrimary"
          onClick={(e) => {
            if (nameInput == "") {
              alert("Enter the name of this college");
            } else if (
              yearInput != "" &&
              (Number(yearInput) < 1900 || Number(yearInput) > 9999)
            ) {
              alert(
                "Enter a valid year for this college's application deadline"
              );
            } else {
              const updatedCollege: College = {
                uuid: college.uuid,
                name: nameInput,
                location: locationInput,
                chance: chanceInput != "" ? Number(chanceInput) : -1,
                deadline: {
                  day: Number(dayInput),
                  month: Number(monthInput),
                  year: yearInput != "" ? Number(yearInput) : -1,
                },
                status: statusInput,
              };

              saveCollege(updatedCollege);
              setEditCollegeVisible(false);
            }
            e.preventDefault();
          }}
        >
          <FontAwesomeIcon icon={faFloppyDisk} className="mr-1.5 md:mr-2" />
          Save {currentRankName.toLocaleLowerCase()} college
        </button>

        <button
          className="buttonSecondary"
          onClick={() => {
            setEditCollegeVisible(false);
          }}
        >
          Cancel
        </button>
      </div>
      ;
    </div>
  );
}
