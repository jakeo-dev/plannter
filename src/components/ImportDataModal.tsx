import { ImportDataModalProps } from "@/types";
import { faFileImport, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function ImportDataModal({
  importDataVisible,
  setImportDataVisible,
  setStages,
  setGroups,
  setStrengths,
  setFolders,
  setRanks,
  setGPASettings,
}: ImportDataModalProps) {
  const [dataInput, setDataInput] = useState("");

  return (
    <div
      className={`bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto ${
        importDataVisible ? "visibleFade" : "invisibleFade"
      }`}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setImportDataVisible(false);
        }
      }}
      tabIndex={0}
    >
      <div className="bg-gray-100 dark:bg-gray-900 dark:border-2 dark:border-gray-800 relative rounded-xl w-11/12 md:max-w-2xl shadow-md px-8 py-8 md:px-11 md:py-10">
        <button
          className="absolute top-6 right-7 text-lg hover:text-gray-500 transition"
          onClick={() => {
            setImportDataVisible(false);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h1 className="text-xl font-medium mb-6">Import data</h1>
        <div>
          <label className="modalSubtext">Data</label>
          <textarea
            className="input resize-none mb-0"
            rows={8}
            value={dataInput}
            onInput={(e) => setDataInput(e.currentTarget.value)}
            autoComplete="off"
          />
        </div>
        <button
          className="buttonPrimary"
          onClick={(e) => {
            if (
              dataInput == "" ||
              !dataInput.includes("courses") ||
              !dataInput.includes("tests") ||
              !dataInput.includes("activities") ||
              !dataInput.includes("essays") ||
              !dataInput.includes("colleges") ||
              !dataInput.includes("usePlusMinus")
            ) {
              alert("Enter data to import");
            } else {
              let totalDataArray = dataInput.split("~~~~~~~~~~~~~~~~~~~~");

              localStorage.setItem("stages", totalDataArray[0]);
              setStages(JSON.parse(totalDataArray[0]));

              localStorage.setItem("groups", totalDataArray[1]);
              setGroups(JSON.parse(totalDataArray[1]));

              localStorage.setItem("strengths", totalDataArray[2]);
              setStrengths(JSON.parse(totalDataArray[2]));

              localStorage.setItem("folders", totalDataArray[3]);
              setFolders(JSON.parse(totalDataArray[3]));

              localStorage.setItem("ranks", totalDataArray[4]);
              setRanks(JSON.parse(totalDataArray[4]));

              localStorage.setItem("gpaWeights", totalDataArray[5]);
              setGPASettings(JSON.parse(totalDataArray[5]));

              setDataInput("");
              setImportDataVisible(false);
            }
            e.preventDefault();
          }}
        >
          <FontAwesomeIcon icon={faFileImport} className="mr-1.5 md:mr-2" />
          Import
        </button>
        <button
          className="buttonSecondary"
          onClick={() => {
            setDataInput("");
            setImportDataVisible(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
