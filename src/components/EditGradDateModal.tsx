import { EditGradDateModalProps, GradDate } from "@/types";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function EditGradDateModal({
  editGradDateVisible,
  setEditGradDateVisible,
  gradDate,
  saveGradDate,
}: EditGradDateModalProps) {
  const [dayInput, setDayInput] = useState(String(gradDate?.day) || "1");
  const [monthInput, setMonthInput] = useState(String(gradDate?.month) || "0");
  const [yearInput, setYearInput] = useState(
    String(gradDate?.year) == "-1" ? "" : gradDate?.year
  );

  const currentYear = new Date().getFullYear();
  const currentMonth = Number(
    String(new Date().getMonth() + 1).padStart(2, "0")
  );
  const currentDay = Number(String(new Date().getDate()).padStart(2, "0"));
  const currentDate = new Date(currentYear, currentMonth - 1, currentDay);

  useEffect(() => {
    setDayInput(String(gradDate?.day) || "1");
    setMonthInput(String(gradDate?.month) || "0");
    setYearInput(String(gradDate?.year) == "-1" ? "" : gradDate?.year);
  }, [gradDate]);

  return (
    <div
      className={`bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto ${
        editGradDateVisible ? "visibleFade" : "invisibleFade"
      }`}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setEditGradDateVisible(false);
        }
      }}
      tabIndex={0}
    >
      <div className="bg-gray-100 dark:bg-gray-900 dark:border-2 dark:border-gray-800 relative rounded-xl w-11/12 md:max-w-2xl shadow-md px-8 py-8 md:px-11 md:py-10">
        <button
          className="absolute top-6 right-7 text-lg hover:text-gray-500 transition"
          onClick={() => {
            setEditGradDateVisible(false);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h1 className="text-xl font-medium mb-6">Edit graduation date</h1>

        <label className="modalSubtext">
          Graduation date
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

        <button
          className="buttonPrimary"
          onClick={(e) => {
            if (yearInput == "" || Number(yearInput) > 9999 || new Date(Number(yearInput), Number(monthInput), Number(dayInput)) < currentDate) {
              alert("Enter a valid date in the future");
            } else {
              const newGradDate: GradDate = {
                day: Number(dayInput),
                month: Number(monthInput),
                year: Number(yearInput),
              };

              saveGradDate(newGradDate);
              setEditGradDateVisible(false);
            }
            e.preventDefault();
          }}
        >
          <FontAwesomeIcon icon={faFloppyDisk} className="mr-1.5 md:mr-2" />
          Save date
        </button>
        <button
          className="buttonSecondary"
          onClick={() => {
            setEditGradDateVisible(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
