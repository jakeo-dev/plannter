import CommonHead from "@/components/CommonHead";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Extracurriculars() {
  return (
    <>
      <CommonHead>
        <title>Plannter: Extracurriculars</title>
      </CommonHead>

      <div
        id="actsDiv"
        className="w-full overflow-y-scroll px-4 md:px-8 lg:px-16 xl:px-40 md:pt-28 md:pb-14 mt-8 md:mt-0"
      >
        <div className="mb-12">
          <h2 className="text-lg font-Calistoga font-medium px-4 mb-3">
            Major Activities
          </h2>
          <ul id="listActs" className="lg:grid lg:grid-cols-2 gap-3"></ul>
          <button
            className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
            // onClick="openAddAct(1)"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Add a major activity
          </button>
        </div>

        <div className="mb-12">
          <h2 className="text-lg font-Calistoga font-medium px-4 mb-3">
            Moderate Activities
          </h2>
          <ul id="listActs2" className="lg:grid lg:grid-cols-2 gap-3"></ul>
          <button
            className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
            // onClick="openAddAct(2)"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Add a moderate activity
          </button>
        </div>

        <div className="mb-12">
          <h2 className="text-lg font-Calistoga font-medium px-4 mb-3">
            Minor Activities
          </h2>
          <ul id="listActs3" className="lg:grid lg:grid-cols-2 gap-3"></ul>
          <button
            className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
            // onClick="openAddAct(3)"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Add a minor activity
          </button>
        </div>
      </div>
    </>
  );
}
