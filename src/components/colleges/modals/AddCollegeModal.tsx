import { AddCollegeModalProps, College } from "@/types";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function AddCollegeModal({
  addCollegeVisible,
  setAddCollegeVisible,
  currentRankName,
  addCollege,
}: AddCollegeModalProps) {
  const [nameInput, setNameInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [chanceInput, setChanceInput] = useState("");
  const [dayInput, setDayInput] = useState("1");
  const [monthInput, setMonthInput] = useState("0");
  const [yearInput, setYearInput] = useState("");
  const [statusInput, setStatusInput] = useState("Considering");

  function revertToDefault() {
    setNameInput("");
    setLocationInput("");
    setChanceInput("");
    setDayInput("1");
    setMonthInput("0");
    setYearInput("");
    setStatusInput("Considering");
  }

  return (
    <div
      className={`bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto ${
        addCollegeVisible ? "visibleFade" : "invisibleFade"
      }`}
    >
      <div className="bg-gray-100 dark:bg-gray-800 relative rounded-xl w-11/12 md:max-w-2xl shadow-md px-8 py-8 md:px-11 md:py-10">
        <button
          className="absolute top-6 right-7 text-lg hover:text-gray-500 transition"
          onClick={() => {
            setAddCollegeVisible(false);
            revertToDefault();
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h1 className="text-xl font-medium mb-6">Add college</h1>

        <label className="modalSubtext">
          College name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="input"
          value={nameInput}
          onInput={(e) => setNameInput(e.currentTarget.value)}
          autoComplete="off"
          maxLength={100}
        />

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
          Chance category<span className="text-red-500">*</span>
        </label>
        <select
          onChange={(e) => setStatusInput(e.currentTarget.value)}
          value={statusInput}
          className="input darkArrowsSelect dark:lightArrowsSelect"
          required
        >
          <optgroup label="Select a category">
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
            } else {
              const newCollege: College = {
                uuid: crypto.randomUUID(),
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

              addCollege(newCollege);
              setAddCollegeVisible(false);
              revertToDefault();
            }
            e.preventDefault();
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1 md:mr-1.5" />
          Add {currentRankName.toLocaleLowerCase()} college
        </button>

        <button
          className="buttonSecondary"
          onClick={() => {
            setAddCollegeVisible(false);
            revertToDefault();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
