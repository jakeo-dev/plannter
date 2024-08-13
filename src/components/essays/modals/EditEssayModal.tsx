import { EditEssayModalProps, Essay } from "@/types";
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
  const [paperInput, setPaperInput] = useState(
    essay?.paper || "Start writing your essay here"
  );

  useEffect(() => {
    setNameInput(essay?.name || "Enter a prompt");
    setPaperInput(essay?.paper || "Start writing your essay here");
  }, [essay]);

  // IMPORTANT BUG THAT IS NOT FIXED YET:
  // MOST RECENT CHANGE IS NOT SAVED, ONLY THE 2ND MOST RECENT AND BEFORE

  function updateSavedEssay() {
    if (nameInput == "") {
      alert("Enter the prompt for this essay");
    } else {
      const updatedEssay: Essay = {
        uuid: essay?.uuid || crypto.randomUUID(),
        name: nameInput,
        paper: paperInput,
      };

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
      <div className="bg-gray-100 dark:bg-gray-800 relative rounded-xl w-11/12 md:max-w-4xl shadow-md px-8 py-8 md:px-11 md:py-10">
        <button
          className="absolute top-6 right-7 text-lg hover:text-gray-500 transition"
          onClick={() => {
            setEditEssayVisible(false);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h1 className="text-xl font-medium mb-6">Write essay</h1>

        <label className="modalSubtext">
          Prompt<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="input"
          value={nameInput}
          onInput={(e) => {
            setNameInput(e.currentTarget.value);
            updateSavedEssay();
            e.preventDefault();
          }}
          autoComplete="off"
          maxLength={400}
          required
        />

        <label className="modalSubtext">Essay</label>
        <textarea
          rows={16}
          className="input text-sm md:text-base mb-0"
          value={paperInput}
          onInput={(e) => {
            setPaperInput(e.currentTarget.value);
            updateSavedEssay();
            e.preventDefault();
          }}
          autoComplete="off"
          maxLength={1000000}
        />
        <div className="mb-4 md:mb-6">
          <span className="modalSubtext">
            Automatically saved
            <FontAwesomeIcon icon={faCheck} className="ml-1.5" />
          </span>
        </div>

        <button
          className="buttonSecondary ml-0"
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
