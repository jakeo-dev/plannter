import ResponsiveTextArea from "@/components/ResponsiveTextArea";
import { Activity, EditActivityModalProps } from "@/types";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function EditActivityModal({
  editActivityVisible,
  setEditActivityVisible,
  saveActivity,
  activity,
  currentStrengthName,
}: EditActivityModalProps) {
  const [nameInput, setNameInput] = useState(activity?.name || "");
  const [descriptionInput, setDescriptionInput] = useState(
    activity?.description || ""
  );
  const [categoryInput, setCategoryInput] = useState(
    activity?.category || "Other"
  );
  const [hoursPerWeekInput, setHoursPerWeekInput] = useState(
    activity?.hoursPerWeek && activity?.hoursPerWeek != -1
      ? String(activity?.hoursPerWeek)
      : ""
  );
  const [weeksPerYearInput, setWeeksPerYearInput] = useState(
    activity?.weeksPerYear && activity?.weeksPerYear != -1
      ? String(activity?.weeksPerYear)
      : ""
  );

  useEffect(() => {
    setNameInput(activity?.name || "");
    setDescriptionInput(activity?.description || "");
    setCategoryInput(activity?.category || "Other");
    setHoursPerWeekInput(
      activity?.hoursPerWeek && activity?.hoursPerWeek != -1
        ? String(activity?.hoursPerWeek)
        : ""
    );
    setWeeksPerYearInput(
      activity?.weeksPerYear && activity?.weeksPerYear != -1
        ? String(activity?.weeksPerYear)
        : ""
    );
  }, [activity]);

  if (activity === null) return <></>;

  return (
    <div
      className={`bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto ${
        editActivityVisible ? "visibleFade" : "invisibleFade"
      }`}
    >
      <div className="bg-gray-100 dark:bg-gray-900 dark:border-2 dark:border-gray-800 relative rounded-xl w-11/12 md:max-w-2xl shadow-md px-8 py-8 md:px-11 md:py-10">
        <button
          className="absolute top-6 right-7 text-lg hover:text-gray-500 transition"
          onClick={() => {
            setEditActivityVisible(false);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h1 className="text-xl font-medium mb-6">Edit activity</h1>

        <label className="modalSubtext">
          Activity name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="input"
          value={nameInput}
          onInput={(e) => setNameInput(e.currentTarget.value)}
          autoComplete="off"
          maxLength={100}
          required
        />

        <label className="modalSubtext">Description</label>
        <ResponsiveTextArea
          className="max-h-[8.5rem]"
          value={descriptionInput}
          onInput={(e) => setDescriptionInput(e.currentTarget.value)}
          maxLength={250}
          required={false}
          placeholder=""
        />

        <div className="flex gap-2 mb-4 md:mb-6">
          <div className="flex-1">
            <label className="modalSubtext">Hours per week</label>
            <input
              type="number"
              className="input mb-0"
              value={hoursPerWeekInput}
              onInput={(e) => setHoursPerWeekInput(e.currentTarget.value)}
              autoComplete="off"
              min={1}
              max={168}
            />
          </div>
          <div className="flex-1">
            <label className="modalSubtext">Weeks per year</label>
            <input
              type="number"
              className="input mb-0"
              value={weeksPerYearInput}
              onInput={(e) => setWeeksPerYearInput(e.currentTarget.value)}
              autoComplete="off"
              min={1}
              max={52}
            />
          </div>
        </div>

        <label className="modalSubtext">
          Type<span className="text-red-500">*</span>
        </label>
        <select
          onChange={(e) => setCategoryInput(e.currentTarget.value)}
          value={categoryInput}
          className="input darkArrowsSelect dark:lightArrowsSelect"
          required
        >
          <optgroup label="Select a category">
            <option value="Athletics">Athletics</option>
            <option value="Award">Award</option>
            <option value="Club">Club</option>
            <option value="Competition">Competition</option>
            <option value="Event">Event</option>
            <option value="Internship">Internship</option>
            <option value="Math">Math</option>
            <option value="Music">Music</option>
            <option value="Employment">Paid Work</option>
            <option value="Performing Arts">Performing Arts</option>
            <option value="Personal Responsibility">
              Personal Responsibility
            </option>
            <option value="Politics">Politics</option>
            <option value="Research">Research</option>
            <option value="Science">Science</option>
            <option value="Summer Class">Summer Class</option>
            <option value="Technology">Technology</option>
            <option value="Visual Arts">Visual Arts</option>
            <option value="Volunteering">Volunteering</option>
            <option value="Writing">Writing</option>
            <option value="Other">Other</option>
          </optgroup>
        </select>

        <button
          className="buttonPrimary"
          onClick={(e) => {
            if (nameInput == "") {
              alert("Enter the name of this activity");
            } else if (
              Number(hoursPerWeekInput) > 168 ||
              Number(hoursPerWeekInput) < 1
            ) {
              alert("Hours per week not possible");
            } else if (
              Number(weeksPerYearInput) > 52 ||
              Number(weeksPerYearInput) < 1
            ) {
              alert("Weeks per year not possible");
            } else if (
              (hoursPerWeekInput == "" && weeksPerYearInput != "") ||
              (weeksPerYearInput == "" && hoursPerWeekInput != "")
            ) {
              alert("Enter both hours per week and weeks per year");
            } else {
              const updatedActivity: Activity = {
                uuid: activity.uuid,
                name: nameInput,
                description: descriptionInput,
                category: categoryInput,
                hoursPerWeek:
                  hoursPerWeekInput != "" ? Number(hoursPerWeekInput) : -1,
                weeksPerYear:
                  weeksPerYearInput != "" ? Number(weeksPerYearInput) : -1,
              };

              saveActivity(updatedActivity);
              setEditActivityVisible(false);
            }
            e.preventDefault();
          }}
        >
          <FontAwesomeIcon icon={faFloppyDisk} className="mr-1.5 md:mr-2" />
          Save {currentStrengthName.toLocaleLowerCase()} activity
        </button>

        <button
          className="buttonSecondary"
          onClick={() => {
            setEditActivityVisible(false);
          }}
        >
          Cancel
        </button>
      </div>
      ;
    </div>
  );
}
