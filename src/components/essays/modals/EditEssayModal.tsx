import { EditEssayModalProps, Essay, Option } from "@/types";
import { monthName, wordCount } from "@/utility";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { MultiValue } from "react-select";
import MultiSelect from "@/components/MultiSelect";

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
  const [notesInput, setNotesInput] = useState(essay?.notes || "");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [lastEditedSpan, setLastEditedSpan] = useState(`Edited ${monthName(
    essay?.lastEdited?.month || -1
  )?.substring(0, 3)}
  ${essay?.lastEdited?.day}, ${essay?.lastEdited?.year}`);
  const [linkedColleges, setLinkedColleges] = useState(
    essay?.linkedColleges || []
  );

  let selectedCollegesArray = [];
  for (let i = 0; i < linkedColleges.length; i++) {
    selectedCollegesArray.push({
      value: linkedColleges[i].value,
      label: linkedColleges[i].label,
    });
  }
  const [selectedColleges, setSelectedColleges] = useState<
    MultiValue<{ value: string; label: string }>
  >(selectedCollegesArray || []);

  useEffect(() => {
    const ranks = JSON.parse(localStorage.getItem("ranks") as string);

    let optionsArray = [];
    for (const rank in ranks) {
      for (const uuid in ranks[rank].colleges) {
        const college = ranks[rank].colleges[uuid];
        optionsArray.push({
          value: college.uuid,
          label: college.name,
        });
      }
    }

    setCollegesOptions(optionsArray);

    setNameInput(essay?.name || "Enter a prompt");
    setPaperInput(essay?.paper || "");
    setStatusInput(essay?.status || "Not started");
    setNotesInput(essay?.notes || "");
    setLinkedColleges(essay?.linkedColleges || []);
    setCurrentDate(new Date());
    setLastEditedSpan(`Edited ${monthName(
      essay?.lastEdited?.month || -1
    )?.substring(0, 3)}
  ${essay?.lastEdited?.day}, ${essay?.lastEdited?.year}`);

    let selectedCollegesArray = [];
    if (essay?.linkedColleges) {
      for (let i = 0; i < (essay?.linkedColleges.length ?? 0); i++) {
        selectedCollegesArray.push({
          value: essay?.linkedColleges[i].value ?? "",
          label: essay?.linkedColleges[i].label ?? "",
        });
      }
    }
    setSelectedColleges(selectedCollegesArray || []);
  }, [essay]);

  useEffect(() => {
    updateSavedEssay();
  }, [nameInput, paperInput, statusInput, notesInput, linkedColleges]);

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
        notes: notesInput,
        linkedColleges: linkedColleges,
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

  const [selectTextInput, setSelectTextInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [collegesOptions, setCollegesOptions] = useState([] as Option[]);

  if (essay === null) return <></>;

  return (
    <div
      className={`bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto ${
        editEssayVisible ? "visibleFade" : "invisibleFade"
      }`}
    >
      <div className="flex flex-col bg-gray-100 dark:bg-gray-800 relative w-full h-full px-8 py-8 md:px-24 md:pt-12 md:pb-16">
        <button
          className="absolute top-[4.25rem] left-7 text-lg border-gray-300 dark:border-gray-600 rounded-full border-2 hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 px-2.5 py-1 transition"
          onClick={() => {
            setEditEssayVisible(false);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        {/* <h1 className="text-xl font-medium mb-6 hidden md:block">
          Write essay
        </h1> */}

        <div>
          <label className="modalSubtext">Prompt</label>
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

        <div className="flex flex-grow gap-x-6">
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
          </div>

          <div className="flex flex-col flex-grow w-1/3">
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
                {paperInput.replaceAll("\n", "").length} character
                {paperInput.replaceAll("\n", "").length != 1 ? "s" : ""}
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
              <label className="modalSubtext">Linked colleges</label>
              <MultiSelect
                options={collegesOptions}
                value={selectedColleges}
                onChange={(selectedColleges) => {
                  setSelectedColleges(selectedColleges);

                  let linkedCollegesArray = [];
                  for (let i = 0; i < selectedColleges.length; i++) {
                    linkedCollegesArray.push({
                      value: selectedColleges[i].value,
                      label: selectedColleges[i].label,
                    });
                  }
                  setLinkedColleges(linkedCollegesArray);
                }}
                searchInput={selectTextInput}
                onSearchInput={setSelectTextInput}
                isMenuOpen={menuOpen}
                onMenuOpen={() => setMenuOpen(true)}
                onMenuClose={() => setMenuOpen(false)}
                placeholder="Select a college..."
                isClearable={false}
                isSearchable={true}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <label className="modalSubtext">Notes</label>
              <textarea
                className="input text-sm md:text-sm mb-0 flex-grow resize-none"
                value={notesInput}
                onInput={(e) => setNotesInput(e.currentTarget.value)}
                autoComplete="off"
                maxLength={10000}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 modalSubtext mb-0">
          <span>{lastEditedSpan}</span>
          <span>•</span>
          <span>
            Automatically saved
            <FontAwesomeIcon icon={faCheck} className="ml-1.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
