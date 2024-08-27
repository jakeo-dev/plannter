import { EditEssayModalProps, Essay } from "@/types";
import { monthName, wordCount } from "@/utility";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function EditEssayModal({
  editEssayVisible,
  setEditEssayVisible,
  essay,
  saveEssay,
}: EditEssayModalProps) {
  const [nameInput, setNameInput] = useState(essay?.name || "Enter a prompt");
  const [paperInput, setPaperInput] = useState(essay?.paper || "");
  const [statusInput, setStatusInput] = useState(
    essay?.status || "Not started"
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [lastEditedSpan, setLastEditedSpan] = useState(`Edited ${monthName(
    essay?.lastEdited?.month || -1
  )?.substring(0, 3)}
  ${essay?.lastEdited?.day}, ${essay?.lastEdited?.year}`);

  useEffect(() => {
    setNameInput(essay?.name || "Enter a prompt");
    setPaperInput(essay?.paper || "");
    setStatusInput(essay?.status || "Not started");
    setCurrentDate(new Date());
    setLastEditedSpan(`Edited ${monthName(
      essay?.lastEdited?.month || -1
    )?.substring(0, 3)}
  ${essay?.lastEdited?.day}, ${essay?.lastEdited?.year}`);
  }, [essay]);

  useEffect(() => {
    updateSavedEssay();
  }, [nameInput, paperInput, statusInput]);

  function updateSavedEssay() {
    setCurrentDate(new Date());

    if (nameInput == "") {
      alert("Enter the prompt for this essay");
    } else {
      const updatedEssay: Essay = {
        uuid: essay?.uuid || crypto.randomUUID(),
        name: nameInput,
        paper: paperInput,
        status: statusInput,
        lastEdited: {
          year: currentDate.getFullYear(),
          month: currentDate.getMonth(),
          day: currentDate.getDate(),
          hour: currentDate.getHours(),
          minute: currentDate.getMinutes(),
          second: currentDate.getSeconds(),
        },
      };

      setLastEditedSpan(`Edited ${monthName(
        currentDate.getMonth() || -1
      )?.substring(0, 3)}
    ${currentDate.getDate()}, ${currentDate.getFullYear()}`);

      saveEssay(updatedEssay);
    }
  }

  if (essay === null) return <></>;

  return (
    <div
      className={`bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto ${
        editEssayVisible ? "visibleFade" : "invisibleFade"
      }`}
    >
      <div className="flex flex-col bg-gray-100 dark:bg-gray-800 relative w-full h-full px-8 py-8 md:px-11 md:py-10">
        <button
          className="absolute top-6 right-7 text-lg hover:text-gray-500 transition"
          onClick={() => {
            setEditEssayVisible(false);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h1 className="text-xl font-medium mb-6 hidden md:block">
          Write essay
        </h1>

        <div>
          <label className="modalSubtext">
            Prompt<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="input"
            value={nameInput}
            onInput={(e) => setNameInput(e.currentTarget.value)}
            autoComplete="off"
            maxLength={400}
            required
          />
        </div>

        <div className="flex flex-grow">
          <div className="flex flex-col flex-grow w-full">
            <textarea
              autoFocus
              className="input text-sm md:text-base mb-0 flex-grow resize-none"
              value={paperInput}
              onInput={(e) => setPaperInput(e.currentTarget.value)}
              autoComplete="off"
              placeholder="Start writing your essay here"
              maxLength={1000000}
            />
            <div className="flex gap-2 modalSubtext mb-0 md:mb-6">
              <span>{lastEditedSpan}</span>
              <span>•</span>
              <span>
                Automatically saved
                <FontAwesomeIcon icon={faCheck} className="ml-1.5" />
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-grow w-1/4 px-6">
            <div className="mb-4">
              <label className="modalSubtext px-0">Word count</label>
              <span className="">
                {wordCount(paperInput)} word
                {wordCount(paperInput) != 1 ? "s" : ""}
              </span>
            </div>
            <div className="mb-4">
              <label className="modalSubtext px-0">Character count</label>
              <span className="">
                {paperInput.length} character
                {paperInput.length != 1 ? "s" : ""}
              </span>
            </div>
            <div className="mb-4">
              <label className="modalSubtext">Status</label>
              <select
                onChange={(e) => setStatusInput(e.currentTarget.value)}
                value={statusInput}
                className="input darkArrowsSelect dark:lightArrowsSelect mb-0"
              >
                <optgroup label="Select a status">
                  <option value="Not started">Not started</option>
                  <option value="Pre-writing">Pre-writing</option>
                  <option value="Outlining">Outlining</option>
                  <option value="Drafting">Drafting</option>
                  <option value="Revising">Revising</option>
                  <option value="Editing">Editing</option>
                  <option value="Proofreading">Proofreading</option>
                  <option value="Finished">Finished</option>
                </optgroup>
              </select>
            </div>
            <div className="mb-4">
              <label className="modalSubtext">Colleges</label>
              <select className="input darkArrowsSelect dark:lightArrowsSelect mb-0">
                <optgroup label="Select a college">
                  <option value="Not started">not implemented yet!!!!</option>
                </optgroup>
              </select>
            </div>
          </div>
        </div>

        <button
          className="buttonSecondary ml-0 hidden md:inline w-min"
          onClick={() => {
            setEditEssayVisible(false);
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
