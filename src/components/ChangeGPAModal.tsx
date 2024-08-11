import { GPASettings, ChangeGPAModalProps } from "@/types";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function ChangeGPAModal({
  changeGPAVisible,
  setChangeGPAVisible,
  gpaSettings,
  saveGPASettings,
}: ChangeGPAModalProps) {
  const [usePlusMinusInput, setUsePlusMinusInput] = useState(
    gpaSettings?.usePlusMinus || false
  );
  const [advancedWeightInput, setAdvancedWeightInput] = useState(
    gpaSettings?.advancedWeight || "0"
  );
  const [acceleratedWeightInput, setAcceleratedWeightInput] = useState(
    gpaSettings?.acceleratedWeight || "0"
  );
  const [honorsWeightInput, setHonorsWeightInput] = useState(
    gpaSettings?.honorsWeight || "0"
  );
  const [collegeWeightInput, setCollegeWeightInput] = useState(
    gpaSettings?.collegeWeight || "0"
  );
  const [dualWeightInput, setDualWeightInput] = useState(
    gpaSettings?.dualWeight || "0"
  );
  const [apWeightInput, setAPWeightInput] = useState(
    gpaSettings?.apWeight || "0"
  );
  const [ibWeightInput, setIBWeightInput] = useState(
    gpaSettings?.ibWeight || "0"
  );

  useEffect(() => {
    setUsePlusMinusInput(gpaSettings?.usePlusMinus || false);
    setAdvancedWeightInput(gpaSettings?.advancedWeight || "0");
    setAcceleratedWeightInput(gpaSettings?.acceleratedWeight || "0");
    setHonorsWeightInput(gpaSettings?.honorsWeight || "0");
    setCollegeWeightInput(gpaSettings?.collegeWeight || "0");
    setDualWeightInput(gpaSettings?.dualWeight || "0");
    setAPWeightInput(gpaSettings?.apWeight || "0");
    setIBWeightInput(gpaSettings?.ibWeight || "0");
  }, [gpaSettings]);

  return (
    <div
      className={`bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto ${
        changeGPAVisible ? "visibleFade" : "invisibleFade"
      }`}
    >
      <div className="bg-gray-100 dark:bg-gray-800 relative rounded-xl w-11/12 md:max-w-2xl shadow-md px-8 py-8 md:px-11 md:py-10">
        <button
          className="absolute top-6 right-7 text-lg hover:text-gray-500 transition"
          onClick={() => {
            setChangeGPAVisible(false);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h1 className="text-xl font-medium mb-6">Change GPA calculation</h1>
        <div className="mb-4 md:mb-6">
          <button
            onClick={() => {
              if (usePlusMinusInput) setUsePlusMinusInput(false);
              else setUsePlusMinusInput(true);
            }}
            className="flex"
          >
            <div
              className={`${
                usePlusMinusInput
                  ? "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-400 dark:hover:bg-emerald-700 dark:active:bg-emerald-800"
                  : "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 border-2 border-gray-300 dark:border-gray-600"
              } w-6 h-6 rounded-md transition`}
            ></div>
            <label className="pl-2 cursor-pointer select-none">
              Use +/- in calculation
            </label>
          </button>
          <span className="modalSubtext block text-xs p-0 mt-2">
            With this enabled, an A will count as 4.0, while an A- will count as
            3.7.
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-4 md:gap-y-6">
          <div>
            <label className="modalSubtext">Advanced weight</label>
            <input
              className="input mb-0"
              type="number"
              value={advancedWeightInput}
              onInput={(e) => setAdvancedWeightInput(e.currentTarget.value)}
              autoComplete="off"
              step="0.5"
              min="0"
              max="4"
              required
            />
          </div>
          <div>
            <label className="modalSubtext">Accelerated weight</label>
            <input
              className="input mb-0"
              type="number"
              value={acceleratedWeightInput}
              onInput={(e) => setAcceleratedWeightInput(e.currentTarget.value)}
              autoComplete="off"
              step="0.5"
              min="0"
              max="4"
              required
            />
          </div>
          <div>
            <label className="modalSubtext">Honors weight</label>
            <input
              className="input mb-0"
              type="number"
              value={honorsWeightInput}
              onInput={(e) => setHonorsWeightInput(e.currentTarget.value)}
              autoComplete="off"
              step="0.5"
              min="0"
              max="4"
              required
            />
          </div>
          <div>
            <label className="modalSubtext">College weight</label>
            <input
              className="input mb-0"
              type="number"
              value={collegeWeightInput}
              onInput={(e) => setCollegeWeightInput(e.currentTarget.value)}
              autoComplete="off"
              step="0.5"
              min="0"
              max="4"
              required
            />
          </div>
          <div>
            <label className="modalSubtext">Dual enrollment weight</label>
            <input
              className="input mb-0"
              type="number"
              value={dualWeightInput}
              onInput={(e) => setDualWeightInput(e.currentTarget.value)}
              autoComplete="off"
              step="0.5"
              min="0"
              max="4"
              required
            />
          </div>
          <div>
            <label className="modalSubtext">Adv. Placement (AP) weight</label>
            <input
              className="input mb-0"
              type="number"
              value={apWeightInput}
              onInput={(e) => setAPWeightInput(e.currentTarget.value)}
              autoComplete="off"
              step="0.5"
              min="0"
              max="4"
              required
            />
          </div>
          <div className="mb-4 md:mb-6">
            <label className="modalSubtext">
              Int. Baccalaureate (IB) weight
            </label>
            <input
              className="input mb-0"
              type="number"
              value={ibWeightInput}
              onInput={(e) => setIBWeightInput(e.currentTarget.value)}
              autoComplete="off"
              step="0.5"
              min="0"
              max="4"
              required
            />
          </div>
        </div>
        <button
          className="buttonPrimary"
          onClick={(e) => {
            if (
              Number(advancedWeightInput) > 4 ||
              Number(acceleratedWeightInput) > 4 ||
              Number(honorsWeightInput) > 4 ||
              Number(collegeWeightInput) > 4 ||
              Number(dualWeightInput) > 4 ||
              Number(apWeightInput) > 4 ||
              Number(ibWeightInput) > 4
            ) {
              alert("All weights must be between 0 and 4");
            } else {
              const newGPASettings: GPASettings = {
                usePlusMinus: usePlusMinusInput,
                noneWeight: 0,
                advancedWeight: Number(advancedWeightInput),
                acceleratedWeight: Number(acceleratedWeightInput),
                honorsWeight: Number(honorsWeightInput),
                collegeWeight: Number(collegeWeightInput),
                dualWeight: Number(dualWeightInput),
                apWeight: Number(apWeightInput),
                ibWeight: Number(ibWeightInput),
              };

              saveGPASettings(newGPASettings);
              setChangeGPAVisible(false);
            }
            e.preventDefault();
          }}
        >
          <FontAwesomeIcon icon={faFloppyDisk} className="mr-1.5 md:mr-2" />
          Save calculation
        </button>
        <button
          className="buttonSecondary"
          onClick={() => {
            setChangeGPAVisible(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
