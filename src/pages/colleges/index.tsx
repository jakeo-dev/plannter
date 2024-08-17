import CommonHead from "@/components/CommonHead";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Colleges() {
  return (
    <>
      <CommonHead>
        <title>Plannter: Colleges</title>
      </CommonHead>

      <div
        id="collegesDiv"
        className="w-full overflow-y-scroll px-4 md:px-8 lg:px-16 xl:px-32 md:pt-28 md:pb-14 mt-8 md:mt-0"
      >
        <div className="mb-12">
          <h2 className="text-lg font-Calistoga font-medium px-4 mb-3">
            Reach Colleges
          </h2>
          <ul id="listColleges"></ul>
          <button
            className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
            // onClick="openAddCollege(1)"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Add a reach college
          </button>
        </div>

        <div className="mb-12">
          <h2 className="text-lg font-Calistoga font-medium px-4 mb-3">
            Target Colleges
          </h2>
          <ul id="listColleges2"></ul>
          <button
            className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
            // onClick="openAddCollege(2)"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Add a target college
          </button>
        </div>

        <div className="mb-12">
          <h2 className="text-lg font-Calistoga font-medium px-4 mb-3">
            Safety Colleges
          </h2>
          <ul id="listColleges3"></ul>
          <button
            className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
            // onClick="openAddCollege(3)"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Add a safety college
          </button>
        </div>
      </div>
    </>
  );
}
